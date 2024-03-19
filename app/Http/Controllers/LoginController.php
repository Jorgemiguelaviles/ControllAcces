<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Http;


class LoginController extends Controller
{
    public function validarLogin(Request $request)
    {
        // Extrair dados da requisição
        $requestData = $request->all();
        $email = $requestData['email'];
        $password = $requestData['password'];
	$recaptchaResponse = $requestData['g-recaptcha-response'];
 	

	




	$recaptchaSecretKey = '6LdKZokpAAAAAEb9pjmCuXR64o5hzHpPnxjnVJKi';
        $recaptchaVerifyResponse = Http::asForm()->post('https://www.google.com/recaptcha/api/siteverify', [
            'secret' => $recaptchaSecretKey,
            'response' => $recaptchaResponse,
        ]);


	if (!$recaptchaVerifyResponse['success']) {
            return response()->json(['status' => false, 'message' => 'Falha na verifica��o do reCAPTCHA', 'data' => null]);
        }

        if (!$email || !$password) {
            return response()->json(['status' => false, 'message' => 'Email e senha precisam estar preenchidos', 'data' => null]);
        }

        // Consultar o banco de dados para encontrar o usuário pelo campo 'Usuario'
        $usuario = User::whereRaw('BINARY Usuario = ?', [$email])->first();
       

        if (!$usuario) {
            return response()->json(['status' => false, 'message' => 'Usuário ou senha incorretos', 'data' => null]);
        }

        // Verificar se a senha fornecida corresponde à senha hasheada no banco de dados
        if (password_verify($password, $usuario->Senha)) {
            return response()->json(['status' => true, 'message' => 'Login bem-sucedido', 'data' => $usuario]);
        } else {
            return response()->json(['status' => false, 'message' => 'Usuário ou senha incorretos', 'data' => null]);
        }
    }
}
