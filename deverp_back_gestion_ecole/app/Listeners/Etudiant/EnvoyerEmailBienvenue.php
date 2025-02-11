<?php

namespace App\Listeners\Etudiant;

use App\Events\Etudiant\EtudiantInscrit;
use App\Notifications\Etudiant\ConfirmationInscription;
class EnvoyerEmailBienvenue
{
    public function handle(EtudiantInscrit $event)
    {
        $user = $event->student;
        $user->notify(new ConfirmationInscription($user));
    }
}
