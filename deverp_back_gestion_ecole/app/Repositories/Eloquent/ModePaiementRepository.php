<?php

namespace App\Repositories\Eloquent;

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
        $tuteur = ModePaiement::findOrFail($id);
        $tuteur->update($donnees);
        return $tuteur;
    }

    public function supprimer(int $id): void
    {
        $tuteur = ModePaiement::findOrFail($id);
        $tuteur->delete();
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
