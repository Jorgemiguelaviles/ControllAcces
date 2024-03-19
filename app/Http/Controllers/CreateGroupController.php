<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Departament;
use App\Models\Acesso;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Schema;
use Illuminate\Validation\ValidationException;

class CreateGroupController extends Controller
{
    public function creategroupcontroller(Request $request)
    {
        // Função para formatar uma string
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

        // Mensagens de validação
        $mensagens = [
            'required' => 'O campo :attribute é obrigatório.',
            'unique' => 'O campo :attribute já está em uso.',
            'array' => 'O campo :attribute deve ser um array.',
            'tiposDeAcesso.required' => 'É necessário pelo menos um tipo de acesso.',
            'tiposDeAcesso.*.required' => 'Todos os tipos de acesso são obrigatórios.',
            'tiposDeAcesso.*.unique' => 'Já existe um tipo de acesso com o mesmo nome para este sistema.',
        ];

        try {
            // Validar os dados de entrada
            $request->validate([
                'nomeDoGrupo' => 'required|unique:departaments,NomeDoSetor',
                'descricaoDoGrupo' => 'nullable',
            ], $mensagens);

            // Obter dados do request
            $nomeDoGrupo = $request->input('nomeDoGrupo');
            $descricaoDoGrupo = $request->input('descricaoDoGrupo');
            $listSecondary = $request->input('listSecondary');
            $systemStatusSecondary = $request->input('systemStatusSecondary');
            $database = $request->input('database');
            $all = $request->all();



            // Criar uma instância de Departament apenas se o 'NomeDoSetor' for único
            $system = Departament::firstOrCreate(
                ['NomeDoSetor' => $nomeDoGrupo],
                ['DescricaoDepartamento' => $descricaoDoGrupo]
            );

            $count = count($database['message']['1']);
            $listi = [];

            //return response()->json(['message' => $all]);


            // Loop para processar os dados
            for ($i = 0; $i < $count; $i++) {
                // Adicionar o valor de $i à lista
                $listi[] = $i;

                // Criar o nome do campo combinado
                $fieldName = combineAndFormatStrings($nomeDoGrupo,  $listSecondary[$i]);

                // Verificar se o campo já existe no modelo Departament
                if (Schema::hasColumn('departaments', $fieldName)) {
                    // Adicionar mensagem de erro ou tomar outra ação apropriada
                    return response()->json(['message' => 'Falha em departament']);
                }

                // Verificar se o valor já existe no banco de dados
                $valueExists = Acesso::where('acesso', $fieldName)->exists();

                if ($valueExists) {
                    return response()->json(['message' => 'Valor duplicado encontrado para o campo: ' . $fieldName], 400);
                }



                // Atribuir valor ao modelo Departament
                $system->{$database['message'][1][$i]['acesso']} = $systemStatusSecondary[$i + 1];
            }





            // Salvar o modelo no banco de dados
            $system->save();

            // Retornar uma resposta JSON com a lista $listi
            return response()->json(['message' => 'Grupo criado com sucesso']);
        } catch (ValidationException $exception) {
            // Captura a exceção de validação e retorna uma resposta de erro personalizada
            $errorMessages = 'Sistema já foi criado, favor reiniciar a página';
            return response()->json(['error' => $errorMessages], 422);
        }
    }
}
