<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\System;

class SystemSeeder extends Seeder
{



    public function run()
    {
        System::firstOrCreate([
            'nome_do_sistema' => 'Engenharia',
            'descricao' => 'Sistema de engenharia da alpina',
            'imagens' => 'http://162.240.102.146/imgs/Engenharia.jpg',
            'url' => 'http://162.240.102.146/sistemaengenharia/',
        ]);

        System::firstOrCreate([
            'nome_do_sistema' => 'Ouvidoria',
            'descricao' => 'Sistema de Ouvidoria',
            'imagens' => 'http://162.240.102.146/imgs/Ouvidoria.jpeg',
            'url' => 'http://162.240.102.146/Ouvidoria/index.php',
        ]);

        System::firstOrCreate([
            'nome_do_sistema' => 'TITOOLS',
            'descricao' => 'Sistema de ferramentas do TI',
            'imagens' => 'http://162.240.102.146/imgs/TI.jpg',
            'url' => 'http://162.240.102.146:5174/',
        ]);

        System::firstOrCreate([
            'nome_do_sistema' => 'Reembolso',
            'descricao' => 'Sistema de Reembolso',
            'imagens' => 'http://162.240.102.146/imgs/Reembolso.jpg',
        ]);
    }
}
