<?php

namespace App\Enums\Dossier;

enum StatutDocument: string
{
    case EN_ATTENTE = 'en_attente';
    case VALIDE = 'valide';
    case INVALIDE = 'invalide';
}