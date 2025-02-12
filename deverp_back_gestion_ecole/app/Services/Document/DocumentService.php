<?php

namespace App\Services\Document;

use App\Contracts\Repositories\Document\DocumentRepositoryInterface;
use App\Models\Document;
use Illuminate\Support\Facades\Storage;

class DocumentService
{
    protected $documentRepository;

    public function __construct(DocumentRepositoryInterface $documentRepository)
    {
        $this->documentRepository = $documentRepository;
    }

    public function ajouterDocument($data)
    {
        $path = $data['chemin_fichier']->store('documents');
        $data['chemin_fichier'] = $path;

        return $this->documentRepository->creer($data);
    }
}
