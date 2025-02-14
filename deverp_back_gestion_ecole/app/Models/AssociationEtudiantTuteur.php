<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class AssociationEtudiantTuteur extends Model
{
    protected $table = 'association_etudiant_tuteur';

    protected $fillable = [
        'etudiant_id',
        'tuteur_id',
    ];

    public function etudiant(): BelongsTo
    {
        return $this->belongsTo(Etudiant::class, 'etudiant_id');
    }

    public function tuteur(): BelongsTo
    {
        return $this->belongsTo(Tuteur::class, 'tuteur_id');
    }
}
