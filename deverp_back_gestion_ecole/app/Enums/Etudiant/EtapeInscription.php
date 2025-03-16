<?php
//app/Enums/Etudiant/EtapeInscription.php

namespace App\Enums\Etudiant;

enum EtapeInscription: string
{
    case INFOS_PERSONNELLES = 'infos_personnelles';
    case INFOS_TUTEUR = 'infos_tuteur';
    case DOCUMENTS = 'documents';
    case VALIDATION = 'validation';
    case COMPLETE = 'complete';
}