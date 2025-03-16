<?php
// app/Listeners/Etudiant/GenererCarteEtudiant.php

namespace App\Listeners\Etudiant;

use App\Events\Etudiant\EtudiantInscrit;
use App\Jobs\Etudiant\GenererCarteEtudiantJob;
use Illuminate\Contracts\Queue\ShouldQueue;

// class GenererCarteEtudiant implements ShouldQueue
// {
//     public function handle(EtudiantInscrit $event)
//     {
//         GenererCarteEtudiantJob::dispatch($event->etudiant)
//             ->delay(now()->addMinutes(5));
//     }
// }
