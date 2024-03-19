<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAcessosTable extends Migration
{
    public function up()
    {
        Schema::create('acessos', function (Blueprint $table) {
            $table->id();
            $table->string('nome_do_acesso');
            $table->boolean('status')->default(true);
            $table->unsignedBigInteger('system_id');
            $table->timestamps();
            $table->string('acesso');
            $table->foreign('system_id')->references('id')->on('systems');
        });

        Schema::create('system_acesso', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('acesso_id');
            $table->foreign('acesso_id')->references('id')->on('acessos');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('system_acesso');
        Schema::dropIfExists('acessos');
    }
}
