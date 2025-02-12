<?php

namespace App\Http\Controllers\Etudiant;

use App\Http\Controllers\Controller;
use App\Http\Requests\Etudiant\InscrireEtudiantRequest;
use App\Services\Etudiant\InscriptionService;
use Illuminate\Http\JsonResponse;

class InscriptionEtudiantController extends Controller
{
    protected $inscriptionService;

    public function __construct(InscriptionService $inscriptionService)
    {
        $this->inscriptionService = $inscriptionService;
    }

    public function store(InscrireEtudiantRequest $request): JsonResponse
    {
        try {
        $inscription = $this->inscriptionService->createInscription($request->validated());
        return response()->json(['message' => 'Inscription enregistrée avec succès', 'inscription' => $inscription], 201);
        } catch (\Throwable $th) {
            return response()->json(['message' => 'Erreur lors de l\'enregistrement de l\'inscription',''=> $th],500);
        }
    }

    public function index(): JsonResponse
    {
        $inscriptions = $this->inscriptionService->getAllinscrits();
        return response()->json($inscriptions);
    }

    public function show($id): JsonResponse
    {
        $inscription = $this->inscriptionService->getInscritById($id);
        return response()->json($inscription);
    }
}
