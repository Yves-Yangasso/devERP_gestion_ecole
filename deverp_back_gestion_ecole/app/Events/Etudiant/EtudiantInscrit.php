<?php

namespace App\Events\Etudiant;

use App\Models\Inscription;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class EtudiantInscrit
{
    use Dispatchable, SerializesModels;

     public $student;

    public function __construct(Inscription $student)
    {
        $this->student = $student;
    }
}
