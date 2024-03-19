<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\Validator;

class EditUserController extends Controller
{
    public function editusercontroller(Request $request)
    {
        function formatString($string)
        {
            // Remove caracteres especiais
            $string = preg_replace('/[^a-zA-Z0-9_]/', '', $string);

            // Remove espaços
            $string = str_replace(' ', '', $string);

            return $string;
        }

        // Função para combinar e formatar strings
        function combineAndFormatStrings($string1, $string2)
        {
            $formattedString1 = formatString($string1);
            $formattedString2 = formatString($string2);

            // Junte as strings
            $combinedString = $formattedString1 . $formattedString2;

            return $combinedString;
        }

        try {
            $status = $request->input('status');
            $initstatus = $request->input('initstatus');
            $isGestor = $request->input('isGestor');
            $isGestorInit = $request->input('isGestorInit');




            if ($status !== $initstatus || $isGestor  !== $isGestorInit) {
                $validator = Validator::make($request->all(), [
                    'nome' => 'required', // Nome obrigatório
                    'chapa' => 'required', // Chapa obrigatória
                    'horarioDoAlmoco' => 'required', // Horário do almoço obrigatório
                    'grupo' => 'required', // Grupo obrigatório
                    'gestorResponsavel' => 'required', // Gestor responsável obrigatório
                    'CPF' => 'nullable', // CPF opcional
                    'usuario' => 'nullable', // Usuário opcional
                    'senha' => 'nullable', // Senha opcional
                    // Adicione outras validações conforme necessário
                ]);

                if ($validator->fails()) {
                    return response()->json(['error' => $validator->errors()], 422);
                }
            }



            $database = $request->input('database');
            $idEdit = $database['3']['id'];
            $system = User::find($idEdit);
            if (!$system) {
                return response()->json(['message' => 'Sistema não encontrado.'], 404);
            }

            // Obter dados do request
            $nome = $request->input('nome');
            $chapa = $request->input('chapa');
            $horarioDoAlmoco = $request->input('horarioDoAlmoco');
            $grupo = $request->input('grupo');
            $gestorResponsavel = $request->input('gestorResponsavel');
            $CPF = $request->input('CPF');
            $usuario = $request->input('usuario');
            $senha = $request->input('senha');
            $name = $request->input('tipo');
            $listSecondary = $request->input('listSecondary');
            $systemStatusSecondary = $request->input('systemStatusSecondary');

            /*return response()->json([
                'message' =>  [
                    '1' => $database['1']['1']['acesso'],
                    '2' => $systemStatusSecondary['2']
                ]

            ]);*/



            $email = $request->input('email');

            $all = $request->all('');

            if (is_null($isGestor)) {
                $isGestor = false;
            }



            foreach ($database['2']['message'] as $item) {
                if ($item['NomeDoSetor'] ===  $grupo) {
                    $id_departament = $item['id'];
                    break;
                }
            }


            //return response()->json(['message' =>  $senha]);




            $system->Nome = $nome;
            $system->Chapa = $chapa;
            $system->Horario_do_almoço = $horarioDoAlmoco;
            $system->Departamento = $grupo;
            $system->Gestor = $gestorResponsavel;
            $system->CPF = $CPF;
            $system->Usuario = $usuario;
            $system->GestorCheck = $isGestor;
            $system->Email = $email;
            $system->status = $status;


            // Verifica se a senha não está vazia antes de atribuí-la
            if (isset($senha) && $senha !== '') {
                $system->Senha = password_hash($senha, PASSWORD_DEFAULT);
            }


            $system->rotaDaFoto = isset($name) ? "js/assets/Armazenamentophotos/{$name}" : null;

            $system->save();


            $fotoBase64 = $request->input('photo');
            if ($fotoBase64) {
                // Converta a foto de base64 para o formato de arquivo de imagem
                list($type, $fotoBase64) = explode(';', $fotoBase64);
                list(, $fotoBase64) = explode(',', $fotoBase64);
                $foto = base64_decode($fotoBase64);

                // Caminho para o diretório onde as fotos serão armazenadas
                $diretorioFotos = 'js/assets/Armazenamentophotos/';

                // Verifique se o diretório de fotos existe, caso contrário, crie-o
                if (!file_exists($diretorioFotos) && !is_dir($diretorioFotos)) {
                    if (!mkdir($diretorioFotos, 0777, true)) {
                        // Se a criação do diretório falhar, trate o erro
                        throw new \Exception('Falha ao criar o diretório de destino');
                    }
                }

                // Gere um nome único para a foto
                $nomeFoto = uniqid() . '.png'; // ou qualquer extensão de imagem que você esteja usando

                // Salve a foto no diretório de fotos
                file_put_contents($diretorioFotos . $nomeFoto, $foto);

                // Atualize o campo 'rotaDaFoto' no banco de dados com o caminho da foto
                $system->rotaDaFoto = $diretorioFotos . $nomeFoto;

                // Salvar o modelo no banco de dados com o caminho da foto
                $system->save();
            }

            $count = count($database['1']);
            $listi = [];

            for ($i = 0; $i < $count; $i++) {
                $system->{$database['1'][$i]['acesso']} = $systemStatusSecondary[$i + 1];
            }

            $system->save();

            return response()->json(['message' =>  'Usuário atualizdo com sucesso']);
        } catch (\Exception $e) {
            // Captura qualquer outra exceção e retorna uma resposta de erro
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}
