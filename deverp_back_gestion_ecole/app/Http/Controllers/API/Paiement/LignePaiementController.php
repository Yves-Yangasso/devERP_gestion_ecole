<?php

namespace App\Http\Controllers\API\Paiement;

use App\Http\Controllers\Controller;
use App\Http\Requests\Paiement\CreerLignePaiementRequest;
use App\Services\Paiement\LignePaiementService;
use Illuminate\Http\JsonResponse;

class LignePaiementController extends Controller
{
    protected LignePaiementService $lignePaiementService;

    public function __construct(LignePaiementService $lignePaiementService)
    {
        $this->lignePaiementService = $lignePaiementService;
    }

    public function index(): JsonResponse
    {
        return response()->json($this->lignePaiementService->tous());
    }

    public function store(CreerLignePaiementRequest $request): JsonResponse
    {
        $lignePaiement = $this->lignePaiementService->creer($request->validated());
        return response()->json($lignePaiement, 201);
    }

    public function show(int $id): JsonResponse
    {
        $lignePaiement = $this->lignePaiementService->trouverParId($id);
        if (!$lignePaiement) {
            return response()->json(['message' => 'Ligne de paiement non trouvée'], 404);
        }
        return response()->json($lignePaiement);
    }

    public function update(CreerLignePaiementRequest $request, int $id): JsonResponse
    {
        $lignePaiement = $this->lignePaiementService->modifier($id, $request->validated());
        return response()->json($lignePaiement);
    }

    public function destroy(int $id): JsonResponse
    {
        $this->lignePaiementService->supprimer($id);
        return response()->json(['message' => 'Ligne de paiement supprimée'], 204);
    }
}
