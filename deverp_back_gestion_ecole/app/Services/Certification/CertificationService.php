<?php

namespace App\Services\Certification;

use App\Contracts\Repositories\Certification\CertificationRepositoryInterface;

class CertificationService
{
    protected $certificationRepository;

    public function __construct(CertificationRepositoryInterface $certificationRepository)
    {
        $this->certificationRepository = $certificationRepository;
    }

    public function getAllCertifications()
    {
        return $this->certificationRepository->getAll();
    }

    public function getCertificationById($id)
    {
        return $this->certificationRepository->findById($id);
    }

    public function createCertification(array $data)
    {
        return $this->certificationRepository->create($data);
    }

    public function updateCertification($id, array $data)
    {
        return $this->certificationRepository->update($id, $data);
    }

    public function deleteCertification($id)
    {
        return $this->certificationRepository->delete($id);
    }
}
