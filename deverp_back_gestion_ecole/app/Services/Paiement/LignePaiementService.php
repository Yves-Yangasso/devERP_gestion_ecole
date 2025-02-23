<?php
namespace App\Services\Paiement;

use App\Contracts\Repositories\Paiement\LignePaiementRepositoryInterface;
use App\Models\LignePaiement;
use App\Models\Paiement;
use Illuminate\Support\Collection;
use Illuminate\Validation\ValidationException;

class LignePaiementService
{
    protected LignePaiementRepositoryInterface $lignePaiementRepository;

    public function __construct(LignePaiementRepositoryInterface $lignePaiementRepository)
    {
        $this->lignePaiementRepository = $lignePaiementRepository;
    }

    /**
     * Récupérer toutes les lignes de paiement.
     */
    public function tous(): Collection
    {
        return $this->lignePaiementRepository->tous();
    }

    /**
     * Trouver une ligne de paiement par son ID.
     */
    public function trouverParId(int $id): ?LignePaiement
    {
        return $this->lignePaiementRepository->trouverParId($id);
    }

    /**
     * Créer une nouvelle ligne de paiement avec vérification du montant total.
     */
    public function creer(array $donnees): LignePaiement
    {
        $paiement = Paiement::findOrFail($donnees['paiement_id']);
        $totalMontantLignes = LignePaiement::where('paiement_id', $paiement->id)->sum('montant');

        if (($totalMontantLignes + $donnees['montant']) > $paiement->montant_paie) {
            throw ValidationException::withMessages([
                'montant' => 'Le montant total des lignes de paiement ne peut pas dépasser le montant du paiement.'
            ]);
        }

        return $this->lignePaiementRepository->creer($donnees);
    }

    /**
     * Modifier une ligne de paiement avec vérification du montant total.
     */
    public function modifier(int $id, array $donnees): LignePaiement
    {
        $lignePaiement = LignePaiement::findOrFail($id);
        $paiement = Paiement::findOrFail($lignePaiement->paiement_id);

        // Calcul du total des autres lignes de paiement (excluant celle qu'on modifie)
        $totalMontantLignes = LignePaiement::where('paiement_id', $paiement->id)
            ->where('id', '!=', $id)
            ->sum('montant');

        if (($totalMontantLignes + $donnees['montant']) > $paiement->montant_paie) {
            throw ValidationException::withMessages([
                'montant' => 'Le montant total des lignes de paiement ne peut pas dépasser le montant du paiement.'
            ]);
        }

        return $this->lignePaiementRepository->modifier($id, $donnees);
    }

    /**
     * Supprimer une ligne de paiement.
     */
    public function supprimer(int $id): void
    {
        $this->lignePaiementRepository->supprimer($id);
    }
}
