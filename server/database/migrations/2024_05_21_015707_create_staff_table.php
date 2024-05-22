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
        Schema::create('staff', function (Blueprint $table) {
            $table->id("id");
            $table->string('name');
            $table->date('birthday');
            $table->string('image');
            $table->string('phone')->unique();
            $table->string('idcard')->unique();
            $table->string('address');
            $table->foreignId('position_id')->constrained('positions');
            // $table->string('staff_salary');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('staff');
    }
};
