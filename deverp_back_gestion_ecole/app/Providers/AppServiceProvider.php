<?php

namespace App\Providers;

use App\Contracts\Repositories\Formation\FormationRepositoryInterface;
use App\Repositories\Eloquent\Certification\CertificationRepository;
use App\Repositories\Eloquent\Departement\DepartementRepository;
use App\Repositories\Eloquent\Filieres\FiliereRepository;
use App\Repositories\Eloquent\Modalite\ModaliteRepository;
use App\Repositories\Eloquent\NiveauEtudes\NiveauEtudesRepository;
use App\Repositories\Eloquent\Paiement\PaiementRepository;
use Illuminate\Support\ServiceProvider;

use App\Contracts\Auth\AuthentificationServiceInterface;
use App\Contracts\Repositories\Certification\CertificationRepositoryInterface;
use App\Contracts\Repositories\Cours\CoursRepositoryInterface;
use App\Contracts\Repositories\Departement\DepartementRepositoryInterface;
use App\Contracts\Repositories\Etudiant\EtudiantRepositoryInterface;
use App\Contracts\Repositories\Filieres\FiliereRepositoryInterface;
use App\Contracts\Repositories\Modalite\ModaliteRepositoryInterface;
use App\Contracts\Repositories\NiveauEtudes\NiveauEtudesRepositoryInterface;
use App\Contracts\Repositories\OptionFormation\OptionFormationRepositoryInterface;
use App\Contracts\Services\Document\CloudStorageInterface;
use App\Services\Auth\AuthentificationPassport;
use App\Services\Storage\CloudinaryStorageService;
use App\Contracts\Repositories\Paiement\ModePaiementRepositoryInterface;
use App\Contracts\Repositories\Paiement\PaiementRepositoryInterface;
use App\Contracts\Repositories\StructureTarifaire\StructureTarifaireRepositoryInterface;
use App\Repositories\Eloquent\Cours\CoursRepository;
use App\Repositories\Eloquent\EtudiantRepository;
use App\Repositories\Eloquent\Formation\FormationRepository;
use App\Repositories\Eloquent\OptionFormation\OptionFormationRepository;
use App\Repositories\Eloquent\Paiement\ModePaiementRepository;
use App\Repositories\Eloquent\StructureTarifaire\StructureTarifaireRepository;
use Cloudinary\Transformation\FormatInterface;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->bind(AuthentificationServiceInterface::class, AuthentificationPassport::class);
        $this->app->bind(CloudStorageInterface::class, CloudinaryStorageService::class);
        $this->app->bind(ModePaiementRepositoryInterface::class, ModePaiementRepository::class);
        $this->app->bind(FiliereRepositoryInterface::class, FiliereRepository::class);
        $this->app->bind(DepartementRepositoryInterface::class, DepartementRepository::class);
        $this->app->bind(NiveauEtudesRepositoryInterface::class, NiveauEtudesRepository::class);
        $this->app->bind(CertificationRepositoryInterface::class, CertificationRepository::class);
        $this->app->bind(CoursRepositoryInterface::class, CoursRepository::class);
        $this->app->bind(FormationRepositoryInterface::class, FormationRepository::class);
        $this->app->bind(ModaliteRepositoryInterface::class, ModaliteRepository::class);
        $this->app->bind(OptionFormationRepositoryInterface::class, OptionFormationRepository::class);
        $this->app->bind(StructureTarifaireRepositoryInterface::class, StructureTarifaireRepository::class);
        $this->app->bind(PaiementRepositoryInterface::class, PaiementRepository::class);
        $this->app->bind(EtudiantRepositoryInterface::class, EtudiantRepository::class);







    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }
}
