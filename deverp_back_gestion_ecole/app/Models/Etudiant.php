<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Etudiant extends Model
{
    use SoftDeletes;

    protected $table = 'etudiants';

    protected $fillable = [
        'matricule',
        'nom',
        'prenom',
        'date_naissance',
        'lieu_naissance',
        'adresse',
        'telephone',
        'email',
        'cni',
        'statut',
        'photo',
        'tuteur_id'
    ];

    protected $casts = [
        'date_naissance' => 'date',
        'statut' => \App\Enums\Etudiant\StatutEtudiant::class
    ];

    public function tuteur(): BelongsTo
    {
        return $this->belongsTo(Tuteur::class);
    }

    public function profil(): HasOne
    {
        return $this->hasOne(ProfilEtudiant::class);
    }

    public function getNomCompletAttribute(): string
    {
        return "{$this->prenom} {$this->nom}";
    }
}
// namespace App\Models;

// use Illuminate\Database\Eloquent\Factories\HasFactory;
// use Illuminate\Database\Eloquent\Model;

// class Etudiant extends Model
// {
//     use HasFactory;

//     protected $fillable = [
//         'personne_id',
//         'matricule',
//         'date_inscription',
//     ];

//     public function personne()
//     {
//         return $this->belongsTo(Personne::class);
//     }

//     public function filiere()
//     {
//         return $this->belongsTo(Filiere::class);
//     }

//     public function groupe()
//     {
//         return $this->belongsTo(Groupe::class);
//     }
// }