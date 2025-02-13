<?php

namespace App\Traits\Dossier;

use App\Enums\Dossier\{StatutDossier, TypeDocument, ResultatValidation};
use App\Models\Document;
use Illuminate\Database\Eloquent\Collection;

trait GestionDocuments
{
    /**
     * Vérifie si tous les documents requis sont présents
     */
    public function documentsComplets(): bool
    {
        $documentsRequis = config('dossier.documents_requis');
        $documentsPresents = $this->documents->pluck('type')->toArray();
        
        return empty(array_diff($documentsRequis, $documentsPresents));
    }

    /**
     * Vérifie si tous les documents sont validés
     */
    public function documentsValides(): bool
    {
        return $this->documents->every(function ($document) {
            return $document->statut === ResultatValidation::VALIDE;
        });
    }

    /**
     * Récupère les documents manquants
     */
    public function documentsManquants(): array
    {
        $documentsRequis = config('dossier.documents_requis');
        $documentsPresents = $this->documents->pluck('type')->toArray();
        
        return array_diff($documentsRequis, $documentsPresents);
    }

    /**
     * Récupère les documents par type
     */
    public function getDocumentParType(string $type): ?Document
    {
        return $this->documents->first(function ($document) use ($type) {
            return $document->type === $type;
        });
    }

    /**
     * Récupère les documents en attente de validation
     */
    public function documentsEnAttente(): Collection
    {
        return $this->documents->filter(function ($document) {
            return $document->statut === ResultatValidation::EN_ATTENTE;
        });
    }

    /**
     * Met à jour le statut du dossier en fonction des documents
     */
    public function mettreAJourStatut(): void
    {
        if (!$this->documentsComplets()) {
            $this->update(['statut' => StatutDossier::INCOMPLET]);
            return;
        }

        if ($this->documentsValides()) {
            $this->update(['statut' => StatutDossier::VALIDE]);
            return;
        }

        if ($this->documents->contains('statut', ResultatValidation::INVALIDE)) {
            $this->update(['statut' => StatutDossier::REJETE]);
            return;
        }

        $this->update(['statut' => StatutDossier::EN_COURS_VALIDATION]);
    }
}