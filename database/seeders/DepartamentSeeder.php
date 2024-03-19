<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Departament;

class DepartamentSeeder extends Seeder
{
    public function run()
    {
        Departament::firstOrCreate([
            'NomeDoSetor' => 'Engenharia',
            'DescricaoDepartamento' => '',
            'ComumEngenharia' => true,
            'Engenharia' => true,
            'AdministracaoRH' => false,
            'TI' => false,
            'ComumRembolso' => true,
            'GestorRembolso' => false,
            'ContabilidadeRembolso' => false,
            'AdministracaoRembolso' => false,

        ]);

        Departament::firstOrCreate([
            'NomeDoSetor' => 'Comum',
            'DescricaoDepartamento' => 'Departamento de teste de usuários comuns',
            'ComumEngenharia' => true,
            'Engenharia' => false,
            'AdministracaoRH' => false,
            'TI' => false,
            'ComumRembolso' => true,
            'GestorRembolso' => false,
            'ContabilidadeRembolso' => false,
            'AdministracaoRembolso' => false,

        ]);

        Departament::firstOrCreate([
            'NomeDoSetor' => 'RH',
            'DescricaoDepartamento' => 'Recursos Humanos',
            'ComumEngenharia' => false,
            'Engenharia' => false,
            'AdministracaoRH' => true,
            'TI' => false,
            'ComumRembolso' => false,
            'GestorRembolso' => false,
            'ContabilidadeRembolso' => false,
            'AdministracaoRembolso' => false,

        ]);

        Departament::firstOrCreate([
            'NomeDoSetor' => 'TI',
            'DescricaoDepartamento' => 'Tecnologia da Informação',
            'ComumEngenharia' => true,
            'Engenharia' => true,
            'AdministracaoRH' => true,
            'TI' => true,
            'ComumRembolso' => true,
            'GestorRembolso' => true,
            'ContabilidadeRembolso' => true,
            'AdministracaoRembolso' => true,

        ]);
    }
}
