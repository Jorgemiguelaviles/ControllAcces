<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Schema;

class User extends Model
{
    protected $table = 'users';
    protected $fillable = [
        'Nome',
        'Chapa',
        'Horario_do_almoço',
        'Departamento',
        'Gestor',
        'CPF',
        'rotaDaFoto',
        'Usuario',
        'Senha',
        'ComumEngenharia',
        'Engenharia',
        'AdministracaoRH',
        'TI',
        'ComumRembolso',
        'GestorRembolso',
        'ContabilidadeRembolso',
        'AdministracaoRembolso',
        'id_departamento',
        'GestorCheck',
        'Email',
        'status',
        // Adicione outras colunas conforme necessário
    ];

    // Método para obter colunas dinamicamente
    public static function getDynamicColumns()
    {
        $table = new self();

        // Obtém as colunas da tabela
        $columns = Schema::getColumnListing($table->getTable());

        // Remove colunas padrão do Eloquent
        $defaultColumns = ['id', 'created_at', 'updated_at'];
        $dynamicColumns = array_diff($columns, $defaultColumns);

        return $dynamicColumns;
    }

    // Sobrescreva o método toArray para incluir colunas dinâmicas
    public function toArray()
    {
        $array = parent::toArray();

        // Adicione colunas dinâmicas ao array
        foreach (self::getDynamicColumns() as $column) {
            $array[$column] = $this->$column;
        }

        return $array;
    }

    public function departamento()
    {
        return $this->belongsTo(Departament::class, 'id_departamento');
    }
}
