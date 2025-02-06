<?php
// app/Listeners/Etudiant/EnvoyerEmailBienvenue.php

namespace App\Listeners\Etudiant;

use App\Events\Etudiant\EtudiantCree;
use App\Notifications\Etudiant\NotificationBienvenue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Support\Facades\Log;

class EnvoyerEmailBienvenue implements ShouldQueue
{
    public $tries = 3;
    public $backoff = 3;

    public function handle(EtudiantCree $event)
    {
        $event->etudiant->notify(new NotificationBienvenue());
    }

    public function failed(EtudiantCree $event, \Throwable $exception)
    {
        // Gérer l'échec de l'envoi
        Log::error('Échec envoi email de bienvenue', [
            'etudiant_id' => $event->etudiant->id,
            'error' => $exception->getMessage()
        ]);
    }
}