<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Schema;

class Acesso extends Model
{
    use HasFactory;

    protected $table = 'acessos';

    protected $fillable = [
        'nome_do_acesso',
        'status',
        'system_id',
        'acesso',
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
}
