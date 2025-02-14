<?php

namespace App\Services\Dossier;

use App\Events\Dossier\DocumentTraite;
use App\Repositories\Eloquent\DocumentRepository;
use App\Repositories\Eloquent\DossierRepository;
use App\Enums\Dossier\StatutDocument;
use App\Enums\Dossier\StatutDossier;
use Exception;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Eloquent\Collection;

class TraitementDossierService
{
    protected $documentRepository;
    protected $dossierRepository;

    public function __construct(
        DocumentRepository $documentRepository,
        DossierRepository $dossierRepository
    ) {
        $this->documentRepository = $documentRepository;
        $this->dossierRepository = $dossierRepository;
    }

    public function getDossierById(int $dossierId)
    {
        try {
            $dossier = $this->dossierRepository->findById($dossierId);

            if (!$dossier) {
                throw new Exception('Dossier non trouvé');
            }

            return $dossier;
        } catch (Exception $e) {
            throw new Exception('Erreur lors de la récupération du dossier: ' . $e->getMessage());
        }
    }

    public function getDossiersEnAttente()
    {
        try {
            return $this->dossierRepository->getDossiersByStatut(StatutDossier::EN_ATTENTE);
        } catch (Exception $e) {
            throw new Exception('Erreur lors de la récupération des dossiers en attente: ' . $e->getMessage());
        }
    }

    public function traiterDocument(int $documentId, array $data)
    {
        DB::beginTransaction();
        try {
            $document = $this->documentRepository->trouverParId($documentId);

            if (!$document) {
                throw new Exception('Document non trouvé');
            }

            $document->update([
                'statut' => $data['statut'],
                'commentaire' => $data['commentaire'] ?? null
            ]);

            $this->verifierEtMajStatutDossier($document->dossier);

            event(new DocumentTraite($document));

            DB::commit();
            return $document;
        } catch (Exception $e) {
            DB::rollBack();
            throw new Exception('Erreur lors du traitement du document: ' . $e->getMessage());
        }
    }

    protected function verifierEtMajStatutDossier($dossier)
    {
        try {
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
        } catch (Exception $e) {
            throw new Exception('Erreur lors de la mise à jour du statut du dossier: ' . $e->getMessage());
        }
    }
}
