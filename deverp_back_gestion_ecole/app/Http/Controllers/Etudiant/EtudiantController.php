<?php
namespace App\Http\Controllers\Etudiant;

use App\Http\Controllers\Controller;
use App\Http\Requests\Etudiant\CreerEtudiantRequest;
use App\Models\Etudiant;
use App\Services\Etudiant\EtudiantService;
use Illuminate\Http\JsonResponse;
use Exception;

class EtudiantController extends Controller
{
    protected $studentService;

    public function __construct(EtudiantService $studentService)
    {
        $this->studentService = $studentService;
    }

    public function store(CreerEtudiantRequest $request): JsonResponse
    {
        try {
            $student = $this->studentService->registerStudent($request->validated());
            return response()->json([
                'message' => 'Étudiant créé avec succès',
                'student' => $this->generateStudentCard($student)
            ], 201);
        } catch (Exception $e) {
            return response()->json(['error' => $e->getMessage()], 400);
        }
    }

    private function generateStudentCard(Etudiant $student)
    {
        return [
            'matricule' => $student->matricule,
            'nom' => $student->nom,
            'prenom' => $student->prenom,
            'email_institutionnel' => $student->email_institutionnel,
        ];
    }
}

