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
        Schema::create('shift_details', function (Blueprint $table) {
            $table->id('id');
            $table->foreignId('shift_id')->constrained('shifts');
            $table->string('day_of_week');
            $table->integer("quantity_of_staff");
            $table->softDeletes();
            $table->string('active')->unique();
            $table->unique(['shift_id', 'day_of_week']);
            $table->timestamps(true);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('shift_details');
    }
};
