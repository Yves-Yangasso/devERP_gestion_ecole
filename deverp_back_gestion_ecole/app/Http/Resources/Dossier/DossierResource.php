<?php

namespace App\Http\Resources\Dossier;

use Illuminate\Http\Resources\Json\JsonResource;

class DossierResource extends JsonResource
{
    public function toArray($request): array
    {
        return [
            'id' => $this->id,
            'code_suivi' => $this->code_suivi,
            'etudiant_id' => $this->etudiant_id,
            'statut' => $this->statut->value,
            'commentaire' => $this->commentaire,
            'mode_validation' => $this->mode_validation,
            'date_soumission' => $this->date_soumission?->format('Y-m-d H:i:s'),
            'documents' => DocumentResource::collection($this->whenLoaded('documents')),
            'created_at' => $this->created_at->format('Y-m-d H:i:s'),
            'updated_at' => $this->updated_at->format('Y-m-d H:i:s'),
        ];
    }
}
    