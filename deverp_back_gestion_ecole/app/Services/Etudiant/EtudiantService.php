<?php
namespace App\Services\Etudiant;

use App\Contracts\Repositories\Etudiant\EtudiantRepositoryInterface;
use App\Contracts\Repositories\Etudiant\StudentServiceInterface as EtudiantStudentServiceInterface;
use App\Events\Etudiant\EtudiantCree;
use App\Models\Inscription;
use Exception;

class EtudiantService implements EtudiantStudentServiceInterface
{
    protected $studentRepository;

    public function __construct(EtudiantRepositoryInterface $studentRepository)
    {
        $this->studentRepository = $studentRepository;
    }

    public function registerStudent(array $data)
    {
        $inscription = Inscription::find($data['id']);
        if (!$inscription || $inscription->status !== 'valide') {
            throw new Exception("L'inscription doit être valide avant de créer un étudiant");
        }

        $studentData = [
            'inscription_id' => $inscription->id,
            'prenom' => $inscription->prenom,
            'nom' => $inscription->nom,
            'matricule' => date('Y') . '' . date('m') . '' . $inscription->id,
            'email_institutionnel' => strtolower("{$inscription->prenom}.{$inscription->nom}@groupeisi.sn"),
        ];

        $student = $this->studentRepository->create($studentData);

        // Déclencher l'événement
        event(new EtudiantCree($student));

        return $student;
    }
}
