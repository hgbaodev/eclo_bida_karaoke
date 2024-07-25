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
        Schema::create('salaries', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('staff_id');
            $table->foreign('staff_id')->references('id')->on('staff');
            $table->integer("month");
            $table->integer("year");
            $table->double("base_salary")->nullable();
            $table->integer("off_days")->nullable();
            $table->integer("off_days_unapproved")->nullable();
            $table->integer("working_days")->nullable();
            $table->double("working_hours")->nullable();
            $table->double("total")->nullable();
            $table->unique(["staff_id", "month", "year"]);
            $table->string('active');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('salaries');
    }
};
