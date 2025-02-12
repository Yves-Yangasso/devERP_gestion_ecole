<?php

namespace App\Http\Resources\Dossier;

use Illuminate\Http\Resources\Json\JsonResource;

class DocumentResource extends JsonResource
{
    public function toArray($request): array
    {
        return [
            'id' => $this->id,
            'type' => $this->type->value,
            'chemin' => $this->chemin,
            'statut' => $this->statut->value,
            'commentaire' => $this->commentaire,
            'date_validation' => $this->date_validation?->format('Y-m-d H:i:s'),
            'created_at' => $this->created_at->format('Y-m-d H:i:s'),
        ];
    }
}