<?php
namespace App\Services\Filieres;

use App\Contracts\Repositories\Filieres\FiliereRepositoryInterface;

class FiliereService {
    protected $filiereRepository;

    public function __construct(FiliereRepositoryInterface $filiereRepository) {
        $this->filiereRepository = $filiereRepository;
    }

    public function getAll() {
        return $this->filiereRepository->getAll();
    }

    public function getById($id) {
        return $this->filiereRepository->getById($id);
    }

    public function create(array $data) {
        return $this->filiereRepository->create($data);
    }

    public function update($id, array $data) {
        return $this->filiereRepository->update($id, $data);
    }

    public function delete($id) {
        return $this->filiereRepository->delete($id);
    }
}
