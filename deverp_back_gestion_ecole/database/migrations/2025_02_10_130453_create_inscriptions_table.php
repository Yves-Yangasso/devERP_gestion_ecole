<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up()
    {
        Schema::create('inscriptions', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('id_users');
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
            $table->timestamps();

            // Clés étrangères
            $table->foreign('id_users')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('id_tuteur')->references('id')->on('tuteurs')->onDelete('set null');
        });
    }

    public function down()
    {
        Schema::dropIfExists('inscriptions');
    }
};
