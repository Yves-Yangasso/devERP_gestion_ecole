<?php

namespace App\Contracts\Services\Document;

use Illuminate\Http\UploadedFile;

interface CloudStorageInterface
{
    public function stockerFichier(UploadedFile $fichier, string $dossier): array;
    public function supprimerFichier(string $cloudinaryId): bool;
}