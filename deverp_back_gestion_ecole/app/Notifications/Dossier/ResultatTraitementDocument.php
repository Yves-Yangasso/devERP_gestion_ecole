<?php

namespace App\Notifications\Document;

use App\Models\Document;
use Illuminate\Notifications\Notification;
use Illuminate\Notifications\Messages\MailMessage;
use App\Enums\Dossier\StatutDocument;


class ResultatTraitementDocument extends Notification
{
    protected $document;

    public function __construct(Document $document)
    {
        $this->document = $document;
    }

    public function toMail($notifiable)
    {
        $message = new MailMessage;
        $message->subject('Mise à jour du statut de votre document');

        if ($this->document->statut === StatutDocument::VALIDE) {
            return $message
                ->line('Votre document a été validé avec succès.')
                ->line('Type de document : ' . $this->document->type_document);
        }

        return $message
            ->line('Votre document nécessite une révision.')
            ->line('Type de document : ' . $this->document->type_document)
            ->line('Commentaire : ' . $this->document->commentaire)
            ->action('Soumettre un nouveau document', url('/documents/soumettre'));
    }
}