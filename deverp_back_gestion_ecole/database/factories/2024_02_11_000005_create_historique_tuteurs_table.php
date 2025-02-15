<?php
// database/migrations/2024_02_11_000005_create_historique_tuteurs_table.php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('historique_tuteurs', function (Blueprint $table) {
            $table->id();
            $table->foreignId('tuteur_id')->constrained()->onDelete('cascade');
            $table->string('type_action'); // création, modification, suppression
            $table->json('anciennes_valeurs')->nullable();
            $table->json('nouvelles_valeurs')->nullable();
            $table->string('effectue_par'); // utilisateur qui a effectué l'action
            $table->timestamps();

            $table->index('type_action');
            $table->index('created_at');
        });
    }

    public function down()
    {
        Schema::dropIfExists('historique_tuteurs');
    }
};
