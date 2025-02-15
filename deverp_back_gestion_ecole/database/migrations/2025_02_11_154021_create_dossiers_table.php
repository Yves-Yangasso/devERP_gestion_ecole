<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('dossiers', function (Blueprint $table) {
            $table->id();
            $table->foreignId('inscription_id')->constrained()->onDelete('cascade');
            $table->string('code_suivi')->unique();
            $table->string('titre')->nullable();
            $table->text('description')->nullable();
            $table->enum('statut', ['en_attente', 'en_cours_validation', 'valide', 'rejete', 'incomplet'])
                ->default('en_attente');
            $table->text('commentaire')->nullable();
            $table->enum('mode_validation', ['manuel', 'automatique'])->default('manuel');
            $table->timestamp('date_soumission')->nullable();
            $table->timestamps();
            $table->softDeletes();

            // Index pour améliorer les performances des recherches
            $table->index('code_suivi');
            $table->index('statut');
            $table->index(['inscription_id', 'statut']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('dossiers');
    }
};
