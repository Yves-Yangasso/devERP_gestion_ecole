<?php
// 1. App/Jobs/Etudiant/GenererCarteEtudiantJob.php

namespace App\Jobs\Etudiant;

use App\Models\Etudiant;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Storage;
use SimpleSoftwareIO\QrCode\Facades\QrCode;
use Intervention\Image\Facades\Image;
use Illuminate\Support\Facades\Log;

class GenererCarteEtudiantJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $etudiant;
    public $tries = 3; // Nombre de tentatives en cas d'échec
    public $timeout = 180; // Timeout en secondes

    public function __construct(Etudiant $etudiant)
    {
        $this->etudiant = $etudiant;
    }

    public function handle()
    {
        try {
            // Création du template de la carte
            $carte = Image::make(storage_path('app/templates/carte_etudiant.png'));

            // Ajout des informations de l'étudiant
            $carte->text($this->etudiant->matricule, 150, 200, function($font) {
                $font->file(storage_path('app/fonts/arial.ttf'));
                $font->size(16);
                $font->color('#000000');
            });

            $carte->text($this->etudiant->nom_complet, 150, 250, function($font) {
                $font->file(storage_path('app/fonts/arial.ttf'));
                $font->size(16);
                $font->color('#000000');
            });

            // Génération du QR Code
            $qrCode = QrCode::format('png')
                           ->size(150)
                           ->generate($this->etudiant->matricule);

            // Ajout de la photo de l'étudiant
            if ($this->etudiant->photo) {
                $photo = Image::make(Storage::path($this->etudiant->photo))
                             ->fit(150, 150);
                $carte->insert($photo, 'top-left', 50, 50);
            }

            // Ajout du QR Code
            $carte->insert($qrCode, 'bottom-right', 50, 50);

            // Sauvegarde de la carte
            $cheminCarte = 'cartes_etudiants/' . $this->etudiant->matricule . '.png';
            $carte->save(storage_path('app/public/' . $cheminCarte));

            // Mise à jour du chemin de la carte dans la base de données
            $this->etudiant->update([
                'chemin_carte' => $cheminCarte
            ]);

        } catch (\Exception $e) {
            report($e);
            throw $e;
        }
    }

    public function failed(\Throwable $exception)
    {
        // Notification en cas d'échec
        Log::error('Échec de génération de la carte étudiant', [
            'etudiant_id' => $this->etudiant->id,
            'error' => $exception->getMessage()
        ]);
    }
}