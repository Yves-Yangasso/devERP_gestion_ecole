<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;

class Inscription extends Model
{
    use HasFactory,Notifiable;
    protected $table = 'inscriptions';

    protected $fillable = [
        'prenom', 'nom', 'date_naissance', 'lieu_naissance',
        'adresse', 'telephone', 'email', 'nationalite',
        'dernier_etablissement', 'niveau', 'formation_superieure', 'specialites','id_tuteur'
    ];
}

