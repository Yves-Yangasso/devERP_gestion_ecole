<?php

namespace App\Events\Dossier;

use App\Models\Document;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class DossierModifier
{
    use Dispatchable, SerializesModels;

    public function __construct(
        public readonly string $codeDossier,
        public readonly string $ancienStatut,
        public readonly string $nouveauStatut
    ) {}
}
