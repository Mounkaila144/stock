<?php

namespace App\Http\Controllers;

use App\Models\PurchaseShipment;
use App\Models\Product;
use Carbon\Carbon;
use Illuminate\Http\Request;

class PurchaseShipmentController extends BaseController
{

    //-------------- show All PurchaseShipment -----------\\

    public function index(Request $request)
    {
        // //$this->authorizeForUser($request->user('api'), 'view', PurchaseShipment::class);
        // How many items do you want to display.
        //$this->authorizeForUser($request->user('api'), 'view', PurchaseShipment::class);
        $perPage = $request->limit;
        $pageStart = \Request::get('page', 1);
        // Start displaying items from this number;
        $offSet = ($pageStart * $perPage) - $perPage;
        $order = $request->SortField;
        $dir = $request->SortType;
        $data = array();

        $PurchaseShipment = PurchaseShipment::where('deleted_at', '=', null)

            // Search With Multiple Param
            ->where(function ($query) use ($request) {
                return $query->when($request->filled('search'), function ($query) use ($request) {
                    return $query->where('name', 'LIKE', "%{$request->search}%")
                        ->orWhere('description', 'LIKE', "%{$request->search}%");
                });
            });
        $totalRows = $PurchaseShipment->count();
        if ($perPage == "-1") {
            $perPage = $totalRows;
        }
        $PurchaseShipment = $PurchaseShipment->offset($offSet)
            ->limit($perPage)
            ->orderBy($order, $dir)
            ->get();

        foreach ($PurchaseShipment as $unit) {
            $unit_data['id'] = $unit->id;
            $unit_data['order_number'] = $unit->order_number;
            $unit_data['tracking_number'] = $unit->tracking_number;
            $unit_data['tracking_url'] = $unit->tracking_url;
            $unit_data['description'] = $unit->description;
            $unit_data['date'] = $unit->date;
            $unit_data['expected_arrival_at'] = $unit->expected_arrival_at;
            $unit_data['shipping_company_name'] = $unit->shipping_company_name;
            $unit_data['status'] = $unit->status;

            $data[] = $unit_data;
        }

        // $PurchaseShipment_base = PurchaseShipment::where('base_unit', null)
        //     ->where('deleted_at', null)
        //     ->orderBy('id', 'DESC')
        //     ->get(['id', 'name']);

        return response()->json([
            'Shipment' => $data,
            // 'PurchaseShipment_base' => $PurchaseShipment_base,
            'totalRows' => $totalRows,
        ]);
    }

    //-------------- STORE NEW UNIT -----------\\

    public function store(Request $request)
    {
        //$this->authorizeForUser($request->user('api'), 'create', PurchaseShipment::class);

        request()->validate([
            'order_number' => 'required|max:255|min:3',
            'description' => 'max:1000|nullable',
            // 'shipping_company_name' => 'required',
            'expected_arrival_at' => 'date|nullable',
            'date' => 'date|required',
            'status' => 'in:pending,completed,intransit,delivered,cancelled|nullable',
            'tracking_url' => 'url|nullable',
            // 'shipping_company_name' => 'required|numeric',
        ]);

        $date = $request->date;
        $shipping_company_name = $request->shipping_company_name?? 0;

        PurchaseShipment::create([
            'order_number' => $request['order_number'],
            'tracking_number' => $request['tracking_number'], // '1234567890
            'tracking_url' => $request['tracking_url']?? null,
            'description' => $request['description'],
            'date' => $date,
            'expected_arrival_at' => $request['expected_arrival_at'],
            'shipping_company_name' => $shipping_company_name,
            'status' => $request['status'] ?? 'pending',
        ]);

        return response()->json(['success' => true]);
    }

    //-------------- UPDATE UNIT -----------\\

    public function update(Request $request, $id)
    {
        //$this->authorizeForUser($request->user('api'), 'update', PurchaseShipment::class);

        request()->validate([
            'order_number' => 'required|max:255|min:3',
            'description' => 'max:1000|nullable',
            // 'shipping_company_name' => 'required',
            'expected_arrival_at' => 'date|nullable',
            'date' => 'date|required',
            // 'status' => 'in:pending,completed,expired,cancelled|nullable',
            'status' => 'in:pending,completed,intransit,delivered,cancelled|nullable',
            // 'shipping_company_name' => 'required|numeric',
        ]);


        $date = $request->date;
        $shipping_company_name = $request->shipping_company_name;
        $base_unit = $request['base_unit'];


        PurchaseShipment::whereId($id)->update([
            'order_number' => $request['order_number'],
            'tracking_number' => $request['tracking_number']?? null,
            'tracking_url' => $request['tracking_url']?? null,
            'description' => $request['description'],
            'date' => $date,
            'expected_arrival_at' => $request['expected_arrival_at'],
            'shipping_company_name' => $shipping_company_name,
            'status' => $request['status'] ?? 'pending',
        ]);

        return response()->json(['success' => true]);
    }

    //-------------- REMOVE UNIT -----------\\

    public function destroy(Request $request, $id)
    {
        //$this->authorizeForUser($request->user('api'), 'delete', PurchaseShipment::class);

        PurchaseShipment::whereId($id)->update([
            'deleted_at' => Carbon::now(),
        ]);

        return response()->json(['success' => true]);
    }

    //-------------- Get PurchaseShipment SubBase ------------------\\

    public function Get_PurchaseShipment_SubBase(request $request)
    {
        $units = PurchaseShipment::where('deleted_at', null)->where(function ($query) use ($request) {
            return $query->when($request->filled('id'), function ($query) use ($request) {
                return $query->where('id', $request->id)
                    ->orWhere('base_unit', $request->id);
            });
        })->get();

        return response()->json($units);
    }



    //-------------- Get Sales PurchaseShipment ------------------\\

    public function Get_sales_units(request $request)
    {

        $product_unit_id = Product::with('unit')->where(function ($query) use ($request) {
            return $query->when($request->filled('id'), function ($query) use ($request) {
                return $query->where('id', $request->id);
            });
        })->first();

        $units = PurchaseShipment::where('base_unit', $product_unit_id->unit_id)
            ->orWhere('id', $product_unit_id->unit_id)
            ->get();

        return response()->json($units);
    }
}
