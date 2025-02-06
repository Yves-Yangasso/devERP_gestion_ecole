<?php
// app/Models/Dossier.php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Dossier extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'etudiant_id',
        'numero_dossier',
        'statut',
        'date_depot',
        'date_traitement',
        'commentaires'
    ];

    protected $casts = [
        'date_depot' => 'datetime',
        'date_traitement' => 'datetime'
    ];

    // Relations
    public function etudiant()
    {
        return $this->belongsTo(Etudiant::class);
    }

    public function documents()
    {
        return $this->hasMany(Document::class);
    }
    public function allSubmitted()
    {
        return $this->where('statut', '!=', 'non_soumis')->count() === $this->count();
    }

    public function allValidated()
    {
        return $this->where('statut', 'valide')->count() === $this->count();
    }
}
