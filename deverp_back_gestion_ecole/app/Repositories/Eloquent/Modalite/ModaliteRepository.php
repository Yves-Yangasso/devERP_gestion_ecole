<?php
namespace App\Repositories\Eloquent\Modalite;

use App\Models\Modalite;
use App\Contracts\Repositories\Modalite\ModaliteRepositoryInterface;
class ModaliteRepository implements ModaliteRepositoryInterface
{
    public function getAll()
    {
        return Modalite::all();
    }

    public function findById($id)
    {
        return Modalite::findOrFail($id);
    }

    public function create(array $data)
    {
        return Modalite::create($data);
    }

    public function update($id, array $data)
    {
        $modalite = Modalite::findOrFail($id);
        $modalite->update($data);
        return $modalite;
    }

    public function delete($id)
    {
        return Modalite::destroy($id);
    }
}
