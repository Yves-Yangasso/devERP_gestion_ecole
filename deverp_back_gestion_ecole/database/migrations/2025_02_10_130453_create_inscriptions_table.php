<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up()
    {
        Schema::create('inscriptions', function (Blueprint $table) {
            $table->id();
            $table->string('prenom', 255);
            $table->string('nom', 255);
            $table->date('date_naissance');
            $table->string('lieu_naissance', 255);
            $table->string('adresse', 255);
            $table->string('telephone', 20);
            $table->string('email', 255)->unique();
            $table->string('nationalite', 100);
            $table->string('dernier_etablissement', 255)->nullable();
            $table->string('niveau', 100);
            $table->string('formation_superieure', 255)->nullable();
            $table->string('specialites', 255)->nullable();
            $table->unsignedBigInteger('id_tuteur')->nullable();
            $table->enum('statut', ['en_cours', 'validee', 'rejetee', 'annulee'])->default('en_cours');
            // $table->foreignId('etudiant_id')->constrained()->onDelete('cascade');
            // $table->foreignId('filiere_id')->constrained()->onDelete('cascade');
            // $table->foreignId('tuteur_id')->nullable()->constrained()->onDelete('set null');
            $table->timestamps();

            // Clés étrangères
            $table->foreign('id_tuteur')->references('id')->on('tuteurs')->onDelete('set null');
        });
    }

    public function down()
    {
        Schema::dropIfExists('inscriptions');
    }
};
