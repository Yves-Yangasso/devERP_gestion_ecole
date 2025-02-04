<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Paiement extends Model
{
    use HasFactory;

    protected $fillable = [
        'montant_paie',
        'date_paie',
    ];

    public function lignePaiements()
    {
        return $this->hasMany(LignePaiement::class);
    }

    public function modePaiement()
    {
        return $this->belongsTo(ModePaiement::class);
    }
}