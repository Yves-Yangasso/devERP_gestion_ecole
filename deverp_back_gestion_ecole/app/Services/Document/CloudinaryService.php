<?php
// Services/Document/CloudinaryService.php

namespace App\Services\Document;

use Cloudinary\Cloudinary;
use App\Contracts\Services\Document\CloudStorageInterface;
use Illuminate\Http\UploadedFile;

class CloudinaryService implements CloudStorageInterface
{
    private $cloudinary;

    public function __construct()
    {
        $this->cloudinary = new Cloudinary([
            'cloud_name' => config('cloudinary.cloud_name'),
            'api_key' => config('cloudinary.api_key'),
            'api_secret' => config('cloudinary.api_secret'),
        ]);
    }

    public function stockerFichier(UploadedFile $fichier, string $dossier): array
    {
        try {
            $resultat = $this->cloudinary->uploadApi()->upload(
                $fichier->getRealPath(),
                [
                    'folder' => "isi_gestion_scolaire/{$dossier}",
                    'resource_type' => 'auto',
                    'public_id' => uniqid('doc_'),
                    'tags' => ['gestion_scolaire', $dossier]
                ]
            );

            return [
                'success' => true,
                'url' => $resultat['secure_url'],
                'cloudinary_id' => $resultat['public_id'],
                'format' => $resultat['format'],
                'taille' => $resultat['bytes']
            ];
        } catch (\Exception $e) {
            return [
                'success' => false,
                'message' => $e->getMessage()
            ];
        }
    }

    public function supprimerFichier(string $cloudinaryId): bool
    {
        try {
            $this->cloudinary->uploadApi()->destroy($cloudinaryId);
            return true;
        } catch (\Exception $e) {
            return false;
        }
    }
}