<?php

namespace App\Http\Controllers;

use App\Http\Requests\Filieres\StoreFiliereRequest;
use App\Http\Requests\Filieres\UpdateFiliereRequest;
use Illuminate\Http\Request;
use App\Services\Filieres\FiliereService;
use Illuminate\Http\JsonResponse;

class FiliereController extends Controller
{
    protected $filiereService;

    public function __construct(FiliereService $filiereService)
    {
        $this->filiereService = $filiereService;
    }

    public function index(): JsonResponse
    {
        return response()->json($this->filiereService->getAll());
    }

    public function show($id): JsonResponse
    {
        return response()->json($this->filiereService->findById($id));
    }

    public function store(StoreFiliereRequest $request): JsonResponse
    {
        return response()->json($this->filiereService->create($request->validated()), 201);
    }

    public function update(UpdateFiliereRequest $request, $id): JsonResponse
    {
        return response()->json($this->filiereService->update($id, $request->validated()));
    }

    public function destroy($id): JsonResponse
    {
        $this->filiereService->delete($id);
        return response()->json(['message' => 'Filière supprimée avec succès']);
    }

    public function getFormationsByFiliere(int $id): JsonResponse
    {
        $formations = $this->filiereService->getFormationsByFiliereId($id);

        if ($formations->isEmpty()) {
            return response()->json(['message' => 'Aucune formation trouvée pour cette filière.'], 404);
        }

        return response()->json($formations, 200);
    }
}
