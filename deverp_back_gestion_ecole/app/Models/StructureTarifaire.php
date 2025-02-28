<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StructureTarifaire extends Model
{
    use HasFactory;

    protected $fillable = ['formation_id', 'cout_annuel', 'droit_inscription', 'mensualite', 'annee_scolaire'];

    public function formation()
    {
        return $this->belongsTo(Formation::class);
    }
}
