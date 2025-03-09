<?php
namespace App\Repositories\Eloquent;

use App\Contracts\Repositories\Etudiant\EtudiantRepositoryInterface;
use App\Models\Etudiant;

class EtudiantRepository implements EtudiantRepositoryInterface {
    public function create(array $data) {
        // Génération du matricule
        $year = date('Y');
        $month = date('m');
        $id = $data['id']; // Assurez-vous que l'ID est fourni ou généré avant
        $data['matricule'] = "{$year}-{$month}-{$id}";

        // Génération de l'email institutionnel
        $data['email_institutionnel'] = strtolower("{$data['prenom']}.{$data['nom']}@groupeisi.sn");

        return Etudiant::create($data);
    }
    public function findById($id) {
        return Etudiant::find($id);
    }
    public function getAll() {
        return Etudiant::all();
    }
    public function update($id, array $data) {
        return Etudiant::where('id', $id)->update($data);
    }
    public function delete($id) {
        return Etudiant::destroy($id);
    }
}
