<?php

namespace App\Listeners\Document;

use App\Events\Document\DocumentTraite;
use App\Notifications\Document\ResultatTraitementDocument;
use Illuminate\Contracts\Queue\ShouldQueue;

class NotifierEtudiantTraitementDocument implements ShouldQueue
{
    public function handle(DocumentTraite $event)
    {
        $etudiant = $event->document->dossier->inscription->etudiant;
        $etudiant->notify(new ResultatTraitementDocument($event->document));
    }
}
