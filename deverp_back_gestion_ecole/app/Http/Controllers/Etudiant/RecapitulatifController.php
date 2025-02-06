<?php
// app/Http/Controllers/API/Etudiant/RecapitulatifController.php

namespace App\Http\Controllers\Etudiant;

use App\Http\Controllers\Controller;
use App\Services\Etudiant\RecapitulatifEtudiantService;
use App\Http\Resources\Etudiant\RecapitulatifResource;

class RecapitulatifController extends Controller
{
    protected $recapitulatifService;

    public function __construct(RecapitulatifEtudiantService $recapitulatifService)
    {
        $this->recapitulatifService = $recapitulatifService;
    }

    public function show($etudiantId)
    {
        $recap = $this->recapitulatifService->getRecapitulatifComplet($etudiantId);
        return new RecapitulatifResource($recap);
    }
}