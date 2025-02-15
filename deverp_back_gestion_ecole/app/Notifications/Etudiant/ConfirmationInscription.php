<?php

namespace App\Notifications\Etudiant;

use App\Models\Inscription;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Support\Facades\Auth;

class ConfirmationInscription extends Notification implements ShouldQueue
{
    use Queueable;

    protected $student;

    public function __construct(Inscription $student)
    {
        $this->student = $student;
    }

    public function via($notifiable)
    {
        return ['mail'];
    }

    public function toMail($notifiable)
    {
        return (new MailMessage)
            ->subject('Confirmation de votre inscription')
            ->greeting('Bonjour ' . $this->student->prenom . ' ' . $this->student->nom . ',')
            ->line('Votre inscription a bien été enregistrée.')
            ->line('Merci de nous faire confiance !')
            ->action('Accéder à votre compte', url('/'))
            ->line('Cordialement, l\'équipe de gestion.');
    }
}
