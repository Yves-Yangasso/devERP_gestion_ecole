<?php
// app/Events/Etudiant/EtudiantModifie.php

namespace App\Events\Etudiant;

use App\Models\Etudiant;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class EtudiantModifie
{
    use Dispatchable, SerializesModels;

    public $etudiant;
    public $modifications;

    public function __construct(Etudiant $etudiant, array $modifications)
    {
        $this->etudiant = $etudiant;
        $this->modifications = $modifications;
    }
}
