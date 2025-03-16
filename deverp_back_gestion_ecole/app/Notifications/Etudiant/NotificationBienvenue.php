<?php
// app/Notifications/Etudiant/NotificationBienvenue.php

namespace App\Notifications\Etudiant;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class NotificationBienvenue extends Notification implements ShouldQueue
{
    use Queueable;

    public function via($notifiable)
    {
        return ['mail', 'database'];
    }

    public function toMail($notifiable)
    {
        return (new MailMessage)
            ->subject('Bienvenue à l\'ISI')
            ->greeting('Bonjour ' . $notifiable->prenom)
            ->line('Nous sommes ravis de vous accueillir à l\'Institut Supérieur d\'Informatique.')
            ->line('Votre numéro étudiant est : ' . $notifiable->matricule)
            ->action('Accéder à votre espace', url('/espace-etudiant'))
            ->line('Notre équipe est à votre disposition pour toute assistance.');
    }

    public function toArray($notifiable)
    {
        return [
            'type' => 'bienvenue',
            'message' => 'Bienvenue à l\'ISI'
        ];
    }
}