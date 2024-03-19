<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\System;
use App\Models\Acesso;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;

class EditSystemController extends Controller
{
    public function editsystemcontroller(Request $request)
    {


        function formatString($string)
        {
            // Remove caracteres especiais
            $string = preg_replace('/[^a-zA-Z0-9_]/', '', $string);

            // Remove espaços
            $string = str_replace(' ', '', $string);

            return $string;
        }

        function combineAndFormatStrings($string1, $string2)
        {
            $formattedString1 = formatString($string1);
            $formattedString2 = formatString($string2);

            // Junte as strings
            $combinedString = $formattedString1 . $formattedString2;

            return $combinedString;
        }

        try {

            $mensagens = [
                'required' => 'O campo :attribute é obrigatório.',
                'unique' => 'O campo :attribute já está em uso.',
                'array' => 'O campo :attribute deve ser um array.',
                'tiposDeAcesso.required' => 'É necessário pelo menos um tipo de acesso.',
                'tiposDeAcesso.*.required' => 'Todos os tipos de acesso são obrigatórios.',
                'tiposDeAcesso.*.unique' => 'Já existe um tipo de acesso com o mesmo nome para este sistema.',
                // Adicione mais mensagens conforme necessário
            ];

            $request->validate([
                'nomeDoSistema' => 'required',
                'descricaoDoSistema' => 'nullable',
                'imagem' => 'required',
                'tiposDeAcesso' => 'required',

            ], $mensagens);



            $tiposDeAcesso = $request->input('tiposDeAcesso');
            $tiposDeAcesso = explode(",", $tiposDeAcesso);


            foreach ($tiposDeAcesso as $tipoDeAcesso) {
                Validator::make(['tiposDeAcesso' => $tipoDeAcesso], [
                    'tiposDeAcesso' => 'required',
                ])->validate();
            }



            // Obtém todos os dados do sistema do request
            $all = $request->all();





            // Retorna a resposta JSON com todos os dados do sistema
            $nomeDoSistema = $request->input('nomeDoSistema') ?? '';
            $descricaoDoSistema = $request->input('descricaoDoSistema') ?? '';
            $StatusDoSistema = $request->input('StatusDoSistema') ?? '';
            $url = $request->input('url') ?? '';



            $imagemOrigem = $request->input('imagemOrigen') ?? '';
            $imagem = isset($_FILES['imagem']) && is_uploaded_file($_FILES['imagem']['tmp_name']) ? $_FILES['imagem'] : null;
           
            //$tiposDeAcesso = $request->input('tiposDeAcesso') ?? '';


            //verifica se o arquivo foi modificado

            $idSystem = $request->input('idSystem');




            $system = System::find($idSystem);
            if (!$system) {
                return response()->json(['message' => 'Sistema não encontrado.'], 404);
            }

            $system->nome_do_sistema = $nomeDoSistema;
            $system->descricao = $descricaoDoSistema;




            // Verifica se $StatusDoSistema não é null antes de atualizar
            if ($StatusDoSistema !== null) {

                if ($StatusDoSistema === 'true') {
                    $system->status = true;
                } else if ($StatusDoSistema === 'false') {
                    $system->status = false;
                }
            }

            $system->url = $url;












            // Verifica se a variável $imagem é uma imagem
            if ($imagem != null) {

                $filePathImages = '/var/www/html/imgs/' . basename($imagemOrigem);

                if (File::exists($filePathImages)) {


                    // Exclui o arquivo
                    File::delete($filePathImages);
                    $tmp_name_imagem = $imagem['tmp_name'];
                    $diretorio_imagem = '/var/www/html/imgs/';
                    $rota_banco_image = 'http://162.240.102.146/imgs/';
                    $name_image = date('YmdHis') . '_' . uniqid() . '_' . rand(1000, 9999) . '.' . pathinfo($imagem['name'], PATHINFO_EXTENSION);
                    $caminho_destino_imagem =  $diretorio_imagem . $name_image;
                    $caminho_destino_imagem_data = $rota_banco_image . $name_image;
                    move_uploaded_file($tmp_name_imagem, $caminho_destino_imagem);
                    $system->imagens = $caminho_destino_imagem_data;
                } else {
                    return response()->json(['message' =>  "O arquivo não existe"], 200);
                }
            }


            $system->save();






            $idAccess = $request->input('idAccess');
            $idAccess = explode(',', $idAccess);

            $statusacesso = $request->input('active');
            $statusacesso = explode(',', $statusacesso);


            $acessos = $request->input('tiposDeAcesso');
            $acessos = explode(',', $acessos);

            $comprimentoAcesso = count($statusacesso);


            for ($i = 0; $i < $comprimentoAcesso; $i++) {
                // Formatação do nome do acesso

                // Retorna uma resposta JSON com o nome do acesso formatado

                // O código abaixo foi movido para fora do loop para que possa ser executado para cada item do array
                $access = Acesso::find($idAccess[$i]);

                if (!$access) {
                    return response()->json(['message' => 'Acesso não encontrado.'], 404);
                }

                if ($statusacesso !== null) {


                    if ($statusacesso[$i] === 'true') {
                        $access->status = true;
                    } else if ($statusacesso[$i] === 'false') {
                        $access->status = false;
                    }


                    $access->nome_do_acesso = $acessos[$i];
                    $access->system_id = $idSystem;

                    $access->save();
                }
            }





            $novosTiposDeAcesso = $request->input('tiposDeAcessoNew');


            if ($novosTiposDeAcesso != null) {
                $novosTiposDeAcesso = explode(',', $novosTiposDeAcesso);


                $comprimentoNovosTiposDeAcesso = count($novosTiposDeAcesso);


                for ($i = 0; $i < $comprimentoNovosTiposDeAcesso; $i++) {
                    $nomeAcessoCamelCase = combineAndFormatStrings($nomeDoSistema, $novosTiposDeAcesso[$i]);

                    // Cria ou obtém o acesso
                    Acesso::firstOrCreate([
                        'nome_do_acesso' => $novosTiposDeAcesso[$i],
                        'system_id' => $idSystem,
                        'acesso' => $nomeAcessoCamelCase,
                    ]);

                    if (!Schema::hasColumn('departaments', $nomeAcessoCamelCase)) {
                        Schema::table('departaments', function ($table) use ($nomeAcessoCamelCase) {
                            $table->boolean($nomeAcessoCamelCase)->default(false);
                        });
                    }

                    // Adiciona a coluna na tabela User se ainda não existir
                    if (!Schema::hasColumn('users', $nomeAcessoCamelCase)) {
                        Schema::table('users', function ($table) use ($nomeAcessoCamelCase) {
                            $table->boolean($nomeAcessoCamelCase)->default(false);
                        });
                    }
                }
            }

            // Outras operações que você precisa fazer...

            // Retorna uma resposta de sucesso
            return response()->json(['message' => 'Sistema atualizado com sucesso'], 200);
        } catch (ValidationException $exception) {
            // Captura a exceção de validação e retorna uma resposta de erro personalizada
            $errorMessages = 'Sistema já foi criado. Favor reiniciar a página.';
            return response()->json(['error' => $errorMessages], 422);
        }
    }
}
