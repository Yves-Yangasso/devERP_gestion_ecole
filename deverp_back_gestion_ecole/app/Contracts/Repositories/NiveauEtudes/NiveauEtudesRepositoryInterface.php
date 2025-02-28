<?php
namespace App\Contracts\Repositories\NiveauEtudes;

interface NiveauEtudesRepositoryInterface
{
    public function getAll();
    public function findById($id);
    public function create(array $data);
    public function update($id, array $data);
    public function delete($id);
}
