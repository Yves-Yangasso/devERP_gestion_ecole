<?php

namespace App\Services\Dossier;

use App\Events\Dossier\DossierValide;
use App\Events\Dossier\DossierInvalide;
use App\Repositories\Eloquent\DossierRepository;
use App\Enums\Dossier\StatutDossier;
use Exception;
use Illuminate\Support\Facades\DB;

class DossierValidationService
{
    protected $dossierRepository;
    protected $documentService;

    public function __construct(DossierRepository $dossierRepository,DocumentService $documentService)
    {
        $this->dossierRepository = $dossierRepository;
        $this->documentService = $documentService;
    }

    public function validerDossier(int $dossierId, array $data)
    {
        DB::beginTransaction();
        try {

            $dossier = $this->dossierRepository->findById($dossierId);
            $document = $data['documents'];

           $reponse = $this->documentService->validerDocument($document);
            // Vérifier si tous les documents sont validés
            $documentsValides = $dossier->documents()
                ->where('statut', 'valide')
                ->count() === $dossier->documents()->count();


            //dd($documentsValides);
            if ($documentsValides) {
                $dossier->update(['statut' => StatutDossier::VALIDE]);
                event(new DossierValide($dossier));
            } else {
                $dossier->update(['statut' => StatutDossier::INVALIDE]);
                event(new DossierInvalide($dossier));
            }
            
            DB::commit();
            return $dossier;
        } catch (Exception $e) {
            DB::rollBack();
            throw $e;
        }
    }

    public function getDossiersEnAttente()
    {
        return $this->dossierRepository->getDossiersByStatut(StatutDossier::EN_ATTENTE);
    }

    public function getDocumentsByDossierId(int $dossierId)
    {
        return $this->dossierRepository->findDocumentsByDossierId($dossierId);
    }
}
