<?php
// app/Repositories/Eloquent/ProfilEtudiantRepository.php

namespace App\Repositories\Eloquent;

use App\Models\ProfilEtudiant;
use App\Contracts\Repositories\Etudiant\ProfilEtudiantRepositoryInterface;

class ProfilEtudiantRepository extends BaseRepository implements ProfilEtudiantRepositoryInterface
{
    public function __construct(ProfilEtudiant $model)
    {
        parent::__construct($model);
    }

    public function trouverParEtudiantId($etudiantId)
    {
        return $this->model->where('etudiant_id', $etudiantId)->firstOrFail();
    }

    public function mettreAJourPhoto($id, string $cheminPhoto)
    {
        $profil = $this->trouverParId($id);
        $profil->photo = $cheminPhoto;
        $profil->save();
        return $profil;
    }
    public function create(array $donnees)
    {
        return $this->model->create($donnees);
    }
}
