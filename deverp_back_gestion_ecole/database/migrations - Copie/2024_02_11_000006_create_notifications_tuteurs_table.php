<?php
// database/migrations/2024_02_11_000006_create_notifications_tuteurs_table.php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('notifications_tuteurs', function (Blueprint $table) {
            $table->id();
            $table->foreignId('tuteur_id')->constrained()->onDelete('cascade');
            $table->string('type_notification');
            $table->string('titre');
            $table->text('message');
            $table->boolean('est_lu')->default(false);
            $table->timestamp('date_lecture')->nullable();
            $table->timestamps();

            $table->index('est_lu');
            $table->index('created_at');
        });
    }

    public function down()
    {
        Schema::dropIfExists('notifications_tuteurs');
    }
};
