<?php
// database/migrations/2024_02_04_000004_create_inscriptions_table.php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use App\Enums\Etudiant\StatutInscription;

class CreateInscriptionsTable extends Migration
{
    public function up()
    {
        Schema::create('inscriptions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('etudiant_id')
                  ->constrained('etudiants')
                  ->onDelete('cascade');
            
            $table->string('annee_academique');
            $table->string('niveau');
            $table->string('filiere');
            $table->enum('statut', [
                StatutInscription::EN_ATTENTE->value, 
                StatutInscription::CONFIRMEE->value,
                StatutInscription::REJETEE->value,
                StatutInscription::TERMINEE->value
            ]);
            
            $table->date('date_inscription');
            $table->date('date_debut')->nullable();
            $table->date('date_fin')->nullable();
            
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('inscriptions');
    }
}
