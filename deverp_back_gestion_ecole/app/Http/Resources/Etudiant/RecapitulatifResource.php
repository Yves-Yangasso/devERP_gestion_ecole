<?php
//app/Http/Resources/Etudiant/RecapitulatifResource.php

namespace App\Http\Resources\Etudiant;

use Illuminate\Http\Resources\Json\JsonResource;

class RecapitulatifResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'etudiant' => [
                'informations_personnelles' => [
                    'matricule' => $this->resource['informations_etudiant']['matricule'],
                    'nom' => $this->resource['informations_etudiant']['nom'],
                    'prenom' => $this->resource['informations_etudiant']['prenom'],
                    'date_naissance' => $this->resource['informations_etudiant']['date_naissance'],
                    'lieu_naissance' => $this->resource['informations_etudiant']['lieu_naissance'],
                    'adresse' => $this->resource['informations_etudiant']['adresse'],
                    'telephone' => $this->resource['informations_etudiant']['telephone'],
                    'email' => $this->resource['informations_etudiant']['email'],
                    'cni' => $this->resource['informations_etudiant']['cni']
                ],
                'statut_inscription' => $this->resource['etape_inscription']
            ],
            'tuteur' => [
                'nom' => $this->resource['informations_tuteur']['nom'],
                'prenom' => $this->resource['informations_tuteur']['prenom'],
                'telephone' => $this->resource['informations_tuteur']['telephone'],
                'email' => $this->resource['informations_tuteur']['email'],
                'profession' => $this->resource['informations_tuteur']['profession'],
                'adresse' => $this->resource['informations_tuteur']['adresse']
            ],
            'dossiers' => collect($this->resource['dossiers'])->map(function ($dossier) {
                return [
                    'type' => $dossier['type'],
                    'statut' => $dossier['statut'],
                    'date_soumission' => $dossier['date_soumission'],
                    'commentaire' => $dossier['commentaire']
                ];
            })
        ];
    }
}