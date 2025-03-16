<?php
// app/Models/ProfilEtudiant.php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ProfilEtudiant extends Model
{
    protected $table = 'profils_etudiant';

    protected $fillable = [
        'etudiant_id',
        'nationalite',
        'situation_matrimoniale',
        'groupe_sanguin',
        'allergies',
        'antecedents_medicaux',
        'personne_a_contacter',
        'telephone_urgence',
        'derniere_ecole',
        'dernier_diplome',
        'annee_obtention',
        'niveau_etude',
        'dernier_etablissement',
        'serie_bac',
        'annee_bac',
        'numero_bac',
        'photo_url'
    ];

    public function etudiant(): BelongsTo
    {
        return $this->belongsTo(Etudiant::class);
    }
}