<?php

namespace App\Contracts\Services\Document;

use App\Models\Document;
use Illuminate\Http\UploadedFile;

interface DocumentServiceInterface
{
    public function stockerDocument(UploadedFile $fichier, array $donnees): Document;
}