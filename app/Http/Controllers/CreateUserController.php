<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Acesso;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Schema;
use Illuminate\Validation\ValidationException;

class CreateUserController extends Controller
{
    public function createusercontroller(Request $request)
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

        try {

            $validator = Validator::make($request->all(), [
                'nome' => 'required|unique:users', // Nome obrigatório e único
                'chapa' => 'required|unique:users', // Chapa obrigatória e única
                'horarioDoAlmoco' => 'required', // Horário do almoço obrigatório
                'grupo' => 'required', // Grupo obrigatório
                'CPF' => 'nullable|unique:users', // CPF único (pode ser nulo)
                'usuario' => 'nullable|unique:users', // Usuário único (pode ser nulo)
                'senha' => 'nullable', // Senha opcional
                'tipo' => 'nullable', // Tipo opcional
                // Adicione outras validações conforme necessário
            ], [
                'nome.required' => 'O campo nome é obrigatório.',
                'nome.unique' => 'O nome informado já está em uso.',
                'chapa.required' => 'O campo chapa é obrigatório.',
                'chapa.unique' => 'A chapa informada já está em uso.',
                'horarioDoAlmoco.required' => 'O campo horário do almoço é obrigatório.',
                'grupo.required' => 'O campo grupo é obrigatório.',
                'CPF.unique' => 'O CPF informado já está em uso.',
                'usuario.unique' => 'O usuário informado já está em uso.',
                // Adicione outras mensagens conforme necessário
            ]);
            if ($validator->fails()) {
                $errors = $validator->errors()->all();
                return response()->json(['errors' => $errors], 422);
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
            $database = $request->input('database');
            $isGestor = $request->input('isGestor');
            $email = $request->input('email');
            $all = $request->all('');

            //return response()->json(['message' =>  $all]);


            // Encontrar o ID do departamento
            $id_departament = null;
            foreach ($database['2']['message'] as $item) {
                if ($item['NomeDoSetor'] ===  $grupo) {
                    $id_departament = $item['id'];
                    break;
                }
            }



            // Criar uma instância de User apenas se o 'Nome' for único
            $system = User::firstOrCreate(
                [
                    'Nome' => $nome,
                    'Chapa' => $chapa,
                    'Horario_do_almoço' => $horarioDoAlmoco,
                    'Departamento' => $grupo,
                    'Gestor' => $gestorResponsavel,
                    'CPF' => $CPF,
                    'Usuario' => $usuario,
                    'Email' => $email,
                    // Hash para a senha
                    'Senha' => password_hash($senha, PASSWORD_BCRYPT),
                    'id_departamento' => $id_departament,
                    'GestorCheck' => $isGestor,
                ],
                ['rotaDaFoto' => isset($name) ? "js/assets/Armazenamentophotos/{$name}" : null]
            );

            // Foto em base64
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

            // Loop para processar os dados
            $count = count($database['1']['message']['1']);
            $listi = [];
            for ($i = 0; $i < $count; $i++) {
                $listi[] = $i;
                $fieldName = combineAndFormatStrings($grupo,  $listSecondary[$i]);
                if (Schema::hasColumn('departaments', $fieldName)) {
                    return response()->json(['message' => 'Falha em departament']);
                }

                $valueExists = Acesso::where('acesso', $fieldName)->exists();

                if ($valueExists) {
                    return response()->json(['message' => 'Valor duplicado encontrado para o campo: ' . $fieldName], 400);
                }

                //reconfigurar aqui
                $system->{$database[1]['message'][1][$i]['acesso']} = $systemStatusSecondary[$i + 1];
            }

            // Salvar o modelo no banco de dados
            $system->save();

            // Construir a rota completa da foto
            $rotaDaFotoCompleta = isset($system->rotaDaFoto) ? asset($system->rotaDaFoto) : null;

            // Retornar uma resposta JSON com a lista $listi e a rota completa da foto
            return response()->json(['message' =>  'Usuário criado com sucesso']);
        } catch (ValidationException $exception) {
            // Captura a exceção de validação e retorna uma resposta de erro personalizada
            $errorMessages = 'Sistema já foi criado, favor reiniciar a página';
            return response()->json(['error' => $errorMessages], 422);
        } catch (\Exception $e) {
            // Captura qualquer outra exceção e retorna uma resposta de erro
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}
