<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Departament;

class FilterGroup extends Controller
{
    public function filtergroup(Request $request)
    {
        $request->validate(['filter' => 'required']);

        $filter = $request->input('filter');
        $sistemas = Departament::where('NomeDoSetor', 'LIKE', "%$filter%")->get();



        return response()->json(['message' =>  $sistemas]);
    }
}
