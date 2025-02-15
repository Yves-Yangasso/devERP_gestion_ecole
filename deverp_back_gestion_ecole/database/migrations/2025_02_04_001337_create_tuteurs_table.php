<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use App\Enums\Tuteur\StatutTuteur;

return new class extends Migration
{
    public function up()
    {
        Schema::create('tuteurs', function (Blueprint $table) {
            $table->id();
            // $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('prenom');
            $table->string('nom');
            $table->string('email')->unique();
            $table->string('telephone');
            $table->string('adresse')->nullable();
            $table->string('profession')->nullable();
            $table->string('fonctions')->nullable();
            $table->enum('statut', array_column(StatutTuteur::cases(), 'value'))
                ->default(StatutTuteur::ACTIF->value);
            $table->timestamps();
        });

        Schema::create('association_etudiant_tuteur', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('etudiant_id');
            $table->unsignedBigInteger('tuteur_id');
            $table->enum('type_association', [
                'parent',
                'responsable_legal',
                'employeur',
                'autre'
            ]);
            $table->timestamps();

            $table->foreign('etudiant_id')
                ->references('id')
                ->on('etudiants')
                ->onDelete('cascade');

            $table->foreign('tuteur_id')
                ->references('id')
                ->on('tuteurs')
                ->onDelete('cascade');
        });
    }

    public function down()
    {
        Schema::dropIfExists('association_etudiant_tuteur');
        Schema::dropIfExists('tuteurs');
    }
};
