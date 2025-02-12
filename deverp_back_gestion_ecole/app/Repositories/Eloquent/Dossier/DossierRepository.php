<?php

namespace App\Repositories\Eloquent\Dossier;

use App\Contracts\Repositories\Dossier\DossierRepositoryInterface;
use App\Models\Dossier;

class DossierRepository implements DossierRepositoryInterface
{
    public function creer(array $data): Dossier
    {
        return Dossier::create($data);
    }

    public function trouverParId(int $id): ?Dossier
    {
        return Dossier::find($id);
    }

    public function trouverParInscriptionId(int $inscriptionId)
    {
        return Dossier::where('inscription_id', $inscriptionId)->get();
    }
}
