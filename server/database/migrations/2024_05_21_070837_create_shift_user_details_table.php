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
        Schema::create('shift_user_details', function (Blueprint $table) {
            $table->primary(['staff_id', 'shift_detail_id']);
            $table->foreignId('staff_id')->constrained('staff');
            $table->foreignId('shift_detail_id')->constrained('shift_details');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('shift_user_details');
    }
};
