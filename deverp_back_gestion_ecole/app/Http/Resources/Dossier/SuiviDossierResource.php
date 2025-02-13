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
}