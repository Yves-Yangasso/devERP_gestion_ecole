<?php
namespace App\Services\Filieres;

use App\Contracts\Repositories\Filieres\FiliereRepositoryInterface;

class FiliereService
{
    protected $repository;

    public function __construct(FiliereRepositoryInterface $repository)
    {
        $this->repository = $repository;
    }

    public function getAll()
    {
        return $this->repository->getAll();
    }

    public function findById($id)
    {
        return $this->repository->findById($id);
    }

    public function create(array $data)
    {
        return $this->repository->create($data);
    }

    public function update($id, array $data)
    {
        return $this->repository->update($id, $data);
    }

    public function delete($id)
    {
        return $this->repository->delete($id);
    }

    public function getFormationsByFiliereId(int $id)
    {
        return $this->repository->getFormationsByFiliereId($id);
    }
}
