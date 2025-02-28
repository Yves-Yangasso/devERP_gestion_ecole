<?php
namespace App\Http\Controllers\API\Cours;

use App\Http\Controllers\Controller;
use App\Services\Cours\CoursService;
use App\Http\Requests\Cours\StoreCoursRequest;
use Illuminate\Http\JsonResponse;

class CoursController extends Controller
{
    protected $coursService;

    public function __construct(CoursService $coursService)
    {
        $this->coursService = $coursService;
    }

    public function index(): JsonResponse
    {
        return response()->json($this->coursService->getAll());
    }

    public function show($id): JsonResponse
    {
        return response()->json($this->coursService->getById($id));
    }

    public function store(StoreCoursRequest $request): JsonResponse
    {
        return response()->json($this->coursService->create($request->validated()), 201);
    }

    public function update(StoreCoursRequest $request, $id): JsonResponse
    {
        return response()->json($this->coursService->update($id, $request->validated()));
    }

    public function destroy($id): JsonResponse
    {
        $this->coursService->delete($id);
        return response()->json(['message' => 'Cours supprimé avec succès']);
    }
}
