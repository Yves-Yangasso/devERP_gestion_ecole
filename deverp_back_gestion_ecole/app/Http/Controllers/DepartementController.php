<?php
namespace App\Http\Controllers;

use App\Http\Requests\Departement\StoreDepartementRequest;
use App\Http\Requests\Departement\UpdateDepartementRequest;
use Illuminate\Http\Request;
use App\Services\Departement\DepartementService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Resources\Json\JsonResource;

class DepartementController extends Controller
{
    protected $departementService;

    public function __construct(DepartementService $departementService)
    {
        $this->departementService = $departementService;
    }

    public function index(): JsonResponse
    {
        return response()->json($this->departementService->getAll());
    }

    public function show($id): JsonResponse
    {
        return response()->json($this->departementService->findById($id));
    }

    public function store(StoreDepartementRequest $request): JsonResponse
    {
        return response()->json($this->departementService->create($request->validated()), 201);
    }

    public function update(UpdateDepartementRequest $request, $id): JsonResponse
    {
        //dd( $id);
        return response()->json($this->departementService->update($id, $request->validated()));
    }

    public function destroy($id): JsonResponse
    {
        $this->departementService->delete($id);
        return response()->json(['message' => 'Département supprimé avec succès']);
    }
}
