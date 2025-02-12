<?php

namespace App\Contracts\Repositories\Dossier;

use App\Models\Dossier;

interface DossierRepositoryInterface
{
    public function creer(array $data): Dossier;
    public function trouverParId(int $id): ?Dossier;
    public function trouverParInscriptionId(int $inscriptionId);
}
