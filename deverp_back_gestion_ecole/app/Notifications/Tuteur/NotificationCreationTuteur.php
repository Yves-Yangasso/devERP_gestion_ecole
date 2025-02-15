<?php

namespace App\Notifications\Tuteur;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use App\Models\Tuteur;

class NotificationCreationTuteur extends Notification implements ShouldQueue
{
    use Queueable;

    public function __construct(public Tuteur $tuteur) {}

    public function via($notifiable)
    {
        return ['mail'];
    }

    public function toMail($notifiable)
    {
        $mail = new MailMessage();
        $mail->subject('Création de compte tuteur')
             ->greeting('Bonjour ' . $this->tuteur->nom)
             ->line('Votre compte en tant que tuteur a été créé avec succès.')
             ->action('Se connecter', url('/login'))
             ->line('Merci d\'utiliser notre application.');

        return $mail;
    }

}
