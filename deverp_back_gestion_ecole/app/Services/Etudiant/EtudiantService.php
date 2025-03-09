<?php
namespace App\Services\Etudiant;

use App\Contracts\Repositories\Etudiant\EtudiantRepositoryInterface;
use App\Contracts\Repositories\Etudiant\StudentServiceInterface as EtudiantStudentServiceInterface;
use App\Models\Inscription;
use Illuminate\Support\Facades\Log;

class EtudiantService implements EtudiantStudentServiceInterface {
    protected $studentRepository;

    public function __construct(EtudiantRepositoryInterface $studentRepository) {
        $this->studentRepository = $studentRepository;
    }

    public function registerStudent(array $data) {
        $inscription = Inscription::find($data['inscription_id']);
        if (!$inscription || $inscription->status !== 'valide') {
            throw new \Exception("L'inscription doit être valide avant de créer un étudiant");
        }
        return $this->studentRepository->create($data);
    }
}
