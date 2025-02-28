<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Filiere extends Model
{
    use HasFactory;

    protected $fillable = ['departement_id', 'nom', 'description', 'est_professionnelle'];

    public function departement()
    {
        return $this->belongsTo(Departement::class);
    }

    public function formations()
    {
        return $this->hasMany(Formation::class);
    }
}
