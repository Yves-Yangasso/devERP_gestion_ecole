<?php
// 2. App/Notifications/Etudiant/NotificationNouvelleInscription.php

namespace App\Notifications\Etudiant;

use App\Models\Etudiant;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use Illuminate\Support\HtmlString;

class NotificationNouvelleInscription extends Notification implements ShouldQueue
{
    use Queueable;

    protected $etudiant;
    protected $detailsInscription;

    public function __construct(Etudiant $etudiant, array $detailsInscription)
    {
        $this->etudiant = $etudiant;
        $this->detailsInscription = $detailsInscription;
    }

    public function via($notifiable): array
    {
        return ['mail', 'database'];
    }

    public function toMail($notifiable): MailMessage
    {
        return (new MailMessage)
            ->subject('Confirmation de votre inscription à l\'ISI')
            ->greeting('Bonjour ' . $this->etudiant->prenom . ',')
            ->line('Nous avons le plaisir de vous confirmer votre inscription à l\'Institut Supérieur d\'Informatique (ISI).')
            ->line(new HtmlString('Voici les détails de votre inscription :<br>
                - Matricule: <strong>' . $this->etudiant->matricule . '</strong><br>
                - Formation: <strong>' . $this->detailsInscription['formation'] . '</strong><br>
                - Année académique: <strong>' . $this->detailsInscription['annee_academique'] . '</strong>'))
            ->line('Votre carte d\'étudiant est en cours de génération et vous sera transmise prochainement.')
            ->action('Accéder à votre espace étudiant', url('/espace-etudiant'))
            ->line('Pour toute question, n\'hésitez pas à contacter l\'administration.')
            ->line('Bienvenue à l\'ISI !');
    }

    public function toDatabase($notifiable): array
    {
        return [
            'titre' => 'Nouvelle inscription confirmée',
            'message' => 'Votre inscription a été validée avec succès.',
            'etudiant_id' => $this->etudiant->id,
            'type' => 'inscription',
            'details' => $this->detailsInscription
        ];
    }
}