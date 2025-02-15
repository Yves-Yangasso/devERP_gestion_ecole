<?php
// database/migrations/2024_02_11_000002_create_profil_tuteurs_table.php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('profil_tuteurs', function (Blueprint $table) {
            $table->id();
            $table->foreignId('tuteur_id')->constrained()->onDelete('cascade');
            $table->string('photo_url')->nullable();
            $table->text('biographie')->nullable();
            $table->string('profession')->nullable();
            $table->string('lieu_travail')->nullable();
            $table->string('type_piece_identite')->nullable();
            $table->string('numero_piece_identite')->nullable();
            $table->date('date_expiration_piece')->nullable();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('profil_tuteurs');
    }
};
