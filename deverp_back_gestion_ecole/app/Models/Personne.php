<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Personne extends Model
{
    use HasFactory;

    protected $fillable = [
        'nom',
        'prenom',
        'date_nais',
        'email',
        'telephone',
        'nationalite',
    ];

    public function utilisateur()
    {
        return $this->hasOne(User::class);
    }

    public function tuteur()
    {
        return $this->hasOne(Tuteur::class);
    }

    public function etudiant()
    {
        return $this->hasOne(Etudiant::class);
    }
}
