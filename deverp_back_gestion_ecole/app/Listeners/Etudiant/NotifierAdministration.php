<?php
// app/Listeners/Etudiant/NotifierAdministration.php

namespace App\Listeners\Etudiant;
use App\Events\Etudiant\EtudiantInscrit;
use App\Models\Inscription;
use App\Models\User;
use App\Notifications\Etudiant\NotificationNouvelleInscription;
use Illuminate\Contracts\Queue\ShouldQueue;

class NotifierAdministration implements ShouldQueue
{
    public $tries = 3;
    public $backoff = 3;

    public function handle(EtudiantInscrit $event)
    {
        $inscription = Inscription::find($event->inscription);
        $admins = User::role('administrateur')->get();

        foreach ($admins as $admin) {
            $admin->notify(new NotificationNouvelleInscription( $event->etudiant,$inscription));
        }
    }

}
