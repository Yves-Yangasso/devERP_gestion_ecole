<?php
// app/Enums/Etudiant/StatutInscription.php

namespace App\Enums\Etudiant;

enum StatutInscription: string
{
    case EN_ATTENTE = 'en_attente';
    case CONFIRMEE = 'confirmee';
    case REJETEE = 'rejetee';
    case TERMINEE = 'terminee';
    case ACTIF = 'actif';
}