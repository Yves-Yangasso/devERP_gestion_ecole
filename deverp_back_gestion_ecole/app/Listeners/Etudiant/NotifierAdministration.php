<?php
// app/Listeners/Etudiant/NotifierAdministration.php

namespace App\Listeners\Etudiant;

use App\Events\Etudiant\EtudiantInscrit;
use App\Models\User;
use App\Notifications\Etudiant\NotificationNouvelleInscription;
use Illuminate\Contracts\Queue\ShouldQueue;

class NotifierAdministration implements ShouldQueue
{
    public function handle(EtudiantInscrit $event)
    {
        $admins = User::role('administrateur')->get();
        
        foreach ($admins as $admin) {
            $admin->notify(new NotificationNouvelleInscription($event->etudiant));
        }
    }
}