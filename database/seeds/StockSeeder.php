<?php

namespace Database\Seeders;

use Illuminate\Support\Facades\DB;

use Illuminate\Database\Seeder;

class StockSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::transaction(function () {

            // Insertion ou mise à jour des rôles
            DB::table("roles")->updateOrInsert(
                ['id' => 2], // Critère de recherche
                [
                    'name'  => 'Warehouse_Stock_Updater',
                    'label' => 'Warehouse Stock Updater',
                    'status' => 1,
                    'description' => 'A user with this role can update the stock of the warehouse especially after they use items from it.',
                ]
            );

            // Permissions à insérer ou mettre à jour
            $permissions = [
                ['id' => 141, 'name' => 'stock_view'],
                ['id' => 142, 'name' => 'stock_update'],
            ];

            foreach ($permissions as $permission) {
                DB::table('permissions')->updateOrInsert(
                    ['id' => $permission['id']], // Critère de recherche
                    ['name' => $permission['name']] // Valeurs à insérer ou mettre à jour
                );
            }

            // Permissions de rôle à insérer ou mettre à jour
            $permissionRoles = [
                ['id' => 143, 'permission_id' => 11, 'role_id' => 2], // Products_view pour STOCK_UPDATER
                ['id' => 146, 'permission_id' => 141, 'role_id' => 1], // stock_view pour OWNER
                ['id' => 147, 'permission_id' => 142, 'role_id' => 1], // stock_update pour OWNER
                ['id' => 148, 'permission_id' => 141, 'role_id' => 2], // stock_view pour STOCK_UPDATER
                ['id' => 149, 'permission_id' => 142, 'role_id' => 2], // stock_update pour STOCK_UPDATER
            ];

            foreach ($permissionRoles as $permissionRole) {
                DB::table('permission_role')->updateOrInsert(
                    ['id' => $permissionRole['id']], // Critère de recherche
                    [
                        'permission_id' => $permissionRole['permission_id'],
                        'role_id'       => $permissionRole['role_id']
                    ] // Valeurs à insérer ou mettre à jour
                );
            }
        });
    }
}
