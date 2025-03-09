<?php
namespace App\Repositories\Eloquent;

use App\Contracts\Repositories\Etudiant\EtudiantRepositoryInterface;
use App\Models\Etudiant;

class EtudiantRepository implements EtudiantRepositoryInterface
{
    public function create(array $data)
    {
        $etudiant = Etudiant::create($data);
        // Génération du matricule après création (id est maintenant disponible)
        $etudiant->matricule = date('Y') . '-' . date('m') . '-' . $etudiant->id;
        $etudiant->email_institutionnel = strtolower("{$etudiant->prenom}.{$etudiant->nom}@groupeisi.sn");

        $etudiant->save();

        return $etudiant;
    }

    public function findById($id)
    {
        return Etudiant::find($id);
    }

    public function getAll()
    {
        return Etudiant::all();
    }

    public function update($id, array $data)
    {
        return Etudiant::where('id', $id)->update($data);
    }

    public function delete($id)
    {
        return Etudiant::destroy($id);
    }
}

