<?php

namespace App\Models;

// use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PurchaseShipment extends Model
{


    protected $dates = ['deleted_at', 'created_at', 'updated_at'];

    /**
     * Fillable columns.
     *
     * @var string[]
     */
    protected $fillable = ['status', 'description', 'expected_arrival_at', 'order_number', 'date', 'shipping_company_name', 'tracking_number',];
}
