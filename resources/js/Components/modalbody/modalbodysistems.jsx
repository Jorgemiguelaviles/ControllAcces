import React, { useState, useEffect } from 'react';
import { Input, Textarea } from '../index';
import useCreate from '../../hooks/UseCreate';
import { useUser } from '../../userContext';

export const Modalbodysistems = ({ setVisible, visible }) => {
    const { domain } = useUser();
    const { validarSystems, enviarDadosParaBackendFile } = useCreate();
    const [msg, setMsg] = useState('');
    const [nomeDoSistema, setNomeDoSistema] = useState('');
    const [url, setUrl] = useState('');
    const [descricaoDoSistema, setDescricaoDoSistema] = useState('');
    const [state, setState] = useState('danger');
    const [tiposDeAcesso, setTiposDeAcesso] = useState(['']);
    const [imagens, setImagens] = useState(null);
    const [videos, setVideos] = useState(null);

    const handleSave = async () => {
        try {

            const result = await validarSystems(nomeDoSistema, tiposDeAcesso);
            setState('danger');

            if (result.sucesso) {


                setState('success');

                const formData = new FormData();


                /*console.log(tiposDeAcesso)*/
                formData.append('nomeDoSistema', nomeDoSistema);
                formData.append('descricaoDoSistema', descricaoDoSistema);
                formData.append('tiposDeAcesso', tiposDeAcesso);
                formData.append('url', url);

                // Adicione imagens ao formData apenas se não forem nulas
                if (imagens) {
                    formData.append('imagem', imagens);
                }

                // Adicione vídeos ao formData apenas se não forem nulos
                if (videos) {
                    formData.append('video', videos);
                }

                // Após a construção do FormData, adicione este código para visualizar seu conteúdo


                const response = await enviarDadosParaBackendFile(`${domain}CreateSystem`, formData, domain);

                console.log(response);

                if (response.status === 200) {
                    setMsg('Sistema criado com sucesso!');
                }
            } else {
                const errorMessage = result.error ? result.error.join(', ') : 'Erro desconhecido';
                setState('warning');
                setMsg('Falha na validação: ' + 'Sistema já existente');
            }
        } catch (error) {
            // Lógica para tratar erros durante a validação ou chamada para o backend
            console.error('Erro durante a validação ou chamada para o backend:', error);

            // Verifica se é um erro de resposta do servidor
            if (error.response) {
                // Se o servidor retornou um código de erro (ex: 422), trate conforme necessário
                if (error.response.status === 422) {
                    setMsg('Erro de validação: ' + 'Sistema ja existente');
                    setState('warning')
                } else {
                    // Outro tratamento de erro de resposta do servidor
                    setMsg('Erro do servidor: ' + error.response.data.message);
                }
            } else {
                // Outro tratamento de erro, que não é uma resposta do servidor
                setMsg('Erro desconhecido: ' + error.message);
            }
        }
    };

    useEffect(() => {
        setMsg('');
    }, [nomeDoSistema, descricaoDoSistema, imagens, videos]);

    const handleAddTipo = () => {
        setTiposDeAcesso([...tiposDeAcesso, '']);
    };

    const handleTipoChange = (index, value) => {
        const newTiposDeAcesso = [...tiposDeAcesso];
        newTiposDeAcesso[index] = value;
        setTiposDeAcesso(newTiposDeAcesso);
    };

    const handleRemoveTipo = (index) => {
        const newTiposDeAcesso = tiposDeAcesso.filter((tipo, i) => i !== index);
        setTiposDeAcesso(newTiposDeAcesso);
    };

    const handleImagensChange = (event) => {
        const file = event.target.files[0];
        const maxSizeInBytes = 1048576; // 1MB em bytes

        if (file.size > maxSizeInBytes) {
            setMsg('O arquivo selecionado é muito grande. Por favor, selecione um arquivo menor.');
            event.target.value = ''; // Limpa o valor do input para que o usuário possa selecionar outro arquivo
            return;
        } else {
            setImagens(file)
        }
    };

    


    return (
        <>
            <Input etiqueta={'Digite o nome do novo sistema'} desativado={false} input={nomeDoSistema} setinput={setNomeDoSistema} tipo={'text'} personalizacao={'Novo sistema'} subtitulo={'Novo sistema'} obrigatorio={true} />
            <Input etiqueta={'Digite a url do novo sistema'} desativado={false} input={url} setinput={setUrl} tipo={'text'} personalizacao={'Novo sistema'} subtitulo={'url'} obrigatorio={true} />

            <div className="input-group mb-3">
                <label className="input-group-text" htmlFor="inputGroupFileImages">Imagens</label>
                <input type="file" className="form-control" id="inputGroupFileImages" accept="image/*" onChange={handleImagensChange} />
            </div>

            <Textarea etiqueta={'Descreva o sistema'} input={descricaoDoSistema} setInput={setDescricaoDoSistema} />

            {tiposDeAcesso.map((tipo, index) => (
                <div key={index}>
                    <Input
                        etiqueta={`Tipo de Acesso ${index + 1}`}
                        desativado={false}
                        input={tipo}
                        setinput={(value) => handleTipoChange(index, value)}
                        tipo={'text'}
                        personalizacao={`Novo sistema ${index + 1}`}
                        subtitulo={`Novo sistema ${index + 1}`}
                        obrigatorio={true}
                    />
                    <button type="button" className="btn btn-danger mb-2" onClick={() => handleRemoveTipo(index)}>
                        Fechar
                    </button>
                </div>
            ))}

            <button type="button" className="btn btn-primary" onClick={handleAddTipo}>
                Novo tipo
            </button>

            {msg && (
                <div className={`alert alert-${state}`} role="alert">
                    {JSON.stringify(msg)}
                </div>
            )}

            <div className="modal-footer">
                <button type="button" className="btn btn-success" onClick={handleSave}>
                    Salvar
                </button>
            </div>
        </>
    );
};

export default Modalbodysistems;
