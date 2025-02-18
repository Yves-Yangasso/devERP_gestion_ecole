<?php

namespace App\Repositories\Eloquent;

use App\Models\Paiement;
use App\Contracts\Repositories\Paiement\PaiementRepositoryInterface;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Support\Collection;

class PaiementRepository implements PaiementRepositoryInterface
{
    public function creer(array $donnees): Paiement
    {
        return Paiement::create($donnees);
    }

    public function modifier(int $id, array $donnees): Paiement
    {
        $tuteur = Paiement::findOrFail($id);
        $tuteur->update($donnees);
        return $tuteur;
    }

    public function supprimer(int $id): void
    {
        $tuteur = Paiement::findOrFail($id);
        $tuteur->delete();
    }

    public function trouverParId(int $id): ?Paiement
    {
        return Paiement::find($id);
    }

    public function tous(): Collection
    {
        return Paiement::all();
    }
}
