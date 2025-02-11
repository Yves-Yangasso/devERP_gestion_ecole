<?php

namespace App\Events\Tuteur;

use App\Models\Tuteur;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

namespace App\Events\Tuteur;

use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class EtudiantAssocieTuteur
{
    use Dispatchable, SerializesModels;

    public function __construct(public int $etudiantId, public int $tuteurId) {}
}