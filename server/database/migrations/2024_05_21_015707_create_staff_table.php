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
            $table->string('staff_name');
            $table->date('staff_birthday');
            $table->string('staff_image');
            $table->string('staff_phone');
            $table->string('staff_idcard');
            $table->string('staff_address');
            $table->foreignId('position_id')->constrained('position');
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
