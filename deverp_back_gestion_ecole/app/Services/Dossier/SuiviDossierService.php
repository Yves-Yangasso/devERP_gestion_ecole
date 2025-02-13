<?php
// app/Services/Dossier/SuiviDossierService.php
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

    public function getDossierParCodeSuivi(string $codeSuivi, string $email)
    {
        $inscription = $this->inscriptionRepository->findByCodeSuiviAndEmail($codeSuivi, $email);

        if (!$inscription) {
            throw new ModelNotFoundException('Dossier non trouvé. Vérifiez votre code de suivi et email.');
        }

        return $inscription->dossier()->with(['documents' => function ($query) {
            $query->orderBy('updated_at', 'desc');
        }])->first();
    }

    public function getHistoriqueDossier(string $codeSuivi, string $email)
    {
        $inscription = $this->inscriptionRepository->findByCodeSuiviAndEmail($codeSuivi, $email);

        if (!$inscription) {
            throw new ModelNotFoundException('Dossier non trouvé. Vérifiez votre code de suivi et email.');
        }

        return $inscription->dossier->historiques()
            ->orderBy('created_at', 'desc')
            ->get();
    }
    public function verifierStatutDocuments(Dossier $dossier)
    {
        $documents = $dossier->documents;

        return [
            'total_documents' => $documents->count(),
            'documents_valides' => $documents->where('statut', 'valide')->count(),
            'documents_en_attente' => $documents->where('statut', 'en_attente')->count(),
            'documents_invalides' => $documents->where('statut', 'invalide')->count(),
        ];
    }
}
