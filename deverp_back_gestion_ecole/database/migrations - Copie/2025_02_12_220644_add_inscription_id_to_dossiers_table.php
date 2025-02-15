<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // Ajout de la colonne inscription_id en nullable pour éviter l'erreur initiale
        Schema::table('dossiers', function (Blueprint $table) {
            if (!Schema::hasColumn('dossiers', 'inscription_id')) {
                $table->foreignId('inscription_id')
                      ->nullable() // Permet d'éviter la violation de contrainte
                      ->after('id')
                      ->constrained('inscriptions')
                      ->onDelete('cascade');
            }

            if (!Schema::hasColumn('dossiers', 'code_suivi')) {
                $table->string('code_suivi')->unique()->after('inscription_id');
            }

            if (!Schema::hasColumn('dossiers', 'statut')) {
                $table->string('statut')->default('en_attente')->after('code_suivi');
            }
        });

        // Vérifier s'il existe au moins une inscription avant de mettre à jour
        $inscriptionExists = DB::table('inscriptions')->exists();

        if ($inscriptionExists) {
            $firstInscriptionId = DB::table('inscriptions')->min('id');
            DB::table('dossiers')->update(['inscription_id' => $firstInscriptionId]);
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('dossiers', function (Blueprint $table) {
            $table->dropForeign(['inscription_id']);
            $table->dropColumn('inscription_id');
            $table->dropColumn('code_suivi');
            $table->dropColumn('statut');
        });
    }
};
