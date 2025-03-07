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
}
