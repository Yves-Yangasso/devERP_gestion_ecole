<?php
// app/Repositories/Eloquent/BaseRepository.php

namespace App\Repositories;

use App\Contracts\Repositories\BaseRepositoryInterface;
use Illuminate\Database\Eloquent\Model;

abstract class BaseRepository implements BaseRepositoryInterface
{
    protected $model;

    public function __construct(Model $model)
    {
        $this->model = $model;
    }

    public function tous(array $colonnes = ['*'])
    {
        return $this->model->all($colonnes);
    }

    public function trouverParId($id)
    {
        return $this->model->findOrFail($id);
    }

    public function creer(array $donnees)
    {
        return $this->model->create($donnees);
    }

    public function modifier($id, array $donnees)
    {
        $model = $this->trouverParId($id);
        $model->update($donnees);
        return $model;
    }

    public function supprimer($id)
    {
        return $this->trouverParId($id)->delete();
    }

    public function paginer(int $nombreParPage = 15, array $colonnes = ['*'])
    {
        return $this->model->paginate($nombreParPage, $colonnes);
    }
    public function find(int $id)
    {
        return $this->model->findOrFail($id);
    }
}
