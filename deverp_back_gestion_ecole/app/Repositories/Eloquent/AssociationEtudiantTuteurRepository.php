<?php

namespace App\Repositories\Eloquent;

use App\Models\AssociationEtudiantTuteur;
use App\Models\Inscription;
use App\Models\Tuteur;

class AssociationEtudiantTuteurRepository
{
    protected $model;

    public function __construct(AssociationEtudiantTuteur $model)
    {
        $this->model = $model;
    }

    public function create(array $data)
    {
        return $this->model->create($data);
    }

    /**
     * Récupère toutes les inscriptions associées à un tuteur donné,
     * en incluant les informations des inscriptions.
     */
    public function getInscriptionsByTuteur(int $tuteurId)
    {
        return $this->model
            ->where('tuteur_id', $tuteurId)
            ->with('inscription') // Charge les informations de l'inscription
            ->get();
    }

    /**
     * Récupère tous les tuteurs associés à une inscription donnée,
     * en incluant les informations des tuteurs.
     */
    public function getTuteursByInscription(int $inscriptionId)
    {
        return $this->model
            ->where('inscription_id', $inscriptionId)
            ->with('tuteur') // Charge les informations du tuteur
            ->get();
    }
}
