<?php

use App\Http\Controllers\API\Document\DocumentController;
use App\Http\Controllers\API\Dossier\DossierController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Etudiant\InscriptionEtudiantController;
use App\Http\Controllers\API\Tuteur\TuteurController;
use App\Http\Controllers\DepartementController;
use App\Http\Controllers\Etudiant\AssociationEtudiantTuteurController;
use App\Http\Controllers\FiliereController;

// Route::post('/inscription_etudiant', [InscriptionEtudiantController::class, 'store']);
// Route::get('/inscriptions', [InscriptionEtudiantController::class, 'index']);
// Route::get('/inscription/{id}', [InscriptionEtudiantController::class, 'show']);

Route::prefix('/inscription')->group(function () {
    // Liste des inscription
    Route::get('/', [InscriptionEtudiantController::class, 'index']);

    // Détails d'un tuteur
    Route::get('/{id}', [InscriptionEtudiantController::class, 'show']);

    // Créer un tuteur
    Route::post('/', [InscriptionEtudiantController::class, 'store']);

    // Modifier un tuteur
    //Route::put('/{id}', [InscriptionEtudiantController::class, 'modifier']);

    // Supprimer un tuteur
    //Route::delete('/{id}', [InscriptionEtudiantController::class, 'supprimer']);
});
Route::prefix('/tuteurs')->group(function () {
    // Liste des tuteurs
    Route::get('/', [TuteurController::class, 'index']);

    // Détails d'un tuteur
    Route::get('/{id}', [TuteurController::class, 'show']);

    // Créer un tuteur
    Route::post('/', [TuteurController::class, 'creer']);

    // Modifier un tuteur
    Route::put('/{id}', [TuteurController::class, 'modifier']);

    // Supprimer un tuteur
    Route::delete('/{id}', [TuteurController::class, 'supprimer']);
});

Route::prefix('api/dossiers')->group(function () {
    Route::post('/', [DossierController::class, 'store']);
});

Route::prefix('api/documents')->group(function () {
    Route::post('/', [DocumentController::class, 'store']);
});


Route::apiResource('departements', DepartementController::class);
Route::apiResource('filieres', FiliereController::class);
Route::get('/tuteur/{id}/inscriptions', [AssociationEtudiantTuteurController::class, 'getInscriptionsByTuteur']);
Route::get('/inscription/{id}/tuteurs', [AssociationEtudiantTuteurController::class, 'getTuteursByInscription']);
