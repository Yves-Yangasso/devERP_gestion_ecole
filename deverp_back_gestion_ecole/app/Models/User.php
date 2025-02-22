<?php

namespace App\Models;

use Laravel\Passport\HasApiTokens;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    use HasApiTokens;

    protected $fillable = [
        'name',
        'email',
        'password',
        'login',
        'refresh_token',
        'last_activity'
    ];

    protected $hidden = [
        'password',
        'refresh_token'
    ];

    protected $casts = [
        'last_activity' => 'datetime'
    ];
}


// namespace App\Models;

// use Illuminate\Database\Eloquent\Factories\HasFactory;
// use Illuminate\Foundation\Auth\User as Authenticatable;
// use Illuminate\Notifications\Notifiable;
// use Laravel\Passport\HasApiTokens; // Ajout de l'import de Passport
// use Spatie\Permission\Traits\HasRoles;

// class User extends Authenticatable
// {
//     use HasFactory, Notifiable, HasApiTokens; // Utilisation de HasApiTokens pour la gestion des tokens API

//     /**
//      * Les attributs qui peuvent être assignés en masse.
//      *
//      * @var array<int, string>
//      */
//     protected $fillable = [
//         'name',
//         'email',
//         'password',
//     ];

//     /**
//      * Relation avec le modèle Personne.
//      *
//      * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
//      */
//     public function personne()
//     {
//         return $this->belongsTo(Personne::class);
//     }

//     /**
//      * Les attributs qui doivent être cachés lors de la sérialisation.
//      *
//      * @var array<int, string>
//      */
//     protected $hidden = [
//         'password',
//         'remember_token',
//     ];

//     /**
//      * Les attributs qui doivent être convertis.
//      *
//      * @var array<string, string>
//      */
//     protected $casts = [
//         'email_verified_at' => 'datetime',
//     ];
// }
