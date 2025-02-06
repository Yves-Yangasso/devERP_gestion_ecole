<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Factories\HasFactory;


class Tuteur extends Model
{
    use SoftDeletes;
    use HasFactory;

    protected $table = 'tuteurs';

    protected $fillable = [
        'nom',
        'prenom',
        'telephone',
        'email',
        'profession',
        'adresse',
        'type_tuteur'
    ];

    public function etudiants(): HasMany
    {
        return $this->hasMany(Etudiant::class);
    }
}


// class Tuteur extends Model
// {
//     use HasFactory;

//     protected $fillable = [
//         'personne_id',
//         'fonction',
//         'status',
//     ];

//     public function personne()
//     {
//         return $this->belongsTo(Personne::class);
//     }
// }
