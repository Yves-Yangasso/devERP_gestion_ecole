<?php

namespace App\Listeners;

use App\Events\Document\DocumentCree;
use Illuminate\Support\Facades\Log;

class NotifierDocumentAjouter
{
    public function handle(DocumentCree $event)
    {
        Log::info("Un nouveau document a été ajouté : " . $event->document->nom);
    }
}
