<?php

namespace App\Repositories\Eloquent\Paiement;

use App\Models\ModePaiement;
use App\Contracts\Repositories\Paiement\ModePaiementRepositoryInterface;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Support\Collection;

class ModePaiementRepository implements ModePaiementRepositoryInterface
{
    public function creer(array $donnees): ModePaiement
    {
        return ModePaiement::create($donnees);
    }

    public function modifier(int $id, array $donnees): ModePaiement
    {
        $modePaiement = ModePaiement::findOrFail($id);
        $modePaiement->update($donnees);
        return $modePaiement;
    }

    public function supprimer(int $id): void
    {
        $modePaiement = ModePaiement::findOrFail($id);
        $modePaiement->delete();
    }

    public function trouverParId(int $id): ?ModePaiement
    {
        return ModePaiement::find($id);
    }

    public function tous(): Collection
    {
        return ModePaiement::all();
    }
}
