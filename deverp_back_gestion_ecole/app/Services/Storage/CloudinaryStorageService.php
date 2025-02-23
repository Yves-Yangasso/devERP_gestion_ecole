<?php

namespace App\Services\Storage;

use App\Contracts\Services\Document\CloudStorageInterface;
use Cloudinary\Cloudinary;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;

class CloudinaryStorageService implements CloudStorageInterface
{
    private Cloudinary $cloudinary;
    private string $archiveFolder;
    private string $baseFolder;

    public function __construct()
    {
        $this->cloudinary = new Cloudinary([
            'cloud' => [
                'cloud_name' => config('cloudinary.cloud_name'),
                'api_key' => config('cloudinary.api_key'),
                'api_secret' => config('cloudinary.api_secret'),
            ],
            'url' => [
                'secure' => config('cloudinary.secure')
            ]
        ]);

        $this->archiveFolder = config('cloudinary.archive_folder', 'archives');
        $this->baseFolder = config('cloudinary.dossier_folder', 'dossiers-inscription');
    }

    /**
     * Modifiez la méthode uploadDocument pour garantir que les PDFs sont correctement gérés
     */
    public function uploadDocument(UploadedFile $file, string $folder, array $options = [], string $prenom, string $nom): array
    {
        try {
            // Nettoyer le nom pour le dossier
            $studentName = $this->cleanName($prenom . '_' . $nom);

            // Générer l'horodatage une seule fois par dossier/inscription
            // Utiliser un identifiant unique pour le dossier d'inscription plutôt que pour chaque document
            $timestamp = now()->format('Y-m-d_H-i-s');

            // On utilise le même dossier pour tous les documents liés à cette inscription
            // Le format sera : dossiers-inscription/CODEDOSSIER/NOM_PRENOM
            $finalFolder = $this->baseFolder . '/' . $folder . '/' . $studentName;

            // Détecter si c'est un PDF
            $isPDF = strtolower($file->getClientOriginalExtension()) === 'pdf';

            // On génère un nom de fichier basé sur le type de document
            $documentType = $options['type'] ?? 'document';
            $cleanDocumentType = $this->cleanName($documentType);

            $uploadOptions = array_merge([
                'folder' => $finalFolder,
                'resource_type' => $isPDF ? 'raw' : 'image',
                'use_filename' => true,
                'unique_filename' => true,
                // Utiliser un nom basé sur le type de document plutôt qu'un ID aléatoire
                'public_id' => $cleanDocumentType . '-' . Str::random(8)
            ], $options);

            if (!empty($options['tags'])) {
                $uploadOptions['tags'] = $options['tags'];
            }

            $result = $this->cloudinary->uploadApi()->upload(
                $file->getRealPath(),
                $uploadOptions
            );

            // Créer des URLs adaptées au type de document
            if ($isPDF) {
                // L'URL directe du PDF pour la prévisualisation dans le navigateur
                $directUrl = $result['secure_url'];

                // URL de prévisualisation avec Google Docs Viewer
                $previewUrl = "https://docs.google.com/viewer?url=" . urlencode($directUrl) . "&embedded=true";

                // URL de téléchargement
                $downloadUrl = $directUrl;
            } else {
                $previewUrl = $result['secure_url'];
                $downloadUrl = $result['secure_url'];
            }

            return [
                'success' => true,
                'public_id' => $result['public_id'],
                'url' => $downloadUrl,
                'secure_url' => $result['secure_url'],
                'preview_url' => $previewUrl,
                'direct_url' => $isPDF ? $directUrl : null,
                'resource_type' => $result['resource_type'],
                'format' => $isPDF ? 'pdf' : $file->getClientOriginalExtension(),
                'folder' => $finalFolder,
                'timestamp' => $timestamp
            ];
        } catch (\Exception $e) {
            Log::error('Erreur Cloudinary: ' . $e->getMessage());
            return [
                'success' => false,
                'error' => $e->getMessage()
            ];
        }
    }
    private function cleanName(string $name): string
    {
        // Remove accents and special characters
        $clean = iconv('UTF-8', 'ASCII//TRANSLIT', $name);
        // Convert to lowercase and replace spaces/special chars with hyphens
        $clean = preg_replace('/[^a-zA-Z0-9]/', '-', strtolower($clean));
        // Remove multiple consecutive hyphens
        $clean = preg_replace('/-+/', '-', $clean);
        // Trim hyphens from beginning and end
        return trim($clean, '-');
    }

    private function generateCleanFilename(UploadedFile $file): string
    {
        $extension = $file->getClientOriginalExtension();
        $basename = pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME);
        $cleanBasename = $this->cleanName($basename);

        // Add a unique identifier to prevent naming conflicts
        return $cleanBasename . '-' . Str::random(8);
    }

    public function deleteDocument(string $publicId): bool
    {
        try {
            $result = $this->cloudinary->uploadApi()->destroy($publicId);
            return $result['result'] === 'ok';
        } catch (\Exception $e) {
            Log::error('Erreur lors de la suppression sur Cloudinary: ' . $e->getMessage());
            return false;
        }
    }

    public function archiveDocument(string $publicId, string $archiveFolder = null): bool
    {
        try {
            $targetFolder = $archiveFolder ?? $this->archiveFolder;

            // Déplacer le fichier vers le dossier d'archives
            $result = $this->cloudinary->uploadApi()->rename(
                $publicId,
                $targetFolder . '/' . basename($publicId),
                ['overwrite' => true]
            );

            // Ajouter un tag "archived"
            $this->cloudinary->uploadApi()->addTag(
                'archived',
                [$result['public_id']]
            );

            return true;
        } catch (\Exception $e) {
            Log::error('Erreur lors de l\'archivage sur Cloudinary: ' . $e->getMessage());
            return false;
        }
    }

    public function getDocumentMetadata(string $publicId): ?array
    {
        try {
            // Récupère les métadonnées
            $response = $this->cloudinary->adminApi()->asset($publicId);

            // Retourne les résultats sous forme de tableau
            return $response->getArrayCopy();
        } catch (\Exception $e) {
            Log::error('Erreur lors de la récupération des métadonnées: ' . $e->getMessage());
            return null;
        }
    }

    public function updateDocumentTags(string $publicId, array $tags): bool
    {
        try {
            // Supprime les anciens tags
            $assetInfo = $this->getDocumentMetadata($publicId);
            if ($assetInfo && !empty($assetInfo['tags'])) {
                $this->cloudinary->uploadApi()->removeAllTags([$publicId]);
            }

            // Ajoute les nouveaux tags
            if (!empty($tags)) {
                $this->cloudinary->uploadApi()->addTag(
                    implode(',', $tags),
                    [$publicId]
                );
            }

            return true;
        } catch (\Exception $e) {
            Log::error('Erreur lors de la mise à jour des tags: ' . $e->getMessage());
            return false;
        }
    }

    public function documentExists(string $publicId): bool
    {
        try {
            $this->cloudinary->adminApi()->asset($publicId);
            return true;
        } catch (\Exception $e) {
            return false;
        }
    }
    /**
     * Génère un URL de prévisualisation optimisé pour un document
     * Cette version permet de prévisualiser les PDFs directement
     */
    public function generatePreviewUrl(string $publicId, string $format = 'pdf'): string
    {
        $cloudName = config('cloudinary.cloud_name');

        if (strtolower($format) === 'pdf') {
            // URL directe pour le PDF sans transformation en image
            return "https://res.cloudinary.com/{$cloudName}/image/upload/{$publicId}.pdf";
        } else if (in_array(strtolower($format), ['jpg', 'jpeg', 'png', 'gif'])) {
            // Pour les images, ajouter des transformations d'optimisation
            return "https://res.cloudinary.com/{$cloudName}/image/upload/q_auto,f_auto/{$publicId}";
        }

        // Fallback pour autres formats
        return "https://res.cloudinary.com/{$cloudName}/image/upload/{$publicId}";
    }

    /**
     * Génère une URL pour la visionneuse PDF complète
     */
    public function generatePdfViewerUrl(string $publicId): string
    {
        $cloudName = config('cloudinary.cloud_name');
        $pdfUrl = "https://res.cloudinary.com/{$cloudName}/image/upload/{$publicId}.pdf";

        // Créer une URL pour une visionneuse PDF intégrée
        return "https://docs.google.com/viewer?url=" . urlencode($pdfUrl) . "&embedded=true";
    }

    /**
     * Génère un chemin de dossier cohérent pour tous les documents d'une inscription
     */
    public function generateInscriptionFolderPath(string $dossierCode, string $prenom, string $nom): string
    {
        $studentName = $this->cleanName($prenom . '_' . $nom);
        return $this->baseFolder . '/' . $dossierCode . '/' . $studentName;
    }

    /**
     * Récupère tous les documents stockés dans un dossier d'inscription spécifique
     */
    public function getDocumentsByFolder(string $dossierCode, string $prenom, string $nom): array
    {
        try {
            $folderPath = $this->generateInscriptionFolderPath($dossierCode, $prenom, $nom);

            // Recherche tous les fichiers dans ce dossier
            $result = $this->cloudinary->adminApi()->assets([
                'type' => 'upload',
                'prefix' => $folderPath,
                'max_results' => 500
            ]);

            return $result['resources'];
        } catch (\Exception $e) {
            Log::error('Erreur lors de la récupération des documents du dossier: ' . $e->getMessage());
            return [];
        }
    }
}
