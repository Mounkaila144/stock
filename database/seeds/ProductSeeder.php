<?php

namespace Database\Seeders;

use Illuminate\Support\Facades\DB;

use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {



        DB::transaction(function () {
            //
            // Insert some stuff


            DB::table('products')->updateOrInsert(

                ['id' => 1],
                [
                        'name' => 'Default_Service_product',
                        'type' => 'service',
                        'price' => 0,

                    ],

            );
        });
    }
}
