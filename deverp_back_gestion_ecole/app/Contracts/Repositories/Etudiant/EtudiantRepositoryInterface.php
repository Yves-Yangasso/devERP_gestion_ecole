<?php
namespace App\Contracts\Repositories\Etudiant;

interface EtudiantRepositoryInterface {
    public function create(array $data);
    public function findById($id);
    public function getAll();
    public function update($id, array $data);
    public function delete($id);
}
