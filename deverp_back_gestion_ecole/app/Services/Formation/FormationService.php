<?php
namespace App\Services\Formation;

use App\Contracts\Repositories\Formation\FormationRepositoryInterface;

class FormationService
{
    protected $repository;

    public function __construct(FormationRepositoryInterface $repository)
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

    public function getStructureTarifaire($formation_id)
    {
        $formation = $this->repository->getStructureTarifaireByFormationId($formation_id);

        if (!$formation) {
            return ['error' => 'Formation non trouvée', 'code' => 404];
        }

        if (!$formation->structureTarifaire) {
            return ['error' => 'Aucune structure tarifaire trouvée pour cette formation', 'code' => 404];
        }

        return $formation->structureTarifaire;
    }
}
