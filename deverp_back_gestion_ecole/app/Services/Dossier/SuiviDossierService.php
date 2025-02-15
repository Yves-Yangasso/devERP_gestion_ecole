<?php

namespace App\Services\Dossier;

use App\Models\Dossier;
use App\Repositories\Eloquent\InscriptionRepository;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class SuiviDossierService
{
    protected $inscriptionRepository;

    public function __construct(InscriptionRepository $inscriptionRepository)
    {
        $this->inscriptionRepository = $inscriptionRepository;
    }

    /**
     * Récupère un dossier par son code de suivi et l'email de l'utilisateur
     */
    public function getDossierParCodeSuivi(string $codeSuivi, string $email)
    {
        $inscription = $this->inscriptionRepository->findByCodeSuiviAndEmail($codeSuivi, $email);

        if (!$inscription || !$inscription->dossier) {
            throw new ModelNotFoundException('Dossier non trouvé. Vérifiez votre code de suivi et email.');
        }

        return $inscription->dossier()->with([
            'documents' => function ($query) {
                $query->orderBy('updated_at', 'desc');
            }
        ])->firstOrFail();
    }

    /**
     * Récupère l'historique des validations du dossier
     */
    public function getHistoriqueDossier(string $codeSuivi, string $email)
    {
        $inscription = $this->inscriptionRepository->findByCodeSuiviAndEmail($codeSuivi, $email);

        if (!$inscription) {
            throw new ModelNotFoundException('Dossier non trouvé. Vérifiez votre code de suivi et email.');
        }

        // Vérifie que l'inscriptions a bien un dossier
        $dossier = $inscription->dossier;

        // Accède à la relation 'historiques' sur le modèle Dossier
        return $dossier->historiques()->orderBy('created_at', 'desc')->get();
    }


    /**
     * Vérifie le statut des documents d'un dossier
     */
    public function verifierStatutDocuments(Dossier $dossier)
    {
        if (!$dossier->relationLoaded('documents')) {
            $dossier->load('documents');
        }

        $documents = $dossier->documents ?? collect();

        return [
            'total_documents' => $documents->count(),
            'documents_valides' => $documents->where('statut', 'valide')->count(),
            'documents_en_attente' => $documents->where('statut', 'en_attente')->count(),
            'documents_invalides' => $documents->where('statut', 'invalide')->count(),
        ];
    }
}
