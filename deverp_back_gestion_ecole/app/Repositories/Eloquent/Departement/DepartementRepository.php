<?php
namespace App\Repositories\Eloquent\Departement;

use App\Models\Departement;
use App\Contracts\Repositories\Departement\DepartementRepositoryInterface;
class DepartementRepository implements DepartementRepositoryInterface {
    public function getAll() {
        return Departement::all();
    }

    public function getById($id) {
        return Departement::findOrFail($id);
    }

    public function create(array $data) {
        return Departement::create($data);
    }

    public function update($id, array $data) {
        $departement = Departement::findOrFail($id);
        $departement->update($data);
        return $departement;
    }

    public function delete($id) {
        return Departement::destroy($id);
    }
}
