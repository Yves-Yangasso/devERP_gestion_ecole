<?php

namespace App\Exceptions;

use Exception;
use Symfony\Component\HttpFoundation\Response;

class InscriptionException extends Exception
{
    public static function etudiantDejaInscrit($etudiantId, $anneeAcademique)
    {
        return new self(
            "L'étudiant avec l'ID {$etudiantId} est déjà inscrit pour l'année académique {$anneeAcademique}",
            Response::HTTP_CONFLICT
        );
    }

    public static function inscriptionImpossible($message)
    {
        return new self(
            "Inscription impossible : {$message}",
            Response::HTTP_BAD_REQUEST
        );
    }
}