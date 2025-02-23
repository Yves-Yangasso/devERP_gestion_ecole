<?php
namespace App\Services\Paiement;

use App\Models\Paiement;
use App\Models\LignePaiement;
use Illuminate\Support\Facades\DB;

class PaiementService
{
    public function creerPaiement(array $donnees)
    {
        return DB::transaction(function () use ($donnees) {
            $paiement = Paiement::create([
                'montant_paie' => $donnees['montant_paie'],
                'date_paie' => now(),
                'etudiant_id' => $donnees['etudiant_id'],
                'mode_paiement_id' => $donnees['mode_paiement_id'],
            ]);

            foreach ($donnees['lignes_paiement'] as $ligne) {
                LignePaiement::create([
                    'paiement_id' => $paiement->id,
                    'montant' => $ligne['montant'],
                    'date_paiement' => now(),
                    'status' => 'en attente',
                ]);
            }

            return $paiement;
        });
    }

    public function modifierPaiement(int $id, array $donnees)
    {
        $paiement = Paiement::findOrFail($id);
        $paiement->update($donnees);
        return $paiement;
    }

    public function trouverPaiement(int $id)
    {
        return Paiement::with('lignePaiements')->findOrFail($id);
    }

    public function supprimerPaiement(int $id)
    {
        $paiement = Paiement::findOrFail($id);
        $paiement->delete();
    }
}
