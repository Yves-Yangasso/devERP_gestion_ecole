<?php

namespace App\Http\Resources\Etudiant;

use Illuminate\Http\Resources\Json\JsonResource;
use App\Models\ProfilEtudiant;

class ProfilEtudiantResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        /** @var ProfilEtudiant $this */
        return [
            'id' => $this->id,
            'etudiant_id' => $this->etudiant_id,
            'photo_profil' => $this->photo_profil ? url($this->photo_profil) : null,
            'date_entree' => $this->date_entree ? $this->date_entree->format('Y-m-d') : null,
            'promotion' => $this->promotion,
            'niveau_etude' => $this->niveau_etude,
            'specialite' => $this->specialite,
            'parcours' => $this->parcours,
            'formation_precedente' => $this->formation_precedente,
            'etablissement_precedent' => $this->etablissement_precedent,
            'annee_obtention_bac' => $this->annee_obtention_bac,
            'serie_bac' => $this->serie_bac,
            'moyenne_bac' => $this->moyenne_bac,

            // Informations supplémentaires
            'cursus' => [
                'diplomes' => $this->diplomes ?? [],
                'certificats' => $this->certificats ?? [],
            ],

            // Métadonnées supplémentaires
            'meta' => [
                'est_boursier' => $this->est_boursier,
                'type_bourse' => $this->type_bourse,
                'handicap' => $this->handicap,
                'details_handicap' => $this->details_handicap,
            ],
        ];
    }

    // /**
    //  * Personnalisation de la réponse lors de l'inclusion de ressources
    //  *
    //  * @param  \Illuminate\Http\Request  $request
    //  * @return array
    //  */
    //     public function with($request)
    //     {
    //         return [
    //             'meta' => [
    //                 'peut_modifier' => auth()->user() && auth()->user()->can('update', $this->resource),
    //             ],
    //         ];
    //     }

    /**
     * Personnalisation de la réponse en cas d'absence de ressource
     *
     * @return array
     */
    public static function empty()
    {
        return [
            'id' => null,
            'photo_profil' => null,
            'date_entree' => null,
            'promotion' => null,
            'niveau_etude' => null,
            'specialite' => null,
            'parcours' => null,
            'formation_precedente' => null,
            'etablissement_precedent' => null,
            'annee_obtention_bac' => null,
            'serie_bac' => null,
            'moyenne_bac' => null,
            // Informations supplémentaires
            'cursus' => [
                'diplomes' => [],
                'certificats' => [],
            ],
            // Métadonnées supplémentaires
            'meta' => [
                'peut_modifier' => false,
                'est_boursier' => false,
                'type_bourse' => null,
                'handicap' => false,
                'details_handicap' => null,
            ],
            // Autres champs avec des valeurs nulles
        ];
    }
}
