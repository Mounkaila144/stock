<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class QuotationsDetailsWithFreeTextProductField extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('quotation_details', function (Blueprint $table) {
            $table->string('description', 192)->nullable();
            $table->integer('product_id')->nullable()->change();
            $table->integer('product_variant_id')->nullable()->change();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
        Schema::table('', function (Blueprint $table) {
            $table->dropColumn('description');
            $table->integer('product_id')->nullable(false)->change();
            $table->integer('product_variant_id')->nullable(false)->change();
        });
    }
}
