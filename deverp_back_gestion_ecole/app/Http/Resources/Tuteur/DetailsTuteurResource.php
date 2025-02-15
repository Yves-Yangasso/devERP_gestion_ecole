<?php

namespace App\Http\Resources\Etudiant;

use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\Etudiant\EtudiantResource;


class DetailsTuteurResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'nom' => $this->nom,
            'prenom' => $this->prenom,
            'telephone' => $this->telephone,
            'email' => $this->email,
            'profession' => $this->profession,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            'etudiants' => EtudiantResource::collection($this->whenLoaded('etudiants')),
        ];
    }
}
