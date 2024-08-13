<?php

use Database\Seeders\ProductSeeder;
use Illuminate\Database\Seeder;
use App\Models\Tenant;
use Database\Seeders\TodoSeeder;
use Database\Seeders\StockSeeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // Tableau des locataires avec leurs domaines respectifs
        $tenants = [
            ['id' => 'gestion', 'name' => 'gestion', 'domain' => 'gestion.nigerdev.com'],
            ['id' => 'kirikou', 'name' => 'kirikou', 'domain' => 'kirikou.nigerdev.com'],

        ];

        // Fonction pour exécuter les Seeders pour un locataire donné
        $runSeeders = function () {
            $this->call([
                ClientSeeder::class,
                CurrencySeeder::class,
                SettingSeeder::class,
                ServerSeeder::class,
                PermissionsSeeder::class,
                RoleSeeder::class,
                UserSeeder::class,
                UserRoleSeeder::class,
                PermissionRoleSeeder::class,
                Warehouse::class,
                UnitSeeder::class,
                TodoSeeder::class,
                StockSeeder::class,
                //ProductSeeder::class,
            ]);
        };

        // Boucle sur chaque locataire pour créer/mettre à jour et exécuter les seeders
        foreach ($tenants as $tenantData) {
            $tenant = Tenant::firstOrCreate(
                ['id' => $tenantData['id']],
                ['name' => $tenantData['name']]
            );

            if (!$tenant->domains()->where('domain', $tenantData['domain'])->exists()) {
                $tenant->domains()->create(['domain' => $tenantData['domain']]);
            }

            $tenant->run($runSeeders);
        }
    }
}
