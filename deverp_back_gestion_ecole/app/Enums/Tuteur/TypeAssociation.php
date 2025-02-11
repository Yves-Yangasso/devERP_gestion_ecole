<?php

namespace App\Enums\Tuteur;

enum TypeAssociation: string 
{
    case PARENT = 'parent';
    case RESPONSABLE_LEGAL = 'responsable_legal';
    case EMPLOYEUR = 'employeur';
    case AUTRE = 'autre';
}