<?php

namespace App\Enums\Dossier;

enum StatutDossier: string
{
    case EN_ATTENTE = 'en_attente';
    case EN_COURS_VALIDATION = 'en_cours_validation';
    case VALIDE = 'valide';
    case REJETE = 'rejete';
    case INCOMPLET = 'incomplet';
    case ARCHIVE = 'archive';
}