<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class Departaments extends Migration
{
    public function up()
    {
        Schema::create('departaments', function (Blueprint $table) {
            $table->id();
            $table->string('NomeDoSetor');
            $table->text('DescricaoDepartamento')->nullable();
            $table->boolean('status')->default(true);
            $table->boolean('ComumEngenharia')->default(false);
            $table->boolean('Engenharia')->default(false);
            $table->boolean('AdministracaoRH')->default(false);
            $table->boolean('ComumRembolso')->default(false);
            $table->boolean('GestorRembolso')->default(false);
            $table->boolean('ContabilidadeRembolso')->default(false);
            $table->boolean('AdministracaoRembolso')->default(false);
            $table->boolean('TI')->default(false);
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('departaments');
    }
}
