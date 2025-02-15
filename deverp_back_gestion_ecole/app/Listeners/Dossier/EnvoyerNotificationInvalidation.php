<?php

namespace App\Listeners\Dossier;

use App\Events\Dossier\DossierInvalide;
use App\Notifications\Dossier\ResultatValidationDossier;
use Illuminate\Contracts\Queue\ShouldQueue;

class EnvoyerNotificationInvalidation implements ShouldQueue
{
    public function handle(DossierInvalide $event)
    {
        $etudiant = $event->dossier->inscription->etudiant;
        $etudiant->notify(new ResultatValidationDossier($event->dossier));
    }
}