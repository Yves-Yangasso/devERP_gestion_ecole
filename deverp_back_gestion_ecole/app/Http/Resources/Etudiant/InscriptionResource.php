<?php

namespace App\Http\Resources\Etudiant;

use Illuminate\Http\Resources\Json\JsonResource;

class InscriptionResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'etudiant_id' => $this->etudiant_id,
            'annee_academique' => $this->annee_academique,
            'statut' => $this->statut->value,
            'date_inscription' => $this->date_inscription->format('Y-m-d'),
            'etudiant' => new EtudiantResource($this->whenLoaded('etudiant')),
            'created_at' => $this->created_at->format('Y-m-d H:i:s'),
            'updated_at' => $this->updated_at->format('Y-m-d H:i:s')
        ];
    }
}