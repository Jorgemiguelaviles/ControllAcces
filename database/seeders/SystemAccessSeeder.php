<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Acesso;
use App\Models\System;

class SystemAccessSeeder extends Seeder
{
    public function run()
    {
        $engenhariaSystem = System::where('nome_do_sistema', 'Engenharia')->first();
        $ouvidoriaSystem = System::where('nome_do_sistema', 'Ouvidoria')->first();
        $tiToolsSystem = System::where('nome_do_sistema', 'TITOOLS')->first();
        $reembolsoSystem = System::where('nome_do_sistema', 'Reembolso')->first();

        Acesso::firstOrCreate([
            'nome_do_acesso' => 'Comum Engenharia',
            'system_id' => $engenhariaSystem->id,
            'acesso' => 'ComumEngenharia'
        ]);

        Acesso::firstOrCreate([
            'nome_do_acesso' => 'engenharia',
            'system_id' => $engenhariaSystem->id,
            'acesso' => 'Engenharia'
        ]);

        Acesso::firstOrCreate([
            'nome_do_acesso' => 'Administração RH',
            'system_id' => $ouvidoriaSystem->id,
            'acesso' => 'AdministracaoRH'
        ]);

        Acesso::firstOrCreate([
            'nome_do_acesso' => 'TI',
            'system_id' => $tiToolsSystem->id,
            'acesso' => 'TI'
        ]);

        Acesso::firstOrCreate([
            'nome_do_acesso' => 'Comum reembolso',
            'system_id' => $reembolsoSystem->id,
            'acesso' => 'ComumRembolso'
        ]);

        Acesso::firstOrCreate([
            'nome_do_acesso' => 'Gestor reembolso',
            'system_id' => $reembolsoSystem->id,
            'acesso' => 'GestorRembolso'
        ]);

        Acesso::firstOrCreate([
            'nome_do_acesso' => 'Contabilidade',
            'system_id' => $reembolsoSystem->id,
            'acesso' => 'ContabilidadeRembolso'
        ]);

        Acesso::firstOrCreate([
            'nome_do_acesso' => 'Administração',
            'system_id' => $reembolsoSystem->id,
            'acesso' => 'AdministracaoRembolso'
        ]);
    }
}
