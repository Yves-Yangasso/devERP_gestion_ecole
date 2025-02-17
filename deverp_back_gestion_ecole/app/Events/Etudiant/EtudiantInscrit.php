<?php

namespace App\Events\Etudiant;

use App\Models\Inscription;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class EtudiantInscrit
{
    use Dispatchable, SerializesModels;

    /**
     * @var Inscription
     */
    public $inscription;

    public function __construct(Inscription $inscription)
    {
        $this->inscription = $inscription;
    }
}