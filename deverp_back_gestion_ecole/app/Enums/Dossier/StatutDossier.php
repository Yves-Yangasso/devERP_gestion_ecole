<?php

namespace App\Enums\Dossier;

enum StatutDossier: string
{
    case EN_ATTENTE = 'en_attente';
    case EN_COURS_VALIDATION = 'en_cours_validation';
    case VALIDE = 'valide';
    case INVALIDE = 'INvalide';
    case REJETE = 'rejete';
    case INCOMPLET = 'incomplet';
    case ARCHIVE = 'archive';

    public static function values(): array
    {
        return array_column(self::cases(), 'value');
    }
}
