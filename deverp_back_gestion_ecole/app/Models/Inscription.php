<?php
// app/Models/Inscription.php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Enums\Etudiant\StatutInscription;

class Inscription extends Model
{
    protected $table = 'inscriptions';

    protected $fillable = [
        'etudiant_id',
        'annee_academique',
        'niveau',
        'filiere',
        'statut',
        'date_inscription',
        'date_debut',
        'date_fin'
    ];

    protected $casts = [
        'date_inscription' => 'datetime',
        'date_debut' => 'date',
        'date_fin' => 'date',
        'statut' => StatutInscription::class
    ];

    public function etudiant()
    {
        return $this->belongsTo(Etudiant::class);
    }

    public function utilisateu(){
        return $this->belongsTo(User::class,'utilisateur_id');
    }
}
