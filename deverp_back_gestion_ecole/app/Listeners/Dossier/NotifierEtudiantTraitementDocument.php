<?php

namespace App\Listeners\Dossier;

use App\Events\Dossier\DocumentTraite;
use App\Notifications\Document\ResultatTraitementDocument;
use Illuminate\Contracts\Queue\ShouldQueue;

class NotifierEtudiantTraitementDocument implements ShouldQueue
{
    public function handle(DocumentTraite $event)
    {
        $etudiant = $event->document->dossier->inscription;
        $etudiant->notify(new ResultatTraitementDocument($event->document));
    }
}
