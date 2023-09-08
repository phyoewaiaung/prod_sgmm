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
        Schema::create('mm_category_items', function (Blueprint $table) {
            $table->id();
            $table->integer('mm_to_sg_id');
            $table->integer('item_category_id');
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
        Schema::dropIfExists('mm_category_items');
    }
};
