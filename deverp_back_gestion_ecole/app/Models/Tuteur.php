<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use App\Enums\Tuteur\StatutTuteur;
use App\Traits\Tuteur\GestionAssociations;

class Tuteur extends Model
{
    use HasFactory, GestionAssociations;

    protected $fillable = [
        'prenom',
        'nom',
        'email',
        'telephone',
        'adresse',
        'fonctions',
        'statut'
    ];

    protected $casts = [
        'statut' => StatutTuteur::class
    ];

    public function profilTuteur()
    {
        return $this->hasOne(ProfilTuteur::class);
    }

    public function inscription()
    {
        return $this->belongsToMany(
            Inscription::class,
            'association_etudiant_tuteur',
            'tuteur_id',
            'inscription_id'
        );
    }
}
