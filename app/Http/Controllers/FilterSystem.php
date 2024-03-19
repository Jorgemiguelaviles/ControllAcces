<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\System;
use App\Models\Acesso;

class FilterSystem extends Controller
{
    public function filtersystem(Request $request)
    {
        // Validar a entrada do filtro
        $request->validate(['filter' => 'required']);

        // Obter o filtro do request
        $filter = $request->input('filter');



        // Filtrar sistemas com base no nome
        $sistemas = System::where('nome_do_sistema', 'LIKE', "%$filter%")->get();

        $access = Acesso::all();

        // Retornar os dados como JSON
        return response()->json(['message' => [$sistemas, $access]]);
    }
}
