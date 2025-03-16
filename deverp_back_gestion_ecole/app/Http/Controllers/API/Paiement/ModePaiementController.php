<?php

namespace App\Http\Controllers\API\Paiement;

use App\Http\Controllers\Controller;
use App\Http\Requests\Paiement\creerModePaiementRequest;
use App\Services\Paiement\ModePaiementService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ModePaiementController extends Controller
{
    protected ModePaiementService $modePaiementService;

    public function __construct(ModePaiementService $modePaiementService)
    {
        $this->modePaiementService = $modePaiementService;
    }

    public function index(): JsonResponse
    {
        return response()->json($this->modePaiementService->tous());
    }

    public function store(creerModePaiementRequest $request): JsonResponse
    {
        $modePaiement = $this->modePaiementService->creer($request->validated());
        return response()->json($modePaiement, 201);
    }

    public function show(int $id): JsonResponse
    {
        $modePaiement = $this->modePaiementService->trouverParId($id);
        if (!$modePaiement) {
            return response()->json(['message' => 'Mode de paiement non trouvé'], 404);
        }
        return response()->json($modePaiement);
    }

    public function update(creerModePaiementRequest $request, int $id): JsonResponse
    {
        $modePaiement = $this->modePaiementService->modifier($id, $request->validated());
        return response()->json($modePaiement);
    }

    public function destroy(int $id): JsonResponse
    {
        $this->modePaiementService->supprimer($id);
        return response()->json(['message' => 'Mode de paiement supprimé'], 204);
    }
}
