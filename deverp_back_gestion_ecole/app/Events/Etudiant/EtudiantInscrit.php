<?php
// app/Events/Etudiant/EtudiantInscrit.php

namespace App\Events\Etudiant;

use App\Models\Etudiant;
use App\Models\Inscription;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class EtudiantInscrit
{
    use Dispatchable, SerializesModels;

    public $etudiant;
    public $inscription;

    public function __construct(Etudiant $etudiant, Inscription $inscription)
    {
        $this->etudiant = $etudiant;
        $this->inscription = $inscription;
    }
}