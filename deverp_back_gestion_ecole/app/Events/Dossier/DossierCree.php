<?php

namespace App\Events\Dossier;

use App\Models\Document;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class DossierCree
{
    use Dispatchable, SerializesModels;

    /**
     * Crée une nouvelle instance de l'événement.
     *
     * @param string $codeDossier Le code du dossier créé
     * @param array $documentsRequis La liste des documents requis
     */
    public function __construct(
        public readonly string $codeDossier,
        public readonly array $documentsRequis,
        public readonly DossierCree $dossier
    ) {}
}