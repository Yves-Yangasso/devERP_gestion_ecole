<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Etudiant extends Model
{
    use HasFactory;

    protected $fillable = [
        'inscription_id',
        'matricule',
        'date_inscription',
    ];

    // public function personne()
    // {
    //     return $this->belongsTo(Personne::class);
    // }

    public function filiere()
    {
        return $this->belongsTo(Filiere::class);
    }

    public function groupe()
    {
        return $this->belongsTo(Groupe::class);
    }

    public function inscription(){
        return $this->belongsTo(Inscription::class);
    }

}
