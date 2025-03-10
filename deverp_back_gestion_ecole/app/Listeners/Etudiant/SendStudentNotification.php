<?php
namespace App\Listeners\Etudiant;

use App\Events\Etudiant\EtudiantCree;
use App\Notifications\Etudiant\StudentRegisteredNotification;
use Illuminate\Contracts\Queue\ShouldQueue;

class SendStudentNotification implements ShouldQueue {
    public function handle(EtudiantCree $event) {
        $event->student->notify(new StudentRegisteredNotification());
    }
}
