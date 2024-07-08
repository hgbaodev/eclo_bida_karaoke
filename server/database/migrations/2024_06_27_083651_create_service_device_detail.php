<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use App\Enums\ServiceDeviceStatusEnum;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('service_device_detail', function (Blueprint $table) {
            $table->id();
            $table->string('active');
            $table->foreignId('device_id')->constrained('devices');
            $table->foreignId('service_id')->constrained('services');
            $table->string('status')->default(ServiceDeviceStatusEnum::IN_USE);
            $table->integer('quantity');
            $table->integer('maintenance_quantity')->default(0);
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('service_device_detail');
    }
};
