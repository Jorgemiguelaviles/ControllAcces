<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run()
    {
        // Chame suas seeders aqui
        $this->call(UserSeeder::class);
        $this->call(DepartamentSeeder::class);
        $this->call(SystemSeeder::class);
        $this->call(SystemAccessSeeder::class);
    }
}
