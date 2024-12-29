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
        Schema::create('plans', function (Blueprint $table) {
            $table->id();

            $table->unsignedBigInteger('combination_id');

            $table->decimal('monthly', 8, 2);
            $table->decimal('upfront', 8, 2);
            $table->string('contract_length');
            $table->string('data_allowance');
            $table->string('minutes');
            $table->string('texts');
            $table->string('network');



            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('plans');
    }
};
