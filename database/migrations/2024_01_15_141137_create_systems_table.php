<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSystemsTable extends Migration
{
    public function up()
    {
        Schema::create('systems', function (Blueprint $table) {
            $table->id();
            $table->string('nome_do_sistema');
            $table->text('descricao');
            $table->text('url')->default('http://162.240.102.146/');
            $table->text('imagens')->default('controllaccessextern\resources\js\assets\Armazenamentophotos\voto.png');
            $table->boolean('status')->default(true);
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('systems');
    }
}
