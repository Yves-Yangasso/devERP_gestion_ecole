<?php
namespace App\Http\Controllers\API\NiveauEtudes;

use App\Http\Controllers\Controller;
use App\Services\NiveauEtudes\NiveauEtudesService;
use App\Http\Requests\NiveauEtudes\StoreNiveauEtudesRequest;
use Illuminate\Http\JsonResponse;

class NiveauEtudesController extends Controller
{
    protected $niveauEtudesService;

    public function __construct(NiveauEtudesService $niveauEtudesService)
    {
        $this->niveauEtudesService = $niveauEtudesService;
    }

    public function index(): JsonResponse
    {
        return response()->json($this->niveauEtudesService->getAll());
    }

    public function show($id): JsonResponse
    {
        return response()->json($this->niveauEtudesService->findById($id));
    }

    public function store(StoreNiveauEtudesRequest $request): JsonResponse
    {
        return response()->json($this->niveauEtudesService->create($request->validated()), 201);
    }

    public function update(StoreNiveauEtudesRequest $request, $id): JsonResponse
    {
        return response()->json($this->niveauEtudesService->update($id, $request->validated()));
    }

    public function destroy($id): JsonResponse
    {
        $this->niveauEtudesService->delete($id);
        return response()->json(['message' => 'Niveau d\'études supprimé avec succès']);
    }
}
