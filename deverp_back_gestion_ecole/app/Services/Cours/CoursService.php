<?php
namespace App\Services\Cours;

use App\Contracts\Repositories\Cours\CoursRepositoryInterface;

class CoursService
{
    protected $coursRepository;

    public function __construct(CoursRepositoryInterface $coursRepository)
    {
        $this->coursRepository = $coursRepository;
    }

    public function getAll()
    {
        return $this->coursRepository->getAll();
    }

    public function getById($id)
    {
        return $this->coursRepository->findById($id);
    }

    public function create(array $data)
    {
        return $this->coursRepository->create($data);
    }

    public function update($id, array $data)
    {
        return $this->coursRepository->update($id, $data);
    }

    public function delete($id)
    {
        return $this->coursRepository->delete($id);
    }
}
