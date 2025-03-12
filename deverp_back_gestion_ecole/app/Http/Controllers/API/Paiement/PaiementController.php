<?php
namespace App\Http\Controllers\API\Paiement;

use App\Http\Controllers\Controller;
use App\Http\Requests\Paiement\CreerPaiementRequest;
use App\Services\Etudiant\EtudiantService;
use App\Services\Etudiant\InscriptionService;
use App\Services\Paiement\PaiementService;
use App\Notifications\Paiement\PaymentValidatedNotification;
use Barryvdh\DomPDF\Facade\Pdf;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Http\JsonResponse;


class PaiementController extends Controller
{
    protected PaiementService $paiementService;
    protected EtudiantService $etudiantService;
    protected InscriptionService $inscriptionService;
    protected array $tableau_inscription;

    public function __construct(PaiementService $paiementService, EtudiantService $etudiantService, InscriptionService $inscriptionService)
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

    public function valider(Request $request): JsonResponse
    {
        // Validate the incoming request
        $request->validate([
            'paiement_id' => 'required|integer',
            'inscription_id' => 'required|integer',
        ]);

        // Retrieve payment and inscription IDs from the request
        $paiementId = $request->input('paiement_id');
        $inscriptionId = $request->input('inscription_id');

        try {
            // Validate the payment
            $this->paiementService->validerPaiement($paiementId, $inscriptionId);

            // Get the complete inscription details
            $inscription = $this->inscriptionService->getInscriptionComplete($inscriptionId);
            if (!$inscription) {
                return response()->json(['error' => 'Inscription introuvable.'], 404);
            }

            // Register the student based on the inscription
            $student = $this->etudiantService->registerStudent($inscription->toArray());

            // Find the payment and notify the student
            $paiement = $this->paiementService->trouverPaiement($paiementId);
            $personalEmail = $paiement->inscription->email;
            $student->notify(new PaymentValidatedNotification($paiement, $personalEmail));

            // Generate the student card PDF
            $pdf = Pdf::loadView('pdf.carte-etudiant', [
                'matricule' => $student->matricule,
                'email_institutionnel' => $student->email_institutionnel,
                'nom' => $student->nom,
                'prenom' => $student->prenom,
                'filiere' => $student->inscription->filiere->nom ?? 'Non spécifiée',
                'telephone' => $student->inscription->telephone,
            ]);

            $pdfPath = storage_path('app/public/carte_etudiant_' . $student->matricule . '.pdf');
            $pdf->save($pdfPath);

            return response()->json([
                'message' => 'Paiement validé avec succès',
                'download_url' => url('/storage/carte_etudiant_' . $student->matricule . '.pdf')
            ]);

        } catch (Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function telecharger($pdf, $matricule): Response
    {
        return $pdf->download('carte_etudiant_' . $matricule . '.pdf');
    }
}
