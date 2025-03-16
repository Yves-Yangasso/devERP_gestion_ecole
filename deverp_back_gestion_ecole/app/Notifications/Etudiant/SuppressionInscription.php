<?php
namespace App\Notifications\Etudiant;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use Illuminate\Container\Attributes\Auth;

class SuppressionInscription extends Notification implements ShouldQueue{
    use Queueable;
    protected $inscription;

    public function __construct($inscription)
    {
        $this->inscription = $inscription;
    }

    public function via($notifiable){
        return ["mail","data","sms"];
    }

    public function toMail($notifiable){
        return (new MailMessage)
        ->subject("Confirmation de la Suppressionde l\'Inscription N°". $this->inscription->id ."")
        ->line("Cher(e) utilisateurs Votre démande de suppression de l'inscription N°". $this->inscription->id ." a été traité avec succès.")
        ->line("Merci de nous avoir contacté.");
    }
}
