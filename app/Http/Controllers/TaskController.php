<?php

namespace App\Http\Controllers;

use App\Models\Task;
use App\Models\Product;
use Carbon\Carbon;
use Illuminate\Http\Request;

class TaskController extends BaseController
{

    //-------------- show All Task -----------\\

    public function index(Request $request)
    {
        // //$this->authorizeForUser($request->user('api'), 'view', Task::class);
        // How many items do you want to display.
        //$this->authorizeForUser($request->user('api'), 'view', Task::class);
        $perPage = $request->limit;
        $pageStart = \Request::get('page', 1);
        // Start displaying items from this number;
        $offSet = ($pageStart * $perPage) - $perPage;
        $order = $request->SortField;
        $dir = $request->SortType;
        $data = array();

        $Task = Task::where('deleted_at', '=', null)

            // Search With Multiple Param
            ->where(function ($query) use ($request) {
                return $query->when($request->filled('search'), function ($query) use ($request) {
                    return $query->where('name', 'LIKE', "%{$request->search}%")
                        ->orWhere('description', 'LIKE', "%{$request->search}%");
                });
            });
        $totalRows = $Task->count();
        if ($perPage == "-1") {
            $perPage = $totalRows;
        }
        $Task = $Task->offset($offSet)
            ->limit($perPage)
            ->orderBy($order, $dir)
            ->get();

        foreach ($Task as $unit) {
            $unit_data['id'] = $unit->id;
            $unit_data['title'] = $unit->title;
            $unit_data['description'] = $unit->description;
            $unit_data['remind_at'] = $unit->remind_at;
            $unit_data['expire_at'] = $unit->expire_at;
            $unit_data['priority'] = $unit->priority;
            $unit_data['status'] = $unit->status;

            $data[] = $unit_data;
        }

        // $Task_base = Task::where('base_unit', null)
        //     ->where('deleted_at', null)
        //     ->orderBy('id', 'DESC')
        //     ->get(['id', 'name']);

        return response()->json([
            'Task' => $data,
            // 'Task_base' => $Task_base,
            'totalRows' => $totalRows,
        ]);
    }

    //-------------- STORE NEW UNIT -----------\\

    public function store(Request $request)
    {
        //$this->authorizeForUser($request->user('api'), 'create', Task::class);

        request()->validate([
            'title' => 'required|max:255|min:3',
            'description' => 'max:1000|nullable',
            // 'priority' => 'required',
            'expire_at' => 'required|date',
            'remind_at' => 'date|nullable',
            'status' => 'in:pending,completed,expired,cancelled|nullable',
            'priority' => 'required|numeric',
        ]);

        $remind_at = $request->remind_at;
        $priority = $request->priority?? 0;

        Task::create([
            'title' => $request['title'],
            'description' => $request['description'],
            'remind_at' => $remind_at,
            'expire_at' => $request['expire_at'],
            'priority' => $priority,
            'status' => $request['status'] ?? 'pending',
        ]);

        return response()->json(['success' => true]);
    }

    //-------------- UPDATE UNIT -----------\\

    public function update(Request $request, $id)
    {
        //$this->authorizeForUser($request->user('api'), 'update', Task::class);

        request()->validate([
            'title' => 'required|max:255|min:3',
            'description' => 'max:1000|nullable',
            // 'priority' => 'required',
            'expire_at' => 'required|date',
            'remind_at' => 'date|nullable',
            'status' => 'in:pending,completed,expired,cancelled|nullable',
            'priority' => 'required|numeric',
        ]);


        $remind_at = $request->remind_at;
        $priority = $request->priority;
        $base_unit = $request['base_unit'];


        Task::whereId($id)->update([
            'title' => $request['title'],
            'description' => $request['description'],
            'remind_at' => $remind_at,
            'expire_at' => $request['expire_at'],
            'priority' => $priority,
            'status' => $request['status'] ?? 'pending',
        ]);

        return response()->json(['success' => true]);
    }

    //-------------- REMOVE UNIT -----------\\

    public function destroy(Request $request, $id)
    {
        //$this->authorizeForUser($request->user('api'), 'delete', Task::class);

        Task::whereId($id)->update([
            'deleted_at' => Carbon::now(),
        ]);

        return response()->json(['success' => true]);
    }

    //-------------- Get Task SubBase ------------------\\

    public function Get_Task_SubBase(request $request)
    {
        $units = Task::where('deleted_at', null)->where(function ($query) use ($request) {
            return $query->when($request->filled('id'), function ($query) use ($request) {
                return $query->where('id', $request->id)
                    ->orWhere('base_unit', $request->id);
            });
        })->get();

        return response()->json($units);
    }



    //-------------- Get Sales Task ------------------\\

    public function Get_sales_units(request $request)
    {

        $product_unit_id = Product::with('unit')->where(function ($query) use ($request) {
            return $query->when($request->filled('id'), function ($query) use ($request) {
                return $query->where('id', $request->id);
            });
        })->first();

        $units = Task::where('base_unit', $product_unit_id->unit_id)
            ->orWhere('id', $product_unit_id->unit_id)
            ->get();

        return response()->json($units);
    }
}
