<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Classe extends Model
{
    use HasFactory;

    protected $fillable = [
        'nom_classe',
        'niveau',
    ];

    public function groupes()
    {
        return $this->hasMany(Groupe::class);
    }

    public function filieres(){
        return $this->belongsTo(Filiere::class);
    }
}
