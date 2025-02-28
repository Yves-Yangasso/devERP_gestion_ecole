<?php
namespace App\Services\Modalite;

use App\Contracts\Repositories\Modalite\ModaliteRepositoryInterface;

class ModaliteService
{
    protected $modaliteRepository;

    public function __construct(ModaliteRepositoryInterface $modaliteRepository)
    {
        $this->modaliteRepository = $modaliteRepository;
    }

    public function getAll()
    {
        return $this->modaliteRepository->getAll();
    }

    public function getById($id)
    {
        return $this->modaliteRepository->findById($id);
    }

    public function create(array $data)
    {
        return $this->modaliteRepository->create($data);
    }

    public function update($id, array $data)
    {
        return $this->modaliteRepository->update($id, $data);
    }

    public function delete($id)
    {
        return $this->modaliteRepository->delete($id);
    }
}
