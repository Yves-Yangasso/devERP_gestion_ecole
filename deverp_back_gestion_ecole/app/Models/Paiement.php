<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Paiement extends Model
{
    use HasFactory;

    protected $fillable = [
        'inscription_id',
        'mode_paiement_id',
        'montant_paiement',
        'status'
    ];

    public function lignesPaiement()
    {
        return $this->hasMany(LignePaiement::class);
    }

    public function inscription(){
        return $this->belongsTo(Inscription::class);
    }

    public function modePaiement(){
        return $this->belongsTo(ModePaiement::class);
        }

}
