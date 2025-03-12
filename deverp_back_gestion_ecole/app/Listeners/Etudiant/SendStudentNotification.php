<?php
namespace App\Listeners\Etudiant;

use App\Events\Etudiant\EtudiantCree;
use App\Notifications\Etudiant\StudentRegisteredNotification;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Support\Facades\Log;

class SendStudentNotification implements ShouldQueue
{
    public function handle(EtudiantCree $event)
{
    $student = $event->student->load('inscription');
    $personalEmail = $student->inscription->email ?? 'Email personnel non trouvé';
    Log::info('Email personnel récupéré : ' . $personalEmail);
    Log::info('Envoi de la notification à : ' . $personalEmail);
    $event->student->notify(new StudentRegisteredNotification($event->student, $personalEmail));
}
}
