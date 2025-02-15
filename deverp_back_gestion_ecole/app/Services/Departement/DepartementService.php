<?php
namespace App\Services\Departement;

use App\Contracts\Repositories\Departement\DepartementRepositoryInterface;

class DepartementService {
    protected $departementRepository;

    public function __construct(DepartementRepositoryInterface $departementRepository) {
        $this->departementRepository = $departementRepository;
    }

    public function getAll() {
        return $this->departementRepository->getAll();
    }

    public function getById($id) {
        return $this->departementRepository->getById($id);
    }

    public function create(array $data) {
        return $this->departementRepository->create($data);
    }

    public function update($id, array $data) {
        return $this->departementRepository->update($id, $data);
    }

    public function delete($id) {
        return $this->departementRepository->delete($id);
    }
}
