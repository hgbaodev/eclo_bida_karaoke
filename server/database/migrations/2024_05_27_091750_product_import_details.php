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
        Schema::create('product_import_details', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('id_product');
            $table->double('cost_price');
            $table->double('selling_price')->default(0);
            $table->bigInteger('quantity');
            $table->unsignedBigInteger('supplier_id')->nullable();
            $table->unsignedBigInteger('import_id');
            $table->string('active')->unique();
            $table->softDeletes();
            $table->timestamps();
            $table->unique(['id_product', 'import_id']);
            $table->foreign('id_product')->references('id')->on('products');
            $table->foreign('supplier_id')->references('id')->on('suppliers');
            $table->foreign('import_id')->references('id')->on('product_imports');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('product_import_details');
    }
};
