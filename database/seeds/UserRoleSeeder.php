<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class UserRoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Insert some stuff
        DB::table('role_user')->updateOrInsert(
            ['id' => 1],
            array(
                'user_id' => 1,
                'role_id' => 1,
            )
        );
    }
}
