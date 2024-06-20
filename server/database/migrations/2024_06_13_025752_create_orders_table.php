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
            $table->timestamps();
            $table->softDeletes();
            $table->string('active')->unique();
//            $table->foreignId('service_id')->constrained('services');
            $table->dateTime('checkout_time')->nullable();
            $table->foreignId('customer_id')->constrained('customers');
            $table->foreignId('staff_id')->constrained('staff');
            $table->string('status')->default('A');
            $table->float('total_price')->default(0);
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
