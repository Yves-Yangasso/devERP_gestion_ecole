<?php
namespace App\Services\OptionFormation;

use App\Contracts\Repositories\OptionFormation\OptionFormationRepositoryInterface;

class OptionFormationService
{
    protected $optionFormationRepository;

    public function __construct(OptionFormationRepositoryInterface $optionFormationRepository)
    {
        $this->optionFormationRepository = $optionFormationRepository;
    }

    public function getAll()
    {
        return $this->optionFormationRepository->getAll();
    }

    public function getById($id)
    {
        return $this->optionFormationRepository->findById($id);
    }

    public function create(array $data)
    {
        return $this->optionFormationRepository->create($data);
    }

    public function update($id, array $data)
    {
        return $this->optionFormationRepository->update($id, $data);
    }

    public function delete($id)
    {
        return $this->optionFormationRepository->delete($id);
    }
}
