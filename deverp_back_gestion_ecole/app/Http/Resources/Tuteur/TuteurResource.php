<?php

namespace App\Http\Resources\Tuteur;

use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\Etudiant\EtudiantResource;

class TuteurResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            
            // Informations personnelles
            'prenom' => $this->prenom,
            'nom' => $this->nom,
            'nom_complet' => $this->prenom . ' ' . $this->nom,
            
            // Coordonnées
            'email' => $this->email,
            'telephone' => $this->telephone,
            'adresse' => $this->adresse,
            
            // Informations professionnelles
            'fonctions' => $this->fonctions,
            
            // Statut et timestamps
            'statut' => $this->statut->value,
            'created_at' => $this->created_at->format('Y-m-d H:i:s'),
            'updated_at' => $this->updated_at->format('Y-m-d H:i:s'),
            
            // Relations (chargées conditionnellement)
            'etudiants' => EtudiantResource::collection($this->whenLoaded('etudiants')),
            'nombre_etudiants' => $this->whenLoaded('etudiants', function() {
                return $this->etudiants->count();
            }),
            
            // Informations utilisateur (si lié à un compte)
            // 'user' => $this->when($this->user_id, [
            //     'id' => $this->user->id,
            //     'email' => $this->user->email,
            //     'roles' => $this->user->roles->pluck('name')
            // ]),
            
            // URLs pour les actions courantes
            // 'links' => [
            //     'self' => route('api.tuteurs.show', $this->id),
            //     'update' => route('api.tuteurs.update', $this->id),
            //     'delete' => route('api.tuteurs.destroy', $this->id),
            // ],
            
            // Métadonnées supplémentaires
            'meta' => [
                'derniere_connexion' => $this->derniere_connexion?->format('Y-m-d H:i:s'),
                'est_actif' => $this->statut === 'actif',
                'type_association' => $this->whenPivotLoaded('association_etudiant_tuteur', function() {
                    return $this->pivot->type_association;
                })
            ],
        ];
    }

    /**
     * Get additional data that should be returned with the resource array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function with($request)
    {
        return [
            'success' => true,
            'message' => 'Données du tuteur récupérées avec succès',
        ];
    }
}