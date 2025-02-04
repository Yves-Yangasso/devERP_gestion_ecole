<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LigneUE extends Model
{
    use HasFactory;

    protected $fillable = [
        'ue_id',
        'filiere_id',
        'date_ligne_ue',
    ];
}
