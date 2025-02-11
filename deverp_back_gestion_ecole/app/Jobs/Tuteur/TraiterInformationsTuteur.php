<?php

namespace App\Jobs\Tuteur;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use App\Models\Tuteur;
use App\Services\Tuteur\TuteurService;

class TraiterInformationsTuteur implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    private $tuteurId;
    private $donnees;

    public function __construct($tuteurId, array $donnees)
    {
        $this->tuteurId = $tuteurId;
        $this->donnees = $donnees;
    }

    public function handle(TuteurService $tuteurService)
    {
        // Validation ou traitement supplémentaire avant mise à jour
        $tuteurService->modifier($this->tuteurId, $this->donnees);
    }
}