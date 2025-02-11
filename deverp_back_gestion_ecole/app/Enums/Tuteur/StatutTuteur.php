<?php

namespace App\Enums\Tuteur;

enum StatutTuteur: string
{
    case ACTIF = 'actif';
    case INACTIF = 'inactif';
    case SUSPENDU = 'suspendu';
}
