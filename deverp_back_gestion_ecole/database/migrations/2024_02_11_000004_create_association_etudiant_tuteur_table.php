<?php
// database/migrations/2024_02_11_000004_create_association_etudiant_tuteur_table.php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('association_etudiant_tuteur', function (Blueprint $table) {
            $table->id();
            $table->foreignId('inscription_id')->constrained()->onDelete('cascade');
            $table->foreignId('tuteur_id')->constrained()->onDelete('cascade');
            $table->enum('type_association', [
                'parent',
                'responsable_legal',
                'employeur',
                'autre'
            ]);
            $table->date('date_debut');
            $table->date('date_fin')->nullable();
            $table->boolean('est_actif')->default(true);
            $table->text('commentaire')->nullable();
            $table->timestamps();

            // Index pour optimiser les recherches
            $table->index(['inscription_id', 'tuteur_id']);
            $table->index('type_association');
            $table->index('est_actif');
        });
    }

    public function down()
    {
        Schema::dropIfExists('association_etudiant_tuteur');
    }
};
