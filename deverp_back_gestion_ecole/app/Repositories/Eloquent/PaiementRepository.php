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
        $paiement = Paiement::findOrFail($id);
        $paiement->update($donnees);
        return $paiement;
    }

    public function supprimer(int $id): void
    {
        $paiement = Paiement::findOrFail($id);
        $paiement->delete();
    }

    public function trouverParId(int $id): ?Paiement
    {
        return Paiement::with('lignePaiements')->find($id);
    }

    public function tous(): Collection
    {
        return Paiement::all();
    }
}
