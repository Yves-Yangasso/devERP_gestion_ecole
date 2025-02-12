<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class AssociationEtudiantTuteur extends Model
{
    protected $table = 'association_etudiant_tuteur';

    protected $fillable = [
        'inscription_id',
        'tuteur_id',
        'type_association',
    ];

    public function inscription(): BelongsTo
    {
        return $this->belongsTo(Inscription::class, 'inscription_id');
    }

    public function tuteur(): BelongsTo
    {
        return $this->belongsTo(Tuteur::class, 'tuteur_id');
    }
}
