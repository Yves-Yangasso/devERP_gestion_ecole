<?php
// app/Services/Etudiant/InscriptionService.php
namespace App\Services\Etudiant;
use App\Contracts\Repositories\Etudiant\InscriptionRepositoryInterface;
use App\Events\Etudiant\EtudiantInscrit;
use App\Enums\Etudiant\StatutEtudiant;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;
use Exception;
class InscriptionService
{
    private $inscriptionRepository;

    public function __construct(
        InscriptionRepositoryInterface $inscriptionRepository
    ) {
        $this->inscriptionRepository = $inscriptionRepository;
    }

    public function inscrire(array $donnees)
    {
        DB::beginTransaction();

        try {
            // 2. Création de l'étudiant
            $donneesInscriptions = [
                'nom' => $donnees['nom'],
                'prenom' => $donnees['prenom'],
                'date_naissance' => $donnees['date_naissance'],
                'lieu_naissance' => $donnees['lieu_naissance'],
                'adresse' => $donnees['adresse'],
                'telephone' => $donnees['telephone'],
                'email' => $donnees['email'],
                'cni' => $donnees['cni'],
                'nationalite' => $donnees['nationalite'],
                'dernier_etablissement' => $donnees['dernier_etablisement'],
                'niveau' => $donnees['niveau'],
                'formation_superieur' => $donnees['formation_superieur'],
                'id_specialite' => $donnees['id_specialite'],
                'statut' => StatutEtudiant::EN_ATTENTE,
                'user_id' => Auth::user()->id,
            ];
            $etudiant = $this->inscriptionRepository->create($donneesInscriptions);

            event(new EtudiantInscrit($etudiant->id,$donneesInscriptions['id']));
            DB::commit();

        } catch (Exception $e) {
            DB::rollBack();
            Log::error('Erreur lors de l\'inscription: ' . $e->getMessage());
            throw new Exception('Une erreur est survenue lors de l\'inscription');
        }
    }
}
