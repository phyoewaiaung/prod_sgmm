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
        Schema::create('mm_to_sg_items', function (Blueprint $table) {
            $table->id();
            $table->string('sender_email')->nullable();
            $table->string('sender_name');
            $table->string('sender_phone');
            $table->string('sender_address');
            $table->tinyInteger('transport')->comment('1: Sea Cargo 2: Air Cargo');
            $table->tinyInteger('storage_type')->comment('1: Room Temperature 2: In Normal Fridge 3: In Freezer');
            $table->tinyInteger('mm_home_pickup')->comment('1: yes 2: no');
            $table->tinyInteger('how_in_sg')->comment('1: SG Home Delivery ($5.90 within two days) 2: SG Home Delivery ($10.0 withtin one day) 3: Self Collection');
            $table->string('invoice_no');
            $table->tinyInteger('payment_type')->comment('1: SG Pay 2: MM Pay');
            $table->string('pay_with')->nullable();
            $table->string('receiver_name');
            $table->string('receiver_phone');
            $table->string('receiver_address');
            $table->string('receiver_postal_code')->nullable();
            $table->integer('handling_fee')->default(2);
            $table->integer('form');
            $table->string('estimated_arrival')->nullable();
            $table->string('shelf_no')->nullable();
            $table->string('total_price')->nullable();
            $table->string('payment_status')->default(1)->comment('1 : pending 2 : received');
            $table->longText('additional_instruction')->nullable();
            $table->timestamps();
        });
    }

    ## MM TO SG 

    // sender name *
    // sender phone *
    // sender address 
    // transport * ( Sea or Air )

    // items_type * -> အစားအစာ, Clothes, Cosmetics,Medicine,Supplements, Frozen Food, Electronic Goods, Other

    // (next page -> weight pr)

    // storage_type * -> Room_Temperature,In NOrmal Fridge, In Freezer

    // cargo_details 
    // ygn_home_pickup * -> boolean (yes, no)

    // how_in_sg * -> SG Home Delivery ($5.90 within two days)
    // 	     SG Home Delivery ($10.0 withtin one day)
    // 	     Self Collection

    // payment_type * -> SG Pay, MM Pay

    // receiver_name *
    // receiver_phone *
    // receicer_postal_code 
    // receiver_address
    // additional_instruction 
    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('mm_to_sg_items');
    }
};
