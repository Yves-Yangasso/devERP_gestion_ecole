<?php

namespace App\Repositories\Eloquent\Certification;

use App\Models\Certification;
use App\Contracts\Repositories\Certification\CertificationRepositoryInterface;

class CertificationRepository implements CertificationRepositoryInterface
{
    public function getAll()
    {
        return Certification::all();
    }

    public function findById($id)
    {
        return Certification::findOrFail($id);
    }

    public function create(array $data)
    {
        return Certification::create($data);
    }

    public function update($id, array $data)
    {
        $certification = Certification::findOrFail($id);
        $certification->update($data);
        return $certification;
    }

    public function delete($id)
    {
        $certification = Certification::findOrFail($id);
        return $certification->delete();
    }
}
