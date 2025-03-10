<?php
namespace App\Services\Paiement;

use App\Contracts\Repositories\Paiement\PaiementRepositoryInterface;
use App\Models\Paiement;
use App\Models\LignePaiement;
use Illuminate\Support\Facades\DB;

class PaiementService
{
    protected $paiementRepository;

    public function __construct(PaiementRepositoryInterface $paiementRepository)
    {
        $this->paiementRepository = $paiementRepository;
    }

    public function creerPaiement(array $donnees): Paiement
    {
        return DB::transaction(function () use ($donnees) {
            $paiement = $this->paiementRepository->creer([
                'montant_paiement' => $donnees['montant_paiement'],
                'date_paiement' => now(),
                'inscription_id' => $donnees['inscription_id'],
                'mode_paiement_id' => $donnees['mode_paiement_id'],
                'status' => 'en_attente',
            ]);

            foreach ($donnees['lignes_paiement'] as $ligne) {
                // Vérifiez que 'type_frais' existe dans le tableau
                $typeFrais = isset($ligne['type_frais']) ? $ligne['type_frais'] : null; // Ou une valeur par défaut

                LignePaiement::create([
                    'paiement_id' => $paiement->id,
                    'montant' => $ligne['montant'],
                    'type_frais' => $typeFrais  // Utilisez la variable ici
                ]);
            }

            if ($paiement->status === 'valide') {  // Assurez-vous de mettre à jour le statut ici
                $this->validerInscription($donnees['inscription_id']);
            }

            return $paiement;
        });
    }

    public function modifierPaiement(int $id, array $donnees): Paiement
    {
        return $this->paiementRepository->modifier($id, $donnees);
    }

    public function trouverPaiement(int $id): Paiement
    {
        return $this->paiementRepository->trouverParId($id);
    }

    public function supprimerPaiement(int $id): void
    {
        $this->paiementRepository->supprimer($id);
    }

    public function validerInscription(int $inscriptionId): void
{
    DB::transaction(function () use ($inscriptionId) {
        // Mettre à jour le statut de l'inscription
        DB::table('inscriptions')
            ->where('id', $inscriptionId)
            ->update(['status' => 'valide']);
    });


}

public function validerPaiement(int $paiementId, int $inscriptionId): void
{
    DB::transaction(function () use ($paiementId, $inscriptionId) {
        // Mettre à jour le statut du paiement
        $paiement = DB::table('paiements')
            ->where('id', $paiementId)
            ->update(['status' => 'valide']);

        // Vérifiez si la mise à jour a réussi
        if ($paiement) {
            // Valider l'inscription
            $this->validerInscription($inscriptionId);
        }
    });
}
}
