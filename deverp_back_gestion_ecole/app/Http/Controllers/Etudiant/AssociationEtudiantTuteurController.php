<?php

namespace App\Http\Controllers\Etudiant;

use App\Http\Controllers\Controller;
use App\Http\Requests\Etudiant\AssociationEtudiantTuteurRequest;
use App\Services\Etudiant\AssociationEtudiantTuteurService;
use Illuminate\Http\JsonResponse;

class AssociationEtudiantTuteurController extends Controller
{
    protected $associationService;

    public function __construct(AssociationEtudiantTuteurService $associationService)
    {
        $this->associationService = $associationService;
    }

    public function store(AssociationEtudiantTuteurRequest $request): JsonResponse
    {
        $association = $this->associationService->createAssociation($request->validated());

        return response()->json([
            'message' => 'Association créée avec succès',
            'data' => $association
        ], 201);
    }

    public function getInscriptionsByTuteur($tuteurId)
    {
        return response()->json($this->associationService->getInscriptionsByTuteur($tuteurId));
    }

    public function getTuteursByInscription($inscriptionId)
    {
        return response()->json($this->associationService->getTuteursByInscription($inscriptionId));
    }
}
