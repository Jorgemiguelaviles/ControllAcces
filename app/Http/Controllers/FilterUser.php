<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;


class FilterUser extends Controller
{
    public function filteruser(Request $request)
    {
        $request->validate(['filter' => 'required']);
        $filter = $request->input('filter');

        $user = User::where('Nome', 'LIKE', "%$filter%")->get();
        return response()->json(['message' =>  $user]);
    }
}
