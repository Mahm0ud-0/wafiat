<?php

use App\Models\Naweh;
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
        Schema::create('relatives', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(Naweh::class);
            $table->string("name", 25);
            $table->string("last_name", 25);
            $table->string("sur_name", 25)->nullable();
            $table->string("relation", 20);

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('raltaives');
    }
};
