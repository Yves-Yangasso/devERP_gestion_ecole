<?php
namespace App\Http\Controllers\Etudiant;

use App\Http\Controllers\Controller;
use App\Http\Requests\Etudiant\CreerEtudiantRequest;
use App\Models\Etudiant;
use App\Services\Etudiant\EtudiantService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Exception;

class EtudiantController extends Controller {
    protected $studentService;

    public function __construct(EtudiantService $studentService) {
        $this->studentService = $studentService;
    }

    public function store(CreerEtudiantRequest $request): JsonResponse {
        try {
            $student = $this->studentService->registerStudent($request->validated());
            $studentCard = $this->generateStudentCard($student);
            return response()->json(['message' => 'Étudiant créé avec succès', 'student_card' => $studentCard], 201);
        } catch (Exception $e) {
            return response()->json(['error' => $e->getMessage()], 400);
        }
    }

    public function generateStudentCard(Etudiant $student) {
        return [
            'matricule' => $student->matricule,
            'nom' => $student->nom,
            'prenom' => $student->prenom,
            'email_institutionnel' => $student->email_institutionnel,
            'departement' => $student->inscription->fiiliere_id->departement,
            'filiere' => $student->filiere,
            'nationalite' => $student->nationalite,
            'annee_inscription' => $student->annee_inscription,
        ];
    }
}
