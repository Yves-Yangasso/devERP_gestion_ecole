<?php

namespace App\Listeners\Dossier;

use App\Events\Dossier\DossierValide;
use App\Notifications\Dossier\ResultatValidationDossier;
use Illuminate\Contracts\Queue\ShouldQueue;

class EnvoyerNotificationValidation implements ShouldQueue
{
    public function handle(DossierValide $event)
    {
        $etudiant = $event->dossier->inscription->etudiant;
        $etudiant->notify(new ResultatValidationDossier($event->dossier));
    }
}