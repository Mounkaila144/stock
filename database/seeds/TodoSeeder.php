<?php

namespace Database\Seeders;

use Illuminate\Support\Facades\DB;

use Illuminate\Database\Seeder;

class TodoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Permissions à insérer ou mettre à jour
        $permissions = [
            ['id' => 137, 'name' => 'todo_task_view'],
            ['id' => 138, 'name' => 'todo_task_add'],
            ['id' => 139, 'name' => 'todo_task_update'],
            ['id' => 140, 'name' => 'todo_task_delete'],
        ];

        // Insertion ou mise à jour des permissions
        foreach ($permissions as $permission) {
            DB::table('permissions')->updateOrInsert(
                ['id' => $permission['id']], // Critère de recherche
                ['name' => $permission['name']] // Valeurs à insérer ou mettre à jour
            );
        }

        // Permissions de rôle à insérer ou mettre à jour
        $permissionRoles = [
            ['id' => 137, 'permission_id' => 137, 'role_id' => 1], // todo_task_view pour OWNER
            ['id' => 138, 'permission_id' => 138, 'role_id' => 1], // todo_task_add pour OWNER
            ['id' => 139, 'permission_id' => 139, 'role_id' => 1], // todo_task_update pour OWNER
            ['id' => 140, 'permission_id' => 140, 'role_id' => 1], // todo_task_delete pour OWNER
        ];

        // Insertion ou mise à jour des permissions de rôle
        foreach ($permissionRoles as $permissionRole) {
            DB::table('permission_role')->updateOrInsert(
                ['id' => $permissionRole['id']], // Critère de recherche
                [
                    'permission_id' => $permissionRole['permission_id'],
                    'role_id'       => $permissionRole['role_id']
                ] // Valeurs à insérer ou mettre à jour
            );
        }
    }
}
