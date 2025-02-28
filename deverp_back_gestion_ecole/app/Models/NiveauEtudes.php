<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class NiveauEtudes extends Model
{
    use HasFactory;

    protected $fillable = ['code', 'nom', 'nombre_semestres', 'nombre_annees'];
}
