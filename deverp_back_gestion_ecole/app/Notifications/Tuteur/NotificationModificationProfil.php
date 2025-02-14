<?php

namespace App\Notifications\Tuteur;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use App\Models\Tuteur;

class NotificationModificationProfil extends Notification implements ShouldQueue
{
    use Queueable;

    public function __construct(public Tuteur $tuteur) {}

    public function via($notifiable)
    {
        return ['mail'];
    }

    public function toMail($notifiable)
    {
        return (new MailMessage)
            ->subject('Modification de profil tuteur')
            ->greeting('Bonjour ' . $this->tuteur->nom)
            ->line('Votre profil a été mis à jour avec succès.')
            ->action('Voir votre profil', url('/profile'))
            ->line('Merci de garder vos informations à jour.');
    }
}
