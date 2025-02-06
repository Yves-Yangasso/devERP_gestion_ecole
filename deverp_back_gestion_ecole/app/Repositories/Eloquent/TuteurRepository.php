<?php

namespace App\Repositories\Eloquent;

use App\Models\Tuteur;
use App\Contracts\Repositories\Tuteur\TuteurRepositoryInterface;

class TuteurRepository extends BaseRepository implements TuteurRepositoryInterface
{
    public function __construct(Tuteur $model)
    {
        parent::__construct($model);
    }

    public function create(array $donnees)
    {
        return $this->model->create($donnees);
    }

    public function createOrUpdateTuteur(array $donnees)
    {
        return $this->model->updateOrCreate(
            ['email' => $donnees['email']],
            $donnees
        );
    }
    public function findByEtudiant(int $etudiantId)
    {
        return $this->model->where('etudiant_id', $etudiantId)->first();
    }
}
