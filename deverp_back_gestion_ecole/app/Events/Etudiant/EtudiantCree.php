<?php
namespace App\Events\Etudiant;

use App\Models\Etudiant;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class EtudiantCree
{
    use Dispatchable, SerializesModels;

    public $student;

    public function __construct(Etudiant $student)
    {
        $this->student = $student;
    }
}
