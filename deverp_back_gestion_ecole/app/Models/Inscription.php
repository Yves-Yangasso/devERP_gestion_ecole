<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;

class Inscription extends Model
{
    use HasFactory, Notifiable;

    protected $table = 'inscriptions';

    protected $fillable = [
        'prenom',
        'nom',
        'date_naissance',
        'lieu_naissance',
        'adresse',
        'telephone',
        'email',
        'nationalite',
        'dernier_etablissement',
        'niveau',
        'formation_superieure',
        'specialites',
        'id_tuteur',
        'code_suivi'
    ];

    protected $casts = [
        'date_naissance' => 'date',
    ];

    public function tuteur()
    {
        return $this->belongsTo(Tuteur::class, 'id_tuteur');
    }
    // public function dossier()
    // {
    //     return $this->hasMany(Dossier::class);
    // }
    public function dossier()
    {
        return $this->hasOne(Dossier::class);
    }

    /**
     * Route notifications for the mail channel.
     */
    public function routeNotificationForMail(): string
    {
        return $this->email;
    }
}
