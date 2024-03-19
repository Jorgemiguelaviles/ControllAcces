<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\User;
use Illuminate\Support\Facades\Schema;

class Departament extends Model
{
    protected $table = 'departaments';
    protected $primaryKey = 'id';
    protected $fillable = [
        'NomeDoSetor',
        'DescricaoDepartamento',
        'status',
        'ComumEngenharia',
        'Engenharia',
        'AdministracaoRH',
        'ComumRembolso',
        'GestorRembolso',
        'ContabilidadeRembolso',
        'AdministracaoRembolso',
        'TI',
    ];

    public function users()
    {
        return $this->hasMany(User::class, 'id_departamento');
    }

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
}
