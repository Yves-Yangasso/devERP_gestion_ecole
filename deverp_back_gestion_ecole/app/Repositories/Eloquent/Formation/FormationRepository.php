<?php
namespace App\Repositories\Eloquent\Formation;

use App\Models\Formation;
use App\Contracts\Repositories\Formation\FormationRepositoryInterface;

class FormationRepository implements FormationRepositoryInterface
{
    public function getAll()
    {
        return Formation::all();
    }

    public function findById($id)
    {
        return Formation::findOrFail($id);
    }

    public function create(array $data)
    {
        return Formation::create($data);
    }

    public function update($id, array $data)
    {
        $formation = Formation::findOrFail($id);
        $formation->update($data);
        return $formation;
    }

    public function delete($id)
    {
        Formation::destroy($id);
    }

    public function getStructureTarifaireByFormationId($formation_id)
    {
        return Formation::with('structureTarifaire')->find($formation_id);
    }
}

