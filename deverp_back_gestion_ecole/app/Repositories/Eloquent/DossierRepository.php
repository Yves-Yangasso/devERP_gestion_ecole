<?php
// app/Repositories/Eloquent/DossierRepository.php

namespace App\Repositories\Eloquent;

use App\Contracts\Repositories\DossierRepositoryInterface;
use App\Models\Dossier;

class DossierRepository implements DossierRepositoryInterface
{
    protected $model;

    public function __construct(Dossier $model)
    {
        $this->model = $model;
    }

    public function creer(array $donnees)
    {
        return $this->model->create($donnees);
    }

    public function trouver($id)
    {
        return $this->model->findOrFail($id);
    }

    public function mettreAJour($id, array $donnees)
    {
        $dossier = $this->trouver($id);
        $dossier->update($donnees);
        return $dossier;
    }

    public function supprimer($id)
    {
        $dossier = $this->trouver($id);
        return $dossier->delete();
    }

    public function toutRecuperer()
    {
        return $this->model->all();
    }

    // Méthodes supplémentaires spécifiques aux dossiers
    public function recupererParEtudiant($etudiantId)
    {
        return $this->model->where('etudiant_id', $etudiantId)->get();
    }

    public function recupererParStatut($statut)
    {
        return $this->model->where('statut', $statut)->get();
    }
    public function findByEtudiant(int $etudiantId)
    {
        return $this->model->where('etudiant_id', $etudiantId)->get();
    }
    public function getDocumentsMandatoires(int $etudiantId)
    {
        return Dossier::where('etudiant_id', $etudiantId)
            ->where('est_obligatoire', true)
            ->get();
    }
}
