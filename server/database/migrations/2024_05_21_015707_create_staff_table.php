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
            $table->string('first_name');
            $table->string('last_name');
            $table->date('birthday');
            $table->string('gender');
            $table->string('image')->nullable();
            $table->string('phone')->unique();
            $table->string('idcard')->unique();
            $table->string('address');
            $table->string('uuid')->unique();
            $table->string('status');
            $table->foreignId('position_id')->constrained('positions');
            $table->foreignId('user_id')->nullable()->constrained('users');
            $table->string('active')->unique();
            $table->softDeletes();
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
