<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ModePaiement extends Model
{
    use HasFactory;

    protected $fillable = [
        'type_mode',
        'status',
    ];

    public function paiements()
    {
        return $this->hasMany(Paiement::class);
    }
}
