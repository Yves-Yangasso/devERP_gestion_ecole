<?php

namespace App\Repositories\Eloquent\Document;

use App\Contracts\Repositories\Document\DocumentRepositoryInterface;
use App\Models\Document;

class DocumentsRepository implements DocumentRepositoryInterface
{
    public function creer(array $data): Document
    {
        return Document::create($data);
    }

    public function trouverParId(int $id): ?Document
    {
        return Document::find($id);
    }

    public function trouverParDossierId(int $dossierId)
    {
        return Document::where('dossier_id', $dossierId)->get();
    }
}
