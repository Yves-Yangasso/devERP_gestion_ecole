<?php

namespace App\Contracts\Repositories\Dossier;

use App\Models\TypeDocument;
use Illuminate\Support\Collection;

interface TypeDocumentRepositoryInterface
{
    public function getAll(): Collection;
    public function findById(int $id): ?TypeDocument;
    public function create(array $data): TypeDocument;
    public function update(int $id, array $data): bool;
    public function delete(int $id): bool;
}
