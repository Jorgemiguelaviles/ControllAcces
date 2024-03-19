import React, { useState, useEffect } from 'react';
import { Input, Textarea } from '../index';
import useCreate from '../../hooks/UseCreate';
import { useUser } from '../../userContext'
//'C:/Users/projetosti.ALPINA/Desktop/ferramentas/apache/Apache24/htdocs/controllaccessextern/resources/js/assets/ArmazenamentoVideos/SimboloEngenharia.mp4'

const Modalbodysistemsedit = ({ setVisible, visible, dadossistema, dadosacesso }) => {
    const { domain } = useUser()
    const [nomeDoSistema, setNomeDoSistema] = useState(dadossistema?.nome_do_sistema || '');
    const [descricaoDoSistema, setDescricaoDoSistema] = useState(dadossistema?.descricao || '');
    const [tiposDeAcesso, setTiposDeAcesso] = useState(['']);
    const [idSystem, setidSystem] = useState(dadossistema?.id || ['']);
    const [tiposDeAcessoNew, setTiposDeAcessoNew] = useState([]);
    const [tiposReativos, setTiposReativos] = useState(dadossistema?.status || '');
    const [msg, setMsg] = useState('');
    const [Savemsg, setSaveMsg] = useState();
    const [status, setStatus] = useState();
    const [active, setActive] = useState([]);
    const [save, setSave] = useState(false);
    const [tipoAlterado, setTipoAlterado] = useState(false)
    const { validarSystemsEdit, enviarDadosParaBackendFile } = useCreate();
    const [messageType, setMessageType] = useState('danger');
    const [idAccess, setidAccess] = useState();
    const [url, setUrl] = useState('');
    const [imagens, setImagens] = useState(null);
    const [videos, setVideos] = useState(null);
    const [dadosCarregados, setDadosCarregados] = useState(false);
    const [forceUpdate, setForceUpdate] = useState(false); // Estado para forçar a atualização do componente


    const [imagensStatus, setImagensStatus] = useState(false);
    const [videosStatus, setVideosStatus] = useState(false);


    const [imagensName, setImagensName] = useState(false);
    const [videosName, setVideosName] = useState(false);

    const [imagensNameOrigen, setImagensNameOrigen] = useState(false);
    const [videosNameOrigen, setVideosNameOrigen] = useState(false);



    const videoFilePath = 'C:/Users/projetosti.ALPINA/Desktop/ferramentas/apache/Apache24/htdocs/controllaccessextern/resources/js/assets/ArmazenamentoVideos/SimboloEngenharia.mp4';

    // Carrega o arquivo como um Blob
    const videoFile = new File([videoFilePath], 'video.mp4', { type: 'video/mp4' });

    // Cria uma URL válida para o Blob
    const videoUrl = URL.createObjectURL(videoFile);



    useEffect(() => {
        setMsg('');
    }, [nomeDoSistema,
        descricaoDoSistema,
        tiposDeAcesso,
        idSystem,
        tiposDeAcessoNew,
        tiposReativos,
    ]);




    useEffect(() => {
        if (dadossistema && dadosacesso.length > 0) {
            const imagens = dadossistema.imagens || '';
            const videos = dadossistema.videos || '';

            const partesimg = imagens.split('/');
            const nomeDoArquivoimg = partesimg[partesimg.length - 1];

            const partesvid = videos.split('/');
            const nomeDoArquivovid = partesvid[partesvid.length - 1];

            setImagensName(nomeDoArquivoimg)
            setVideosName(nomeDoArquivovid)


            setImagensNameOrigen(imagens)
            setVideosNameOrigen(videos)





            // Verifica se imagens e vídeos não estão vazios antes de atualizar os estados
            if (imagens !== '' && imagens !== null) {
                setImagens(imagens);
                setForceUpdate(prev => !prev);
                setDadosCarregados(true);
            }

            setNomeDoSistema(dadossistema.nome_do_sistema || '');
            setTiposReativos(dadossistema.status || '');
            setDescricaoDoSistema(dadossistema.descricao || '');
            setidSystem(dadossistema.id || '');

            setUrl(dadossistema.url || '');

            const list = dadosacesso
                .filter(element => dadossistema.id === element.system_id)
                .map(element => element.nome_do_acesso);

            setTiposDeAcesso(list);

            const listStatusActive = dadosacesso
                .filter(element => dadossistema.id === element.system_id)
                .map(element => element.status);

            setActive(listStatusActive);

            const listStatusIdAccess = dadosacesso
                .filter(element => dadossistema.id === element.system_id)
                .map(element => element.id);

            setidAccess(listStatusIdAccess);

            // Define a variável de estado como true após o carregamento dos dados

        }
    }, [dadossistema]);











    useEffect(() => {
        let newlist = [];
        if (!tiposReativos) {
            active.forEach((object, id) => {
                newlist.push(false);
            });
            setActive(newlist);
        }
    }, [tiposReativos]);






    const handleSave = async () => {
        const tiposDeAcessoVazio = tiposDeAcesso.some((elemento) => elemento === '');
        const nomeDoSistemaVazio = nomeDoSistema.trim() === '';

        if (tiposDeAcessoVazio || nomeDoSistemaVazio) {
            setSave(true);
            setMsg('Nome do sistema e acessos precisam ser preenchidos');
            setMessageType("danger");
            return;
        }

        try {
            const result = await validarSystemsEdit(tiposDeAcessoNew, save, tipoAlterado);
            setMsg(result.mensagens);
            setMessageType("danger");

            if (result.sucesso) {

                const formData = new FormData();



                formData.append('nomeDoSistema', nomeDoSistema);
                formData.append('descricaoDoSistema', descricaoDoSistema);
                formData.append('tiposDeAcesso', tiposDeAcesso);
                formData.append('url', url);
                formData.append('idSystem', idSystem);
                formData.append('idAccess', idAccess);
                formData.append('tiposDeAcessoNew', tiposDeAcessoNew);







                formData.append('StatusDoSistema', tiposReativos);

                formData.append('active', active);

                // Adicione imagens ao formData apenas se não forem nulas
                if (imagens) {
                    formData.append('imagem', imagens);
                    formData.append('imagemOrigen', imagensNameOrigen);
                }

                // Adicione vídeos ao formData apenas se não forem nulos
                if (videos) {
                    formData.append('video', videos);
                    formData.append('videoOrigen', videosNameOrigen);
                }


                const valor = await enviarDadosParaBackendFile(`${domain}EditSystem`, formData, domain);
                console.log(valor)
                setMessageType("success");

                setMsg(valor.message);
            }
        } catch (error) {
            console.error('Erro durante a validação:', error);
        }
    };


    const handleDescricaoChange = (e) => {
        const value = e.target.value;
        setDescricaoDoSistema(value);
        setTipoAlterado(true);
    };


    const handleAlterTipo = () => {
        setTiposReativos((prevTiposReativos) => !prevTiposReativos);
        setTipoAlterado(true);
    };





    const handleTipoText = (e) => {
        const value = e.target.value; // Pega o valor do evento
        setNomeDoSistema(value);
        setTipoAlterado(true);
    };


    const handleTipoChange = (index, value) => {
        const newTiposDeAcesso = [...tiposDeAcesso];
        newTiposDeAcesso[index] = value;
        setTiposDeAcesso(newTiposDeAcesso);
        setTipoAlterado(true)
    };

    const handleTipoChangenew = (index, value) => {
        const newTiposDeAcesso = [...tiposDeAcessoNew];
        newTiposDeAcesso[index] = value;
        setTiposDeAcessoNew(newTiposDeAcesso);
        setTipoAlterado(true);
    };



    const handleAddTipo = () => {
        setTiposDeAcessoNew([...tiposDeAcessoNew, '']);
    };

    const handleRemoveTipo = (index) => {
        const newTiposDeAcesso = tiposDeAcessoNew.filter((tipo, i) => i !== index);
        setTiposDeAcessoNew(newTiposDeAcesso);
    };

    const handleToggleTipo = (index) => {
        setActive((prev) => {
            const newState = [...prev];
            newState[index] = !prev[index];
            setTipoAlterado(true);
            return newState;
        });
    };



    const handleImagensChange = (event) => {
        setTipoAlterado(true);
        const arquivo = event.target.files[0];
        const nomeDoArquivo = arquivo.name;
        setImagensName(nomeDoArquivo); // Atualiza o estado com o nome do arquivo
        setImagens(arquivo);
        setImagensStatus(true);
    };


    
    return (
        <>
            <>

                <div className="row mb-3">
                    <div className="col-sm">
                        <div className="input-group">
                            <span className="input-group-text" id="basic-addon1" style={{ width: '25%' }}>Sistema</span>
                            <input
                                onChange={handleTipoText}
                                type="text"
                                className="form-control"
                                value={nomeDoSistema}
                                aria-label={nomeDoSistema}
                                aria-describedby="basic-addon1"
                                disabled={!tiposReativos}
                                placeholder="Digite o nome do novo sistema"
                                style={{ flex: '1' }}
                            />
                        </div>
                    </div>
                </div>

                <Input
  etiqueta={'Digite a url do novo sistema'}
  desativado={!tiposReativos}
  input={url}
  setinput={(value) => {
    setUrl(value);
    setTipoAlterado(true); // Define tipoAlterado como true quando houver mudan�a
  }}
  tipo={'text'}
  personalizacao={'Novo sistema'}
  subtitulo={'URL'}
  obrigatorio={true}
/>

                {tiposReativos ? <button
                    type="button"
                    className='btn btn-danger mb-3'
                    onClick={handleAlterTipo}
                >
                    {'Desativar'}
                </button> : <button
                    type="button"
                    className='btn btn-success mb-3'
                    onClick={handleAlterTipo}
                >
                    {'Ativar'}
                </button>}

                {dadosCarregados && (
                    <>
                        <div className="input-group mb-3">
                            <div className="input-group mb-3">
                                <label htmlFor="inputGroupFile" style={{ cursor: 'pointer' }}>{imagensName}</label>
                                <input id="inputGroupFile" style={{ display: 'none' }} type="file" className="form-control" accept="image/*" onChange={(event) => handleImagensChange(event)} />
                            </div>
                            {!imagensStatus && (<img className="w-100" src={imagens} alt='img' />)}
                        </div>

                        
                    </>
                )}









            </>
            <div className="form-floating">
                <textarea
                    className="form-control"
                    placeholder={'Descreva o sistema'}
                    value={descricaoDoSistema}
                    onChange={handleDescricaoChange}
                    style={{ height: '100px' }}
                    disabled={status}
                ></textarea>
            </div>
            {
                tiposDeAcesso.map((tipo, index) => (
                    <div key={index}>
                        <Input
                            etiqueta={tipo}
                            desativado={active[index] ? false : true}
                            input={tipo}
                            setinput={(value) => handleTipoChange(index, value)}
                            tipo={'text'}
                            personalizacao={`Acessos ${index + 1}`}
                            subtitulo={`Acessos ${index + 1}`}
                            obrigatorio={true}
                        />
                        <button
                            type="button"
                            className={`btn ${active[index] ? 'btn-danger' : 'btn-success'} mb-2`}
                            onClick={() => handleToggleTipo(index)}
                        >
                            {active[index] ? 'Desativar' : 'Ativar'}
                        </button>
                    </div>
                ))
            }
            {
                tiposDeAcessoNew.map((tipo, index) => (
                    <div key={index}>
                        <Input
                            etiqueta={tipo}
                            desativado={false}
                            input={tipo}
                            setinput={(value) => handleTipoChangenew(index, value)}
                            tipo={'text'}
                            personalizacao={`Novo acesso ${index + 1}`}
                            subtitulo={`Novo acesso ${index + 1}`}
                            obrigatorio={true}
                        />
                        <button
                            type="button"
                            className="btn btn-danger mb-2"
                            onClick={() => handleRemoveTipo(index)}
                        >
                            Fechar
                        </button>
                    </div>
                ))
            }
            <button type="button" className="btn btn-primary" onClick={handleAddTipo}>
                Novo tipo
            </button>
            {
                msg && (
                    <div className={`alert alert-${messageType}`} role="alert">
                        {msg}
                    </div>
                )
            }
            <div className="modal-footer">
                <button type="button" className="btn btn-success" onClick={handleSave}>
                    Salvar
                </button>
            </div>
        </>
    );
};

export default Modalbodysistemsedit;
