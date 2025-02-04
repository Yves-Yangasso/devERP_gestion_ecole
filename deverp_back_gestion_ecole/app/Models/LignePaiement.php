<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LignePaiement extends Model
{
    use HasFactory;

    protected $fillable = [
        'paiement_id',
        'montant',
        'date_paiement',
        'status',
    ];

    public function paiement()
    {
        return $this->belongsTo(Paiement::class);
    }
}