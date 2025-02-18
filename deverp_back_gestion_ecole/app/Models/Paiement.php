<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Paiement extends Model
{
    use HasFactory;

    protected $fillable = [
        'montant_paiement',
        'date_paiement',
        'etudiant_id',
    ];

    public function lignePaiements()
    {
        return $this->hasMany(LignePaiement::class);
    }

    public function modePaiement()
    {
        return $this->belongsTo(ModePaiement::class);
    }

    public function etudiant()
    {
        return $this->belongsTo(Etudiant::class);
    }
}
