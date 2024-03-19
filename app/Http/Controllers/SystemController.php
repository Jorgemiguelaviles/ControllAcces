<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\System;
use App\Models\Acesso;
class SystemController extends Controller
{
    public function systemcontroll(Request $request)
    {
        $system = System::all();
        $access = Acesso::all();
        return response()->json(['message' => [$system,$access]]);
    }
}
