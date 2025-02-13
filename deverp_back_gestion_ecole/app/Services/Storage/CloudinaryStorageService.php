<?php

namespace App\Services\Storage;

use Cloudinary\Cloudinary;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Log;


class CloudinaryStorageService
{
    private Cloudinary $cloudinary;

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
    }

    public function uploadDocument(UploadedFile $file, string $dossierCode, string $typeDocument): array
    {
        $folder = config('cloudinary.dossier_inscription.folder');
        $publicId = $this->generatePublicId($dossierCode, $typeDocument);

        try {
            $result = $this->cloudinary->uploadApi()->upload($file->getRealPath(), [
                'folder' => $folder,
                'public_id' => $publicId,
                'resource_type' => 'auto',
                'format' => $file->getClientOriginalExtension(),
                'tags' => [$dossierCode, $typeDocument, 'dossier_inscription'],
            ]);

            return [
                'success' => true,
                'public_id' => $result['public_id'],
                'url' => $result['secure_url'],
                'resource_type' => $result['resource_type'],
                'format' => $result['format'],
            ];
        } catch (\Exception $e) {
            Log::error('Erreur lors du téléchargement sur Cloudinary: ' . $e->getMessage());
            
            return [
                'success' => false,
                'error' => $e->getMessage(),
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

    private function generatePublicId(string $dossierCode, string $typeDocument): string
    {
        return Str::slug($dossierCode . '-' . $typeDocument . '-' . Str::random(8));
    }
}