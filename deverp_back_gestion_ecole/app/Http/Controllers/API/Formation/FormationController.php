<?php
namespace App\Http\Controllers\API\Formation;

use App\Http\Controllers\Controller;
use App\Services\Formation\FormationService;
use App\Http\Requests\Formation\StoreFormationRequest;
use Illuminate\Http\JsonResponse;

class FormationController extends Controller
{
    protected $formationService;

    public function __construct(FormationService $formationService)
    {
        $this->formationService = $formationService;
    }

    public function index(): JsonResponse
    {
        return response()->json($this->formationService->getAll());
    }

    public function show($id): JsonResponse
    {
        return response()->json($this->formationService->findById($id));
    }

    public function store(StoreFormationRequest $request): JsonResponse
    {
        return response()->json($this->formationService->create($request->validated()), 201);
    }

    public function update(StoreFormationRequest $request, $id): JsonResponse
    {
        return response()->json($this->formationService->update($id, $request->validated()));
    }

    public function destroy($id): JsonResponse
    {
        $this->formationService->delete($id);
        return response()->json(['message' => 'Formation supprimée avec succès']);
    }

    public function getStructureTarifaire($formation_id): JsonResponse
    {
        $result = $this->formationService->getStructureTarifaire($formation_id);

        if (isset($result['error'])) {
            return response()->json(['message' => $result['error']], $result['code']);
        }

        return response()->json($result);
    }
}
