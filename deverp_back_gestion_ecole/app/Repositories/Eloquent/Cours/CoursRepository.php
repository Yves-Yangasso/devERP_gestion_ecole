<?php
namespace App\Repositories\Eloquent\Cours;

use App\Models\Cours;
use App\Contracts\Repositories\Cours\CoursRepositoryInterface;
class CoursRepository implements CoursRepositoryInterface
{
    public function getAll()
    {
        return Cours::all();
    }

    public function findById($id)
    {
        return Cours::findOrFail($id);
    }

    public function create(array $data)
    {
        return Cours::create($data);
    }

    public function update($id, array $data)
    {
        $cours = Cours::findOrFail($id);
        $cours->update($data);
        return $cours;
    }

    public function delete($id)
    {
        return Cours::destroy($id);
    }
}
