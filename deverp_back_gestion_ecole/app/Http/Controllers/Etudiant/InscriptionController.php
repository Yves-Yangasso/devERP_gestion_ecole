<?php
// app/Http/Controllers/API/Etudiant/InscriptionController.php

namespace App\Http\Controllers\Etudiant;

use App\Http\Controllers\Controller;
use App\Http\Requests\Etudiant\InscrireEtudiantRequest;
use App\Http\Requests\InscrireEtudiantRequest as RequestsInscrireEtudiantRequest;
use App\Services\Etudiant\InscriptionService;
use App\Http\Resources\Etudiant\EtudiantResource;
use Exception;

class InscriptionController extends Controller
{
    private $inscriptionService;

    public function __construct(InscriptionService $inscriptionService)
    {
        $this->inscriptionService = $inscriptionService;
    }

    public function inscrire(RequestsInscrireEtudiantRequest $request)
    {
        try {
            $etudiant = $this->inscriptionService->inscrire($request->validated());
            return new EtudiantResource($etudiant);
        } catch (Exception $e) {
            return response()->json([
                'message' => 'Erreur lors de l\'inscription',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
