<?php

namespace App\Http\Resources\Dossier;

use Illuminate\Http\Resources\Json\JsonResource;

class SuiviDossierResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'statut' => $this->statut,
            'derniere_mise_a_jour' => $this->updated_at->format('d/m/Y H:i'),
            'documents' => $this->documents->map(function ($document) {
                return [
                    'id' => $document->id,
                    'type' => $document->type_document,
                    'statut' => $document->statut,
                    'commentaire' => $document->commentaire,
                    'date_soumission' => $document->created_at->format('d/m/Y'),
                    'date_traitement' => $document->updated_at->format('d/m/Y H:i'),
                ];
            }),
            'progression' => $this->calculerProgression(),
            'prochaine_etape' => $this->prochaineEtape(),
        ];
    }

    public function calculerProgression()
    {
        $documents = $this->documents; // On récupère les documents associés au dossier
        $totalDocuments = $documents->count();  // Total de documents
        $documentsValides = $documents->where('statut', 'valide')->count();  // Documents validés

        if ($totalDocuments === 0) {
            return 0;  // Aucun document, donc progression à 0%
        }

        // Calcul de la progression en pourcentage
        return ($documentsValides / $totalDocuments) * 100;
    }

    public function prochaineEtape()
    {
        $documents = $this->documents; // Récupère les documents associés au dossier

        // Vérifie si tous les documents sont validés
        $documentsValidés = $documents->where('statut', 'valide')->count();
        $documentsEnAttente = $documents->where('statut', 'en_attente')->count();
        $documentsInvalides = $documents->where('statut', 'invalide')->count();

        if ($documentsEnAttente > 0) {
            return 'Documents en attente de validation';
        }

        if ($documentsInvalides > 0) {
            return 'Documents invalides à corriger';
        }

        if ($documentsValidés == $documents->count()) {
            return 'Validation terminée, dossier prêt';
        }

        return 'En cours de traitement';
    }
}
