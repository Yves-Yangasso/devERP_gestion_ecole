<?php

namespace App\Enums\Dossier;

enum ResultatValidation: string
{
    case EN_ATTENTE = 'en_attente';
    case VALIDE = 'valide';
    case INVALIDE = 'invalide';
    case A_VERIFIER = 'a_verifier';
}