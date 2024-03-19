<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;


class UserSeeder extends Seeder
{
    public function run()
    {
        // Usuário para o departamento de Engenharia
        User::firstOrCreate([
            'Nome' => 'Ronaldo',
            'Chapa' => '0000000',
            'Horario_do_almoço' => '13:00:00',
            'Departamento' => 'Engenharia',
            'Gestor' => 'Antonio',
            'CPF' => '00000000000',
            'rotaDaFoto' => '',
            'Usuario' => 'RONALDO',
            'Senha' => '$2y$10$79QpDxCGqMrT3bEMjBGcLOvbi3yRMtazMOLoAezLH8A1l8S62Zlv.',
            'GestorCheck' => false,
            'ComumEngenharia' => true,
            'Engenharia' => true,
            'AdministracaoRH' => false,
            'TI' => false,
            'ComumRembolso' => false,
            'GestorRembolso' => false,
            'ContabilidadeRembolso' => false,
            'AdministracaoRembolso' => false,
            'id_departamento' => 1,
        ]);

        // Usuário para o departamento Comum
        User::firstOrCreate([
            'Nome' => 'Comum',
            'Chapa' => '0000000',
            'Horario_do_almoço' => '13:00:00',
            'Departamento' => 'Comum',
            'Gestor' => 'Comum',
            'CPF' => '00000000000',
            'rotaDaFoto' => '',
            'Usuario' => 'comum',
            'Senha' => '$2y$10$H9RZA3Z8vZYcnh2Bifm6ReMXhrUizOVszG/4Istk2ZCZxxed64',
            'GestorCheck' => true,
            'ComumEngenharia' => true,
            'Engenharia' => false,
            'AdministracaoRH' => false,
            'TI' => false,
            'ComumRembolso' => true,
            'GestorRembolso' => false,
            'ContabilidadeRembolso' => false,
            'AdministracaoRembolso' => false,
            'id_departamento' => 2,
        ]);

        // Usuário para o departamento de TI
        User::firstOrCreate([
            'Nome' => 'Jorge',
            'Chapa' => '16847',
            'Horario_do_almoço' => '13:00:00',
            'Departamento' => 'TI',
            'Gestor' => 'Eduardo',
            'CPF' => '41488366861',
            'rotaDaFoto' => '',
            'Usuario' => 'suporte',
            'Senha' => '$2y$10$60jnCOEbAkYR41uZU40WmujqWNc6A4HRbkRefjO6bl.syIDLoUY7i',
            'GestorCheck' => true,
            'ComumEngenharia' => true,
            'Engenharia' => true,
            'AdministracaoRH' => true,
            'TI' => true,
            'ComumRembolso' => true,
            'GestorRembolso' => true,
            'ContabilidadeRembolso' => true,
            'AdministracaoRembolso' => true,
            'id_departamento' => 4,
        ]);

        User::firstOrCreate([
            'Nome' => 'Eduardo',
            'Chapa' => '00000',
            'Horario_do_almoço' => '13:00:00',
            'Departamento' => 'TI',
            'Gestor' => '',
            'CPF' => '00000000000',
            'rotaDaFoto' => '',
            'Usuario' => 'suporte1',
            'Senha' => '$2y$10$60jnCOEbAkYR41uZU40WmujqWNc6A4HRbkRefjO6bl.syIDLoUY7i',
            'GestorCheck' => true,
            'ComumEngenharia' => true,
            'Engenharia' => true,
            'AdministracaoRH' => true,
            'TI' => true,
            'ComumRembolso' => true,
            'GestorRembolso' => true,
            'ContabilidadeRembolso' => true,
            'AdministracaoRembolso' => true,
            'id_departamento' => 4,
        ]);

        User::firstOrCreate([
            'Nome' => 'Antonio',
            'Chapa' => '00000',
            'Horario_do_almoço' => '13:00:00',
            'Departamento' => 'Engenharia',
            'Gestor' => '',
            'CPF' => '00000000000',
            'rotaDaFoto' => '',
            'Usuario' => 'antonio',
            'Senha' => '$2y$10$79QpDxCGqMrT3bEMjBGcLOvbi3yRMtazMOLoAezLH8A1l8S62Zlv.',
            'GestorCheck' => true,
            'ComumEngenharia' => true,
            'Engenharia' => true,
            'AdministracaoRH' => false,
            'TI' => false,
            'ComumRembolso' => true,
            'GestorRembolso' => true,
            'ContabilidadeRembolso' => false,
            'AdministracaoRembolso' => false,
            'id_departamento' => 1,
        ]);

        // Adicione outros usuários conforme necessário
    }
}
