<?php
namespace App\Events\Etudiant;
use App\Models\Inscription;
use Illuminate\Queue\SerializesModels;
use Illuminate\Foundation\Events\Dispatchable;

class InscriptionSupprimer{
    use Dispatchable, SerializesModels;
    public $inscription;

    public function __construct(Inscription $inscription){
        $this->inscription = $inscription;
    }
}
