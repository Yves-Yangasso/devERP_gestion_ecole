<?php
// Model ProfilTuteur
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProfilTuteur extends Model
{
    use HasFactory;

    protected $fillable = ['nom', 'prenom', 'email', 'telephone'];

    public function etudiants()
    {
        return $this->belongsToMany(Etudiant::class, 'tuteur_etudiant');
    }
}
