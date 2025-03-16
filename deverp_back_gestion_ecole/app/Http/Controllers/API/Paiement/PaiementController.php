<?php
namespace App\Http\Controllers;

use App\Http\Requests\Paiement\creerPaiementRequest;
use App\Http\Requests\Paiement\ModifierPaiementRequest;
use App\Services\Paiement\PaiementService;
use Illuminate\Http\JsonResponse;

class PaiementController extends Controller
{
    protected PaiementService $paiementService;

    public function __construct(PaiementService $paiementService)
    {
        $this->paiementService = $paiementService;
    }

    public function store(creerPaiementRequest $request): JsonResponse
    {
        $paiement = $this->paiementService->creerPaiement($request->validated());
        return response()->json($paiement, 201);
    }

    public function show(int $id): JsonResponse
    {
        return response()->json($this->paiementService->trouverPaiement($id));
    }

    public function update(creerPaiementRequest $request, int $id): JsonResponse
    {
        $paiement = $this->paiementService->modifierPaiement($id, $request->validated());
        return response()->json($paiement);
    }

    public function destroy(int $id): JsonResponse
    {
        $this->paiementService->supprimerPaiement($id);
        return response()->json(['message' => 'Paiement supprimé'], 204);
    }
}
