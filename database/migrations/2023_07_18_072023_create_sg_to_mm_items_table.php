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
        Schema::create('sg_to_mm_items', function (Blueprint $table) {
            $table->id();
            $table->string('sender_email');
            $table->string('sender_name');
            $table->string('sender_phone');
            $table->tinyInteger('sg_home_pickup')->comment('1: true 2: false');
            $table->string('sg_address');
            $table->tinyInteger('shipment_method')->comment('1:Land(2week) 2:Land Express(7-10 days) 3:Sea Cargo(3-4 week) 4:Air Cargo(3-5 days)');
            $table->string('invoice_no');
            $table->tinyInteger('how_in_ygn')->comment('1: Yangon Home Delivery($3.5) 2:Yangon Home Deliver Outside ($5.0) 3: Bus Gate ($3.5) 4: Self Collection');
            $table->tinyInteger('payment_type')->comment('1:SG Pay 2:MM Pay');
            $table->string('pay_with')->nullable();
            $table->string('receiver_name');
            $table->string('receiver_address');
            $table->string('receiver_phone');
            $table->integer('form')->default(1);
            $table->string('estimated_arrival')->nullable();
            $table->string('shelf_no')->nullable();
            $table->string('total_price')->nullable();
            $table->integer('handling_fee')->default(2);
            $table->string('payment_status')->default(1)->comment('1 : pending 2 : received');
            $table->longText('note')->nullable();
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
        Schema::dropIfExists('sg_to_mm_items');
    }
};
