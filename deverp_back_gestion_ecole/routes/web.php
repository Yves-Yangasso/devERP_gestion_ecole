<?php

use App\Http\Controllers\Etudiant\InscriptionController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});


Route::post('/inscrire', [InscriptionController::class, 'inscrire']);
