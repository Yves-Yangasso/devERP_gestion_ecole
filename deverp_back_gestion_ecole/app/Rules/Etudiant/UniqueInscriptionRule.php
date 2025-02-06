<?php

namespace App\Rules\Etudiant;

use Illuminate\Contracts\Validation\Rule;
use App\Models\Inscription;

class UniqueInscriptionRule implements Rule
{
    private $anneeAcademique;
    private $message;

    public function __construct($anneeAcademique)
    {
        $this->anneeAcademique = $anneeAcademique;
    }

    public function passes($attribute, $value)
    {
        $existingInscription = Inscription::where('etudiant_id', $value)
            ->where('annee_academique', $this->anneeAcademique)
            ->exists();

        if ($existingInscription) {
            $this->message = "L'étudiant est déjà inscrit pour l'année académique {$this->anneeAcademique}";
            return false;
        }

        return true;
    }

    public function message()
    {
        return $this->message;
    }
}