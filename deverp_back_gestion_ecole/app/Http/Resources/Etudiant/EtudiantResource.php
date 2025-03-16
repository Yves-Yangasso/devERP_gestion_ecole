<?php

namespace App\Http\Resources\Etudiant;

use Illuminate\Http\Resources\Json\JsonResource;

class EtudiantResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'matricule' => $this->matricule,
            'nom' => $this->nom,
            'prenom' => $this->prenom,
            'date_naissance' => $this->date_naissance,
            'lieu_naissance' => $this->lieu_naissance,
            'email' => $this->email,
            'telephone' => $this->telephone,
            'statut' => $this->statut,
            'profil' => new ProfilEtudiantResource($this->whenLoaded('profil')),
            'tuteur' => $this->whenLoaded('tuteur', function () {
                return [
                    'nom' => $this->tuteur->nom,
                    'prenom' => $this->tuteur->prenom,
                    'telephone' => $this->tuteur->telephone,
                    'email' => $this->tuteur->email,
                    'profession' => $this->tuteur->profession,
                    'adresse' => $this->tuteur->adresse,
                    'type_tuteur' => $this->tuteur->type_tuteur,
                    // 'etudiants' => $this->tuteur->etudiants->map(function ($etudiant) {
                    //     return [
                    //         'id' => $etudiant->id,
                    //         'matricule' => $etudiant->matricule,
                    //         'nom' => $etudiant->nom,
                    //         'prenom' => $etudiant->prenom,
                    //         'date_naissance' => $etudiant->date_naissance,
                    //         'lieu_naissance' => $etudiant->lieu_naissance,
                    //         'email' => $etudiant->email,
                    //         'telephone' => $etudiant->telephone,
                    //         'statut' => $etudiant->statut,
                    //     ];
                    // })
                ];
            }),
        ];
    }
}