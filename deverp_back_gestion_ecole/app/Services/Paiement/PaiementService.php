<?php
namespace App\Services\Paiement;

use App\Contracts\Repositories\Paiement\PaiementRepositoryInterface;
use App\Models\Paiement;
use App\Models\Inscription;
use App\Models\LignePaiement;
use Illuminate\Support\Facades\DB;
use App\Mail\FactureMail;
use App\Mail\TestEmail;
use Illuminate\Support\Facades\Mail;
use App\Services\Etudiant\InscriptionService;

class PaiementService
{
    protected $paiementRepository;
    protected $inscriptionService;

    public function __construct(PaiementRepositoryInterface $paiementRepository, InscriptionService $inscriptionService,)
    {
        $this->paiementRepository = $paiementRepository;
        $this->inscriptionService = $inscriptionService;
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
    
            if (!empty($donnees['lignes_paiement'])) {
                foreach ($donnees['lignes_paiement'] as $ligne) {
                    LignePaiement::create([
                        'paiement_id' => $paiement->id,
                        'montant' => $ligne['montant'],
                        'type_frais' => $ligne['type_frais'] ?? null,
                    ]);
                }
            }
    

           // Mail::to('yangassoyowane@gmail.com')->send(new TestEmail());

            Mail::to('yangassoyowane@gmail.com')->send(new FactureMail($paiement));
    
            if ($paiement->status === 'valide') {
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
