<?php
// app/Events/Etudiant/EtudiantCree.php

namespace App\Events\Etudiant;

use App\Models\Etudiant;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class EtudiantCree
{
    use Dispatchable, SerializesModels;

    public $etudiant;

    public function __construct(Etudiant $etudiant)
    {
        $this->etudiant = $etudiant;
    }
}