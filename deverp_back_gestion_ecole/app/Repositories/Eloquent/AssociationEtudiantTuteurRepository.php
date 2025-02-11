<?php

namespace App\Repositories\Eloquent;

use App\Contracts\Repositories\Tuteur\AssociationRepositoryInterface;
use App\Models\AssociationEtudiantTuteur;

class AssociationEtudiantTuteurRepository implements AssociationRepositoryInterface
{
    public function associerEtudiantATuteur(int $etudiantId, int $tuteurId)
    {
        return AssociationEtudiantTuteur::create([
            'etudiant_id' => $etudiantId,
            'tuteur_id' => $tuteurId,
        ]);
    }

    public function dissocierEtudiantDuTuteur(int $etudiantId, int $tuteurId)
    {
        return AssociationEtudiantTuteur::where('etudiant_id', $etudiantId)
            ->where('tuteur_id', $tuteurId)
            ->delete();
    }

    public function obtenirTuteursParEtudiant(int $etudiantId)
    {
        return AssociationEtudiantTuteur::where('etudiant_id', $etudiantId)
            ->with('tuteur')
            ->get();
    }

    public function obtenirEtudiantsParTuteur(int $tuteurId)
    {
        return AssociationEtudiantTuteur::where('tuteur_id', $tuteurId)
            ->with('etudiant')
            ->get();
    }
}
