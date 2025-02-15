<?php

// Service AssociationService
namespace App\Services;

use App\Models\ProfilTuteur;
use App\Models\Etudiant;

class AssociationService
{
    public function mettreAJourAssociations($tuteurId, $etudiantIds)
    {
        $tuteur = ProfilTuteur::findOrFail($tuteurId);
        $tuteur->etudiants()->sync($etudiantIds);
    }
}
