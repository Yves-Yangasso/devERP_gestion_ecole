<?php
namespace App\Contracts\Repositories\Formation;

interface FormationRepositoryInterface
{
    public function getAll();
    public function findById($id);
    public function create(array $data);
    public function update($id, array $data);
    public function delete($id);
    public function getStructureTarifaireByFormationId($formation_id);
}
