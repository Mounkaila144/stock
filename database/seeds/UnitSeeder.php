<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class UnitSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Insert some stuff
        DB::table('units')->updateOrInsert(
            ['id' => 1],
            array(
                'ShortName' => 'Pics',
                'name'    => 'Pieces',
            )
        );
    }
}
