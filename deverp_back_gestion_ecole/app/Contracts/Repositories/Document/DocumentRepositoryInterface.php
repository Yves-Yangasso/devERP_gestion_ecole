<?php

namespace App\Contracts\Repositories\Document;

use App\Models\Document;

interface DocumentRepositoryInterface
{
    public function creer(array $data): Document;
    public function trouverParId(int $id): ?Document;
    public function trouverParDossierId(int $dossierId);
}
