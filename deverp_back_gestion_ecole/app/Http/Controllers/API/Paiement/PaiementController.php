<?php
namespace App\Http\Controllers\API\Paiement;

use App\Http\Controllers\Controller;
use App\Http\Requests\Paiement\CreerPaiementRequest;
use App\Services\Etudiant\EtudiantService;
use App\Services\Etudiant\InscriptionService;
use App\Services\Paiement\PaiementService;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class PaiementController extends Controller
{
    protected PaiementService $paiementService;
    protected EtudiantService $etudiantService;
    protected InscriptionService $inscriptionService;
    protected array $tableau_inscription;

    public function __construct(PaiementService $paiementService,EtudiantService $etudiantService , InscriptionService $inscriptionService)
    {
        $this->paiementService = $paiementService;
        $this->etudiantService = $etudiantService;
        $this->inscriptionService = $inscriptionService;
    }

    public function store(CreerPaiementRequest $request): JsonResponse
    {
        $paiement = $this->paiementService->creerPaiement($request->validated());
        return response()->json($paiement, 201);
    }

    public function show(int $id): JsonResponse
    {
        return response()->json($this->paiementService->trouverPaiement($id));
    }

    public function update(CreerPaiementRequest $request, int $id): JsonResponse
    {
        $paiement = $this->paiementService->modifierPaiement($id, $request->validated());
        return response()->json($paiement);
    }

    public function destroy(int $id): JsonResponse
    {
        $this->paiementService->supprimerPaiement($id);
        return response()->json(['message' => 'Paiement supprimé'], 204);
    }

    public function valider(Request $request)
    {
        // Valider les données d'entrée
        $request->validate([
            'paiement_id' => 'required|integer',
            'inscription_id' => 'required|integer',
        ]);

        $paiementId = $request->input('paiement_id');
        $inscriptionId = $request->input('inscription_id');

        try {
            // Appeler la méthode pour valider le paiement
            $this->paiementService->validerPaiement($paiementId, $inscriptionId);
            $tableau_inscription = $this->inscriptionService->getInscriptionComplete($inscriptionId);
            //dd($tableau_inscription);
            //$this->etudiantService->registerStudent($tableau_inscription->toArray());

            return response()->json(['message' => 'Paiement validé avec succès.'], 200);
        } catch (\Exception $e) {
            // Gestion des erreurs
            return response()->json(['error' => 'Échec de la validation du paiement.'], 500);
        }
    }
}
