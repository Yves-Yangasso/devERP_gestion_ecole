<?php
// Database/Migrations/xxxx_xx_xx_create_documents_table.php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('documents', function (Blueprint $table) {
            $table->id();
            $table->foreignId('etudiant_id')->constrained('etudiants');
            $table->foreignId('type_document_id')->constrained('types_documents');
            $table->string('nom');
            $table->string('chemin_fichier');
            $table->string('cloudinary_id');
            $table->integer('taille');
            $table->string('format');
            $table->enum('statut', ['en_attente', 'valide', 'rejete']);
            $table->timestamp('date_expiration')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    public function down()
    {
        Schema::dropIfExists('documents');
    }
};