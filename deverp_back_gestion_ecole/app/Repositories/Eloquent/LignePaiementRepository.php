<?php

namespace App\Repositories\Eloquent;

use App\Contracts\Repositories\Paiement\LignePaiementRepositoryInterface;
use App\Models\LignePaiement;
use Illuminate\Support\Collection;

class LignePaiementRepository implements LignePaiementRepositoryInterface
{
    public function creer(array $donnees): LignePaiement
    {
        return LignePaiement::create($donnees);
    }

    public function modifier(int $id, array $donnees): LignePaiement
    {
        $lignePaiement = LignePaiement::findOrFail($id);
        $lignePaiement->update($donnees);
        return $lignePaiement;
    }

    public function supprimer(int $id): void
    {
        $lignePaiement = LignePaiement::findOrFail($id);
        $lignePaiement->delete();
    }

    public function trouverParId(int $id): ?LignePaiement
    {
        return LignePaiement::find($id);
    }

    public function tous(): Collection
    {
        return LignePaiement::all();
    }
}
