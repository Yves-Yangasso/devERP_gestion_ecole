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

    public function uploadDocument(UploadedFile $file, string $folder, array $options = [], string $prenom, string $nom): array
    {
        try {
            // Nettoyer le nom pour le dossier (version simplifiée sans transliterator)
            $studentName = $this->cleanName($prenom . '_' . $nom);

            // Construire le chemin final
            $finalFolder = config('cloudinary.dossier_folder') . '/' . $folder . '/' . $studentName;

            // Détecter si c'est un PDF
            $isPDF = strtolower($file->getClientOriginalExtension()) === 'pdf';

            // Options spécifiques pour les PDFs
            $uploadOptions = array_merge([
                'folder' => $finalFolder,
                'resource_type' => $isPDF ? 'image' : 'raw',
                'use_filename' => true,
                'unique_filename' => true,
                'format' => $isPDF ? 'pdf' : null,
                'flags' => $isPDF ? 'attachment' : null,
                'public_id' => Str::random(20)
            ], $options);

            if (!empty($options['tags'])) {
                $uploadOptions['tags'] = $options['tags'];
            }

            $result = $this->cloudinary->uploadApi()->upload(
                $file->getRealPath(),
                $uploadOptions
            );

            // Pour les PDFs, construire une URL de prévisualisation spéciale
            $previewUrl = $isPDF
                ? "https://res.cloudinary.com/" . config('cloudinary.cloud_name') . "/image/upload/fl_attachment/" . $result['public_id'] . ".pdf"
                : $result['secure_url'];

            return [
                'success' => true,
                'public_id' => $result['public_id'],
                'url' => $result['secure_url'],
                'secure_url' => $result['secure_url'],
                'preview_url' => $previewUrl,
                'resource_type' => $result['resource_type'],
                'format' => $isPDF ? 'pdf' : $file->getClientOriginalExtension()
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
}
