<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePurchaseShipmentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('purchase_shipments', function (Blueprint $table) {
            $table->id();
            $table->string('order_number');
            $table->string('shipping_company_name');
            $table->string('tracking_number');
            $table->date('date');
            $table->string('status');
            $table->string('description')->nullable();
            $table->dateTime('expected_arrival_at')->nullable();
            // $table->dateTime('')->nullable();
            // $table->foreign('purchase_id','purchase_shipment_purchase_id')->references('id')->on('')->onDelete('')->nullOnDelete();
            $table->timestamps();
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
        Schema::dropIfExists('purchase_shipments');
    }
}
