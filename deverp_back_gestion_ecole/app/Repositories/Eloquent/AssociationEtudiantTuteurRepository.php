<?php

namespace App\Repositories\Eloquent;


use App\Contracts\Repositories\Etudiant\AssociationEtudiantTuteurRepositoryInterface;
use App\Models\AssociationEtudiantTuteur;

class AssociationEtudiantTuteurRepository implements AssociationEtudiantTuteurRepositoryInterface
{
    public function create(array $data)
    {
        return AssociationEtudiantTuteur::create($data);
    }
}


















// use App\Models\AssociationEtudiantTuteur;

// class AssociationEtudiantTuteurRepository implements
// {
//     public function associerEtudiantATuteur(array $data)
//     {
//         return AssociationEtudiantTuteur::create($data);
//     }

//     public function dissocierEtudiantDuTuteur(int $etudiantId, int $tuteurId)
//     {
//         return AssociationEtudiantTuteur::where('etudiant_id', $etudiantId)
//             ->where('tuteur_id', $tuteurId)
//             ->delete();
//     }

//     public function obtenirTuteursParEtudiant(int $etudiantId)
//     {
//         return AssociationEtudiantTuteur::where('etudiant_id', $etudiantId)
//             ->with('tuteur')
//             ->get();
//     }

//     public function obtenirEtudiantsParTuteur(int $tuteurId)
//     {
//         return AssociationEtudiantTuteur::where('tuteur_id', $tuteurId)
//             ->with('etudiant')
//             ->get();
//     }
// }
