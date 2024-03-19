<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class Users extends Migration
{
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('Nome');
            $table->string('Chapa');
            $table->time('Horario_do_almoço');
            $table->string('Departamento');
            $table->string('Gestor')->nullable();
            $table->string('CPF')->nullable();
            $table->string('rotaDaFoto')->nullable();
            $table->string('Usuario')->nullable();
            $table->string('Senha')->nullable();
            $table->string('Email')->nullable();
            $table->boolean('status')->default(true);
            $table->boolean('GestorCheck')->default(false);
            $table->boolean('ComumEngenharia')->default(false);
            $table->boolean('Engenharia')->default(false);
            $table->boolean('AdministracaoRH')->default(false);
            $table->boolean('TI')->default(false);
            $table->boolean('ComumRembolso')->default(false);
            $table->boolean('GestorRembolso')->default(false);
            $table->boolean('ContabilidadeRembolso')->default(false);
            $table->boolean('AdministracaoRembolso')->default(false);
            $table->unsignedBigInteger('id_departamento');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('users');
    }
}
