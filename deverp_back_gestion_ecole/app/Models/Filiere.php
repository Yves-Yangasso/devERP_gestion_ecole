<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Filiere extends Model
{
    use HasFactory;

    protected $fillable = [
        'nom_filiere',
        'description',
        'status',
    ];

    public function etudiants()
    {
        return $this->hasMany(Etudiant::class);
    }

    public function couts()
    {
        return $this->hasMany(CoutFiliere::class);
    }

    public function departement()
    {
        return $this->belongsTo(Departement::class);
    }
}
