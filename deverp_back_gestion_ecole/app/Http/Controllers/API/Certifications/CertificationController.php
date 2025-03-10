<?php
namespace App\Http\Controllers\API\Certifications;

use App\Http\Controllers\Controller;
use App\Services\Certification\CertificationService;
use App\Http\Requests\Certifications\StoreCertificationRequest;
use Illuminate\Http\JsonResponse;

class CertificationController extends Controller
{
    protected $certificationService;

    public function __construct(CertificationService $certificationService)
    {
        $this->certificationService = $certificationService;
    }

    public function index(): JsonResponse
    {
        return response()->json($this->certificationService->getAllCertifications());
    }

    public function show($id): JsonResponse
    {
        return response()->json($this->certificationService->getCertificationById($id));
    }

    public function store(StoreCertificationRequest $request): JsonResponse{
        return response()->json($this->certificationService->createCertification($request->validated()), 201);
    }
}
