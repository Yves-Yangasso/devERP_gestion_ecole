<?php

namespace App\Traits\Tuteur;

use App\Models\Etudiant;
use App\Enums\Tuteur\TypeAssociation;

trait GestionAssociations
{
    public function associerEtudiant(Etudiant $etudiant, TypeAssociation $type)
    {
        $this->etudiants()->attach($etudiant->id, [
            'type_association' => $type->value
        ]);
    }

    public function retirerEtudiant(Etudiant $etudiant)
    {
        $this->etudiants()->detach($etudiant->id);
    }
}
