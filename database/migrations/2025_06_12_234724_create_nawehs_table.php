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
        Schema::create('nawehs', function (Blueprint $table) {
            // step 1
            $table->id();
            $table->string("gender");
            $table->string("name", 25);
            $table->string("father_name", 25);
            $table->string("last_name", 25);
            $table->string("sur_name", 25)->nullable();
            $table->string("title", 25)->nullable();
            $table->date('date_of_death');
            $table->date('date_of_death2')->nullable();
            $table->unsignedInteger("age");

            // step 2
            $table->string("body_place");
            $table->string("cemetery");
            $table->date("funiral_date");
            $table->string("prayer");

            // step 3
            // men
            $table->string("men_place");
            $table->string("men_time");
            $table->date("men_date");
            $table->unsignedInteger("men_num_of_days"); // maybe use unsigned tiny integer for less space
            // women
            $table->string("women_place")->nullable();
            $table->string("women_time")->nullable();
            $table->date("women_date")->nullable();
            $table->unsignedInteger("women_num_of_days")->nullable(); // maybe use unsigned tiny integer for less space

            $table->string("template");
            $table->string("info")->nullable();
            $table->string("last_names")->nullable();


            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('nawehs');
    }
};
