<?php
namespace App\Services\NiveauEtudes;

use App\Contracts\Repositories\NiveauEtudes\NiveauEtudesRepositoryInterface;

class NiveauEtudesService
{
    protected $repository;

    public function __construct(NiveauEtudesRepositoryInterface $repository)
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
}
