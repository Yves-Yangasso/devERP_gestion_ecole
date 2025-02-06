<?php
// 3. App/Notifications/Etudiant/ValidationDocument.php

namespace App\Notifications\Etudiant;

use App\Models\Document;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class ValidationDocument extends Notification implements ShouldQueue
{
    use Queueable;

    protected $document;
    protected $statut;
    protected $commentaire;

    public function __construct(Document $document, string $statut, ?string $commentaire = null)
    {
        $this->document = $document;
        $this->statut = $statut;
        $this->commentaire = $commentaire;
    }

    public function via($notifiable): array
    {
        return ['mail', 'database'];
    }

    public function toMail($notifiable): MailMessage
    {
        $message = (new MailMessage)
            ->subject('Mise à jour du statut de votre document - ISI')
            ->greeting('Bonjour ' . $notifiable->prenom . ',');

        if ($this->statut === 'valide') {
            $message->line('Votre document "' . $this->document->type . '" a été validé avec succès.')
                   ->line('Vous pouvez maintenant poursuivre votre processus d\'inscription.');
        } else {
            $message->line('Votre document "' . $this->document->type . '" nécessite des modifications.')
                   ->line('Motif : ' . $this->commentaire)
                   ->action('Soumettre un nouveau document', url('/documents/soumettre'));
        }

        return $message->line('Pour toute question, contactez l\'administration.');
    }

    public function toDatabase($notifiable): array
    {
        return [
            'titre' => 'Statut document mis à jour',
            'message' => $this->statut === 'valide' 
                ? 'Votre document a été validé' 
                : 'Votre document nécessite des modifications',
            'type' => 'document',
            'statut' => $this->statut,
            'document_id' => $this->document->id,
            'commentaire' => $this->commentaire
        ];
    }
}