<?php

// app/Services/Dossier/TraitementDossierService.php
namespace App\Services\Dossier;

use App\Events\Document\DocumentTraite;
use App\Repositories\Eloquent\Document\DocumentsRepository;
use App\Repositories\Eloquent\Dossier\DossierRepository;
use App\Enums\Dossier\StatutDocument;
use App\Enums\Dossier\StatutDossier;
use Exception;
use Illuminate\Support\Facades\DB;

class TraitementDossierService
{
    protected $documentRepository;
    protected $dossierRepository;

    public function __construct(
        DocumentsRepository $documentRepository,
        DossierRepository $dossierRepository
    ) {
        $this->documentRepository = $documentRepository;
        $this->dossierRepository = $dossierRepository;
    }

    public function traiterDocument(int $documentId, array $data)
    {
        DB::beginTransaction();
        try {
            $document = $this->documentRepository->trouverParId($documentId);
            $document->update([
                'statut' => $data['statut'],
                'commentaire' => $data['commentaire'] ?? null
            ]);

            // Mise à jour du statut du dossier
            $this->verifierEtMajStatutDossier($document->dossier);

            event(new DocumentTraite($document));

            DB::commit();
            return $document;
        } catch (Exception $e) {
            DB::rollBack();
            throw $e;
        }
    }

    protected function verifierEtMajStatutDossier($dossier)
    {
        $documents = $dossier->documents;
        $tousDocumentsValides = $documents->every(function ($doc) {
            return $doc->statut === StatutDocument::VALIDE;
        });

        $documentsInvalides = $documents->contains(function ($doc) {
            return $doc->statut === StatutDocument::INVALIDE;
        });

        if ($tousDocumentsValides) {
            $dossier->update(['statut' => StatutDossier::VALIDE]);
        } elseif ($documentsInvalides) {
            $dossier->update(['statut' => StatutDossier::INVALIDE]);
        } else {
            $dossier->update(['statut' => StatutDossier::EN_COURS_VALIDATION]);
        }
    }

    public function getDossiersEnAttente()
    {
        return $this->dossierRepository->getDossiersByStatut(StatutDossier::EN_ATTENTE);
    }
}
