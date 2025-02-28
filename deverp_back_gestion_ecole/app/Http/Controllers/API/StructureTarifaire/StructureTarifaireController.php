<?php
namespace App\Http\Controllers\API\StructureTarifaire;

use App\Http\Controllers\Controller;
use App\Services\StructureTarifaire\StructureTarifaireService;
use App\Http\Requests\StructureTarifaire\StoreStructureTarifaireRequest;
use Illuminate\Http\JsonResponse;

class StructureTarifaireController extends Controller
{
    protected $structureTarifaireService;

    public function __construct(StructureTarifaireService $structureTarifaireService)
    {
        $this->structureTarifaireService = $structureTarifaireService;
    }

    public function index(): JsonResponse
    {
        $structures = $this->structureTarifaireService->getAll();
        return response()->json($structures);
    }

    public function show($id): JsonResponse
    {
        $structure = $this->structureTarifaireService->getById($id);
        return response()->json($structure);
    }

    public function store(StoreStructureTarifaireRequest $request): JsonResponse
    {
        $structure = $this->structureTarifaireService->create($request->validated());
        return response()->json(['message' => 'Structure tarifaire créée avec succès', 'data' => $structure], 201);
    }

    public function update(StoreStructureTarifaireRequest $request, $id): JsonResponse
    {
        $structure = $this->structureTarifaireService->update($id, $request->validated());
        return response()->json(['message' => 'Structure tarifaire mise à jour avec succès', 'data' => $structure]);
    }

    public function destroy($id): JsonResponse
    {
        $this->structureTarifaireService->delete($id);
        return response()->json(['message' => 'Structure tarifaire supprimée avec succès']);
    }
}
