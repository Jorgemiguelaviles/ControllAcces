<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\SystemController;
use App\Http\Controllers\GroupController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\CreateSystemController;
use App\Http\Controllers\EditSystemController;
use App\Http\Controllers\CreateGroupController;
use App\Http\Controllers\EditGroupController;
use App\Http\Controllers\CreateUserController;
use App\Http\Controllers\EditUserController;
use App\Http\Controllers\LoginController;

use App\Http\Controllers\FilterGroup;
use App\Http\Controllers\FilterSystem;
use App\Http\Controllers\FilterUser;

/*Rotas frontend*/

Route::get('/obter-token-csrf', function () {
    $token = csrf_token();

    return response()->json(['token' => $token]);
});

/*Vizualizar sistema/grupo/usuário*/
Route::get('/getGrupo', [GroupController::class, 'groupControl']);
Route::get('/getSistemas', [SystemController::class, 'systemcontroll']);
Route::get('/getUsuario', [UserController::class, 'usercontroll']);



/*Rendenizar react*/
Route::get('/{page}', function () {
    return Inertia::render('app');
})->where('page', '.*');



/*Rotas backend*/

/*Validar sistema de login*/
Route::post('/api/validalogin', [LoginController::class, 'validarLogin']);



/*Criar sistema/grupo/usuário*/
Route::post('/CreateSystem', [CreateSystemController::class, 'createsystemcontroller']);
Route::post('/CreateGroup', [CreateGroupController::class, 'creategroupcontroller']);
Route::post('/CreateUser', [CreateUserController::class, 'createusercontroller']);


/*Editar sistema/grupo/usuário*/
Route::post('/EditSystem', [EditSystemController::class, 'editsystemcontroller']);
Route::post('/EditeGroup', [EditGroupController::class, 'editgroupcontroller']);
Route::post('/EditeUser', [EditUserController::class, 'editusercontroller']);


/*Filtrar sistema/grupo/usuário*/
Route::post('/filterGroup', [FilterGroup::class, 'filtergroup']);
Route::post('/filterSystem', [FilterSystem::class, 'filtersystem']);
Route::post('/filterUser', [FilterUser::class, 'filteruser']);
