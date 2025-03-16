<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('profils_etudiant', function (Blueprint $table) {
            $table->id();
            $table->foreignId('etudiant_id')->constrained('etudiants')->onDelete('cascade');
            $table->string('nationalite');
            $table->string('niveau_etude');
            $table->string('situation_matrimoniale')->nullable();
            $table->string('groupe_sanguin')->nullable();
            $table->text('allergies')->nullable();
            $table->text('antecedents_medicaux')->nullable();
            $table->string('personne_a_contacter')->nullable();
            $table->string('telephone_urgence')->nullable();
            $table->string('derniere_etablissement')->nullable();
            $table->string('serie_bac');
            $table->year('annee_bac');
            $table->string('numero_bac')->unique();
            $table->string('photo_url')->nullable();
            $table->string('dernier_diplome')->nullable();
            $table->year('annee_obtention')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('profils_etudiant');
    }
};