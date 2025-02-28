<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Formation extends Model
{
    use HasFactory;

    protected $fillable = ['filiere_id', 'niveau_id', 'nom', 'description', 'est_en_ligne'];

    public function filiere()
    {
        return $this->belongsTo(Filiere::class);
    }

    public function niveauEtudes()
    {
        return $this->belongsTo(NiveauEtudes::class, 'niveau_id');
    }

    public function certifications()
    {
        return $this->belongsToMany(Certification::class, 'formation_certification');
    }

    public function cours()
    {
        return $this->belongsToMany(Cours::class, 'formation_cours')->withPivot('est_obligatoire');
    }

    public function options()
    {
        return $this->belongsToMany(OptionFormation::class, 'formation_option');
    }

    public function structureTarifaire()
    {
        return $this->hasOne(StructureTarifaire::class);
    }
}
