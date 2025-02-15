<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use App\Enums\Dossier\StatutDocument;

// Création de la table documents
return new class extends Migration
{
    public function up(): void
    {
        Schema::create('documents', function (Blueprint $table) {
            $table->id();
            $table->foreignId('dossier_id')->constrained()->onDelete('cascade');
            $table->enum('type', [
                'bulletin_notes',
                'certificat_residence',
                'cni_passeport',
                'diplome',
                'certificat_scolarite',
                'casier_judiciaire',
                'photo_identite'
            ])->nullable();
            $table->string('chemin')->nullable();
            $table->string('url_secure')->nullable();
            $table->string('url_public')->nullable();
            $table->string('folder_path')->nullable();
            $table->string('format')->nullable();
            $table->string('public_id')->nullable();
            $table->enum('statut', ['en_attente', 'valide', 'a_verifier'])->default('en_attente');
            $table->text('commentaire')->nullable();
            $table->timestamp('date_validation')->nullable();
            $table->timestamps();
            $table->softDeletes();

            $table->unique(['dossier_id', 'type']);
        });

        // Table pour stocker les détails de validation
        Schema::create('validation_documents', function (Blueprint $table) {
            $table->id();
            $table->foreignId('document_id')->constrained()->onDelete('cascade');
            $table->string('validateur_type'); // 'systeme' ou 'utilisateur'
            $table->unsignedBigInteger('validateur_id')->nullable(); // ID de l'utilisateur si validation manuelle
            $table->json('resultats_validation')->nullable(); // Stockage des résultats de validation IA
            $table->decimal('score_confiance', 5, 2)->nullable(); // Score de confiance de l'IA
            $table->text('commentaire')->nullable();
            $table->timestamps();

            $table->index(['document_id', 'validateur_type']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('validation_documents');
        Schema::dropIfExists('documents');
    }
};
