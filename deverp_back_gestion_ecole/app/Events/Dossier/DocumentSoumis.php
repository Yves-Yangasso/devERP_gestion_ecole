<?php

namespace App\Events\Dossier;

use App\Models\Document;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class DocumentSoumis
{
    use Dispatchable, SerializesModels;

    public Document $document;
    public string $type;

    public function __construct(Document $document, string $type)
    {
        $this->document = $document;
        $this->type = $type;
    }
}
