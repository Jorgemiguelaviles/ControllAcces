<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;

class UserController extends Controller
{
    public function usercontroll(Request $request)
    {
        $usuarios = User::all();
        return response()->json(['message' => $usuarios]);
    }
}
