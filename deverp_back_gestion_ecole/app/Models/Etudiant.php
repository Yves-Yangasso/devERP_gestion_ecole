<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;

class Etudiant extends Model
{
    use HasFactory;
    use Notifiable;

    protected $fillable = [
        'inscription_id',
        'matricule',
        'nom',
        'prenom',
        'email_institutionnel',
    ];

    public function personne()
    {
        return $this->belongsTo(Personne::class);
    }

    public function inscription(){
        return $this->belongsTo(Inscription::class);
    }

    public function filiere()
    {
        return $this->belongsTo(Filiere::class);
    }

    public function groupe()
    {
        return $this->belongsTo(Groupe::class);
    }
}
