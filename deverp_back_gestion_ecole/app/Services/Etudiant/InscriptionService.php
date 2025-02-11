<?php

namespace App\Services\Etudiant;
use App\Events\Etudiant\EtudiantInscrit;
use App\Repositories\Eloquent\InscriptionRepository;
use Illuminate\Support\Facades\Log;
class InscriptionService
{
    protected $inscritRepository;
    public function __construct(InscriptionRepository $inscriptionRepository)
    {
        $this->inscritRepository = $inscriptionRepository;
    }
    public function createInscription(array $data)
    {
        try {
            $student = $this->inscritRepository->create($data);
            event(new EtudiantInscrit($student));

            return $student;
        } catch (\Exception $e) {
           Log::error('Erreur lors de l’inscription : ' . $e->getMessage());
            return response()->json(['error' => 'Une erreur est survenue lors de l’inscription.'], 500);
        }
    }


    public function getAllinscrit()
    {
        return $this->inscritRepository->getAll();
    }

    public function getInscritById($id)
    {
        return $this->inscritRepository->getById($id);
    }
}
