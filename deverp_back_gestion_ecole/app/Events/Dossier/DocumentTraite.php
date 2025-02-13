<?php

namespace App\Events\Document;

use App\Models\Document;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class DocumentTraite
{
    use Dispatchable, SerializesModels;

    public $document;

    public function __construct(Document $document)
    {
        $this->document = $document;
    }
}
