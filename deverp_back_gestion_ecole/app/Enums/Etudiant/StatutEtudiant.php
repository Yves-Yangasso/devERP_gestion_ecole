<?php
// app/Enums/Etudiant/StatutEtudiant.php

namespace App\Enums\Etudiant;

enum StatutEtudiant: string
{
    case EN_ATTENTE = 'en_attente';
    case ACTIF = 'actif';
    case INACTIF = 'inactif';
    case DIPLOME = 'diplome';
    case EXCLU = 'exclu';

    public function label(): string
    {
        return match($this) {
            self::EN_ATTENTE => 'En attente',
            self::ACTIF => 'Actif',
            self::INACTIF => 'Inactif',
            self::DIPLOME => 'Diplômé',
            self::EXCLU => 'Exclu'
        };
    }
}