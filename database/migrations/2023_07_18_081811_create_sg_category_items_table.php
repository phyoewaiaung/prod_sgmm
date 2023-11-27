<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('sg_category_items', function (Blueprint $table) {
            $table->id();
            $table->foreignId('sg_to_mm_id')->references('id')->on('sg_to_mm_items')->constrained()->onDelete('cascade');
            $table->integer('item_category_id')->references('id')->on('item_categories')->constrained()->onDelete('cascade');
            $table->string('name')->nullable();
            $table->string('weight')->nullable();
            $table->string('unit_price')->nullable();
            $table->string('total_price')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('sg_category_items');
    }
};
