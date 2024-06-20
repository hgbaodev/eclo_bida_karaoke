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
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->string('active')->unique();
            $table->foreignId('service_id')->constrained('services');
            $table->dateTime('checkin_time')->default(now());
            $table->dateTime('checkout_time')->nullable();
            $table->foreignId('user_id')->constrained('users');
            $table->foreignId('customer_id')->nullable();
            $table->string('status')->default('A');
            $table->float('total_price')->default(0);
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
