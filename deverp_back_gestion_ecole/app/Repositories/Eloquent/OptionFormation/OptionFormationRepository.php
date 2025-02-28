<?php
namespace App\Repositories\Eloquent\OptionFormation;

use App\Models\OptionFormation;
use App\Contracts\Repositories\OptionFormation\OptionFormationRepositoryInterface;
class OptionFormationRepository implements OptionFormationRepositoryInterface
{
    public function getAll()
    {
        return OptionFormation::all();
    }

    public function findById($id)
    {
        return OptionFormation::findOrFail($id);
    }

    public function create(array $data)
    {
        return OptionFormation::create($data);
    }

    public function update($id, array $data)
    {
        $option = OptionFormation::findOrFail($id);
        $option->update($data);
        return $option;
    }

    public function delete($id)
    {
        return OptionFormation::destroy($id);
    }
}
