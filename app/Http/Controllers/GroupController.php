<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Departament;

class GroupController extends Controller
{
    public function groupControl(Request $request)
    {
        $departament = Departament::all();
        return response()->json(['message' => $departament]);
    }
}
