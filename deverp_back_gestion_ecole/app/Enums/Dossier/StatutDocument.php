<?php

namespace App\Enums\Dossier;

enum StatutDocument: string
{
    case EN_ATTENTE = 'en_attente';
    case VALIDE = 'valide';
    case INVALIDE = 'invalide';

    public static function values(): array
    {
        return array_column(self::cases(), 'value');
    }
}
