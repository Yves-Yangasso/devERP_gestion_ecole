<?php

namespace App\Events\Dossier;

use App\Models\Document;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class DocumentSoumis
{
    use Dispatchable, SerializesModels;

    public function __construct(
        public readonly Document $document
    ) {}
}

class DossierCree
{
    use Dispatchable, SerializesModels;

    public function __construct(
        public readonly string $codeDossier,
        public readonly array $documentsRequis
    ) {}
}

class DossierModifie
{
    use Dispatchable, SerializesModels;

    public function __construct(
        public readonly string $codeDossier,
        public readonly string $ancienStatut,
        public readonly string $nouveauStatut
    ) {}
}