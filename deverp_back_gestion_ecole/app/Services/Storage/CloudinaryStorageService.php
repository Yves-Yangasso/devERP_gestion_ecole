<?php

namespace App\Services\Storage;

use App\Contracts\Services\Document\CloudStorageInterface;
use Cloudinary\Cloudinary;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Log;

class CloudinaryStorageService implements CloudStorageInterface
{
    private Cloudinary $cloudinary;
    private string $archiveFolder;

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
    }

    public function uploadDocument(UploadedFile $file, string $folder, array $options = []): array
    {
        try {
            $uploadOptions = array_merge([
                'folder' => $folder,
                'resource_type' => 'auto',
                'format' => $file->getClientOriginalExtension(),
            ], $options);

            if (!empty($options['tags'])) {
                $uploadOptions['tags'] = $options['tags'];
            }

            $result = $this->cloudinary->uploadApi()->upload(
                $file->getRealPath(),
                $uploadOptions
            );

            return [
                'success' => true,
                'public_id' => $result['public_id'],
                'url' => $result['secure_url'],
                'resource_type' => $result['resource_type'],
                'format' => $result['format']
            ];
        } catch (\Exception $e) {
            Log::error('Erreur lors du téléchargement sur Cloudinary: ' . $e->getMessage());
            
            return [
                'success' => false,
                'error' => $e->getMessage()
            ];
        }
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
            return $this->cloudinary->adminApi()->asset($publicId);
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