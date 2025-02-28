<?php
namespace App\Services\StructureTarifaire;

use App\Contracts\Repositories\StructureTarifaire\StructureTarifaireRepositoryInterface;

class StructureTarifaireService
{
    protected $structureTarifaireRepository;

    public function __construct(StructureTarifaireRepositoryInterface $structureTarifaireRepository)
    {
        $this->structureTarifaireRepository = $structureTarifaireRepository;
    }

    public function getAll()
    {
        return $this->structureTarifaireRepository->getAll();
    }

    public function getById($id)
    {
        return $this->structureTarifaireRepository->findById($id);
    }

    public function create(array $data)
    {
        return $this->structureTarifaireRepository->create($data);
    }

    public function update($id, array $data)
    {
        return $this->structureTarifaireRepository->update($id, $data);
    }

    public function delete($id)
    {
        return $this->structureTarifaireRepository->delete($id);
    }
}
