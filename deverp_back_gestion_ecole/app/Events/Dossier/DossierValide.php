<?php

namespace App\Events\Dossier;

use App\Models\Dossier;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Broadcasting\InteractsWithSockets;

class DossierValide
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $dossier;

    public function __construct(Dossier $dossier)
    {
        $this->dossier = $dossier;
    }
}