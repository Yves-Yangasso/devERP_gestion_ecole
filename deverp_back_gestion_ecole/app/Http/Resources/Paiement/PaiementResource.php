<?php

namespace App\Http\Resources\Paiement;

use Illuminate\Http\Resources\Json\JsonResource;

class ModePaiementResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'montant' => $this->montant,
            'id_mode' => $this->idMode,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
