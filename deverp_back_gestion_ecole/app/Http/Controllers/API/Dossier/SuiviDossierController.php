<?php

namespace App\Http\Controllers\API\Dossier;

use App\Http\Controllers\Controller;
use App\Services\Dossier\SuiviDossierService;
use App\Http\Resources\Dossier\SuiviDossierResource;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class SuiviDossierController extends Controller
{
    protected $suiviService;

    public function __construct(SuiviDossierService $suiviService)
    {
        $this->suiviService = $suiviService;
    }

    public function suivreDossier(Request $request): JsonResponse
    {
        try {
        $request->validate([
            'code_suivi' => 'required|string|size:6',
            'email' => 'required|email'
        ]);

        $dossier = $this->suiviService->getDossierParCodeSuivi(
            $request->code_suivi,
            $request->email
        );

        return response()->json([
            'success' => true,
            'dossier' => new SuiviDossierResource($dossier)
        ]);
    } catch (ModelNotFoundException $e) {
        return response()->json([
            'success' => false,
            'message' => $e->getMessage()
        ], 404);
    }

    }

    public function getHistorique(Request $request): JsonResponse
    {
        $request->validate([
            'code_suivi' => 'required|string|size:6',
            'email' => 'required|email'
        ]);

        $historique = $this->suiviService->getHistoriqueDossier(
            $request->code_suivi,
            $request->email
        );

        return response()->json([
            'historique' => $historique
        ]);
    }
}