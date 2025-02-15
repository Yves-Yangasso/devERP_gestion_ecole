<?php

namespace App\Repositories\Eloquent;

use App\Models\TypeDocument;
use App\Contracts\Repositories\Dossier\TypeDocumentRepositoryInterface;
use Illuminate\Support\Collection;

class TypeDocumentRepository implements TypeDocumentRepositoryInterface
{
    public function getAll(): Collection
    {
        return TypeDocument::all();
    }

    public function findById(int $id): ?TypeDocument
    {
        return TypeDocument::find($id);
    }

    public function create(array $data): TypeDocument
    {
        return TypeDocument::create($data);
    }

    public function update(int $id, array $data): bool
    {
        $typeDocument = $this->findById($id);
        return $typeDocument ? $typeDocument->update($data) : false;
    }

    public function delete(int $id): bool
    {
        $typeDocument = $this->findById($id);
        return $typeDocument ? $typeDocument->delete() : false;
    }
}
