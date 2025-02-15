<?php

namespace App\Services\Document;

use App\Contracts\Repositories\Dossier\TypeDocumentRepositoryInterface;
use Illuminate\Support\Collection;

class TypeDocumentService
{
    protected TypeDocumentRepositoryInterface $typeDocumentRepository;

    public function __construct(TypeDocumentRepositoryInterface $typeDocumentRepository)
    {
        $this->typeDocumentRepository = $typeDocumentRepository;
    }

    public function getAll(): Collection
    {
        return $this->typeDocumentRepository->getAll();
    }

    public function findById(int $id)
    {
        return $this->typeDocumentRepository->findById($id);
    }

    public function create(array $data)
    {
        return $this->typeDocumentRepository->create($data);
    }

    public function update(int $id, array $data)
    {
        return $this->typeDocumentRepository->update($id, $data);
    }

    public function delete(int $id)
    {
        return $this->typeDocumentRepository->delete($id);
    }
}
