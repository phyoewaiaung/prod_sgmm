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
        Schema::table('mm_to_sg_items', function (Blueprint $table) {
            $table->dropColumn('shelf_no');
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('mm_to_sg_items', function (Blueprint $table) {
            $table->string('shelf_no')->nullable()->after('estimated_arrival');
        });
    }
};
