<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CurrencySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
       	// Insert some stuff
        DB::table('currencies')->updateOrInsert(
            ['id' => 1], // Critère de recherche basé sur l'ID
            array(
                'code'   => 'USD',
                'name'   => 'US Dollar',
                'symbol' => '$',
            )

        );
    }
}
