import React, { useState, useEffect } from 'react';
import { Input, Dropdown, ModalWebCam, GerenciamentoUserEdit } from '../index';
import user from '../../assets/user.png';
import seta_baixo from '../../assets/seta-para-baixo.png';
import useCreate from '../../hooks/UseCreate'
import { useUser } from '../../userContext'
import seta_cima from '../../assets/seta-para-cima.png';
import { useCookies } from 'react-cookie';

const Modalbodyusersedit = ({
    setVisible,
    visible,
    dadossistema,
    dadosacesso,
    dadosgrupo,
    dadosuser,
    infoGestores,
}) => {
    const [msgStatus, setMsgStatus] = useState('danger');
    const [msg, setmsg] = useState('');
    const [active, setactive] = useState();
    const [initiactive, setinitiactive] = useState();
    const { domain } = useUser()
    const [nome, setnome] = useState('');
    const [chapa, setchapa] = useState('');
    const [horarioDoAlmoco, sethorarioDoAlmoco] = useState('');
    const [usuario, setusuario] = useState('');
    const [senha, setsenha] = useState('');
    const [gestorResponsavel, setgestorResponsavel] = useState('');
    const [CPF, setCPF] = useState('');
    const [listMain, setListMain] = useState([]);
    const [systemStates, setSystemStates] = useState({});
    const [systemStatus, setSystemStatus] = useState({});
    const [systemimageStatus, setSystemimageStatus] = useState({});
    const [listSecondary, setListSecondary] = useState([]);
    const [listSecondaryID, setListSecondaryID] = useState([]);
    const [systemSecondary, setSystemSecondary] = useState({});
    const [systemStatusSecondary, setSystemStatusSecondary] = useState({});
    const [StatusAccess, setStatusAccess] = useState([]);
    const [grupo, setGrupo] = useState('');
    const [photo, setPhoto] = useState(null);
    const [Group, setGroup] = useState([])
    const { validarUsersEdit, enviarDadosParaBackend } = useCreate();
    const [gestores, setgestores] = useState([])
    const [infoSetor, setInfoSetor] = useState([])
    const [tamanho, setTamanho] = useState('');
    const [tipo, setTipo] = useState('');
    const [PhotoRetired, setPhotoRetired] = useState()
    const [nomeDoArquivo, setNomeDoArquivo] = useState('');
    const [isGestor, setIsGestor] = useState(false);
    const [isGestorInit, setIsGestorInit] = useState(false);
    const [email, setmail] = useState('');

    useEffect(() => {
        if (photo !== null) {
            // Retorna o tamanho do Blob em bytes
            const size = photo.size;
            setTamanho(size);

            // Retorna o tipo MIME do Blob (por exemplo, "image/png")
            const type = photo.type;
            setTipo(type);

            // Extrair o nome do arquivo do tipo do Blob
            const fileName = type.split('/').pop();
            setNomeDoArquivo(fileName);
        } else {
            console.log("Photo é null.");
        }
    }, [photo]);





    useEffect(() => {
        setmsg('');
    }, [nome, chapa, horarioDoAlmoco, grupo, photo, gestorResponsavel, CPF, usuario, senha]);






    useEffect(() => {
        try {
            let newList = {}
            dadosacesso.forEach((element, id) => {

                newList[id + 1] = dadosuser[element.acesso];
            })
            setSystemStatusSecondary(newList);
        } catch (error) {
            console.error('Erro ao obter dados:', error);
        }
    }, [dadosuser]);


    //adapatr para conseguir verificar os dados da forma em que se devem ser verificados

    useEffect(() => {
        const fetchData = async () => {
            try {
                dadosgrupo.message.forEach((element, index) => {
                    if (element.NomeDoSetor === grupo) {
                        setInfoSetor(element);
                    }
                });
            } catch (error) {
                console.error('Erro ao obter dados:', error);
            }
        };
        fetchData();
    }, [grupo, dadossistema, infoSetor]);



    useEffect(() => {
        if (dadosuser) {
            setnome(dadosuser.Nome || '')
            setactive(dadosuser.status || '')
            setPhotoRetired(dadosuser.rotaDaFoto || '')
            setchapa(dadosuser.Chapa || '')
            sethorarioDoAlmoco(dadosuser.Horario_do_almoço || '')
            setusuario(dadosuser.Usuario || '')
            setgestorResponsavel(dadosuser.Gestor || '')
            setCPF(dadosuser.CPF || '')
            setgestores(infoGestores)
            setGrupo(dadosuser.Departamento || '')
            setIsGestor(dadosuser.GestorCheck || '')
            setIsGestorInit(dadosuser.GestorCheck || '')
            setmail(dadosuser.Email || '')
            setinitiactive(dadosuser.status || '')
	    setsenha('')
            console.log('isGestor', dadosuser.GestorCheck)
        }
    }, [dadosuser]);








    useEffect(() => {
        const fetchData = async () => {
            try {
                let list = [];
                dadosgrupo.message.forEach((element, index) => {
                    if (element.status) {
                        list.push(element.NomeDoSetor);
                    }
                });
                setGroup(list);
            } catch (error) {
                console.error('Erro ao obter dados:', error);
            }
        };
        fetchData();
    }, []);



    useEffect(() => {
        const fetchData = async () => {
            try {
                const newListMain = [];
                const newSystemStates = {};
                const newSystemStatus = {};
                const newSystemimageStatus = {};



                dadossistema.forEach((element) => {
                    const sistema = element.nome_do_sistema;
                    newListMain.push(sistema);
                    newSystemStates[sistema] = seta_baixo;
                    newSystemStatus[sistema] = element.status;
                    newSystemimageStatus[sistema] = false;
                });

                setListMain(newListMain);
                setSystemStates(newSystemStates);
                setSystemStatus(newSystemStatus);
                setSystemimageStatus(newSystemimageStatus);
            } catch (error) {
                console.error('Erro ao obter dados:', error);
            }
        };
        fetchData();
    }, []);



    useEffect(() => {
        const fetchDataSecondary = async () => {
            try {
                const newListSecondary = [];
                const newListSecondaryID = [];
                const newStatusAccess = [];
                const newSystemStatesSecondary = {};

                dadossistema.forEach((elementid) => {
                    dadosacesso.forEach((element) => {
                        const id = elementid.id;
                        const system_id = element.system_id;

                        if (id === system_id) {
                            newStatusAccess.push(element.status);
                            newListSecondary.push(element.nome_do_acesso);
                            newListSecondaryID.push(id);
                            newSystemStatesSecondary[id] = seta_baixo;
                        }
                    });
                });



                setListSecondary(newListSecondary);
                setListSecondaryID(newListSecondaryID);
                setSystemSecondary(newSystemStatesSecondary);
                setStatusAccess(newStatusAccess);
            } catch (error) {
                console.error('Erro ao obter dados secundários:', error);
            }
        };
        fetchDataSecondary();
    }, []);







    const handleSave = async () => {
        try {
            const result = await validarUsersEdit(
                nome,
                chapa,
                horarioDoAlmoco,
                grupo,
                usuario,
                CPF,
                senha,
                gestorResponsavel
            );


            if (result.sucesso) {
                // Converta a foto em base64
                const photoBase64 = await convertPhotoToBase64(photo);

                const data = {
                    database: [dadossistema,
                        dadosacesso,
                        dadosgrupo,
                        dadosuser], msg: msg,
                    nome: nome,
                    chapa: chapa,
                    horarioDoAlmoco: horarioDoAlmoco,
                    usuario: usuario,
                    senha: senha,
                    gestorResponsavel: gestorResponsavel,
                    CPF: CPF,
                    grupo: grupo,
                    listMain: listMain,
                    systemStates: systemStates,
                    systemStatus: systemStatus,
                    systemimageStatus: systemimageStatus,
                    listSecondary: listSecondary,
                    listSecondaryID: listSecondaryID,
                    systemSecondary: systemSecondary,
                    systemStatusSecondary: systemStatusSecondary,
                    StatusAccess: StatusAccess,
                    photo: photoBase64, // Inclua a foto convertida em base64 aqui
                    infoSetor: infoSetor,
                    tamanho: tamanho,
                    tipo: tipo,
                    nomeDoArquivo: nomeDoArquivo,
                    isGestor: isGestor,
                    email: email,
                    status: active,
                    initstatus: initiactive,
                    isGestorInit: isGestorInit,
                };

                const rota = `${domain}EditeUser`;

                const mensagem = await enviarDadosParaBackend(rota, data, domain);
               
                setmsg(mensagem.message);
                setMsgStatus('success')
            } else {
                setmsg('Falha na validação: ' + result.mensagens.join(', '));
                setMsgStatus('danger')
            }
        } catch (error) {
            setmsg('Algum usuário ja esta cadastrado com esses dados');
            setMsgStatus('danger')
        }
    };

    // Função para converter a foto em base64
    const convertPhotoToBase64 = (photo) => {
        return new Promise((resolve, reject) => {
            if (!photo) {
                resolve(null);
            } else {
                const reader = new FileReader();
                reader.readAsDataURL(photo);
                reader.onloadend = () => {
                    resolve(reader.result);
                };
                reader.onerror = (error) => {
                    reject(error);
                };
            }
        });
    };

    const handleDisabled = () => {
        setactive(prevActive => !prevActive);
    };

    const handleToggleGestor = () => {
        setIsGestor(prevActive => !prevActive);
    };

    return (
        <div style={{ overflowY: 'auto', maxHeight: '80vh', padding: '1rem' }}>
            <div style={{ background: 'transparent', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <ModalWebCam
                    descricao={
                        photo ? (
                            <img
                                src={URL.createObjectURL(photo)}
                                style={{ marginBottom: '2rem', borderRadius: '50%', border: '2px solid black', height: '5rem', width: '5rem', cursor: 'pointer' }}
                                className="rounded mx-auto d-block"
                                alt="foto capturada"
                            />
                        ) : (
                            <img
                                src={PhotoRetired === '' ? user : PhotoRetired}/*PhotoRetired */
                                style={{ marginBottom: '2rem', borderRadius: '50%', border: '2px solid black', height: '5rem', width: '5rem', cursor: 'pointer' }}
                                className="rounded mx-auto d-block"
                                alt="ícone original"
                            />
                        )
                    }
                    titulo={'retire a sua foto'}
                    setPhoto={(capturedPhoto) => {
                        setPhoto(capturedPhoto.blob);
                    }}
                />
            </div>

            <Input etiqueta={'Digite o nome do usuário'} desativado={!active} input={nome} setinput={setnome} tipo={'text'} personalizacao={'Nome'} subtitulo={'Nome '} obrigatorio={true} />
            <Input etiqueta={'Digite a chapa do usuário'} desativado={!active} input={chapa} setinput={setchapa} tipo={'number'} personalizacao={'Chapa'} subtitulo={'Chapa '} obrigatorio={true} />
            <Input etiqueta={'Digite o horário de almoço'} desativado={!active} input={horarioDoAlmoco} setinput={sethorarioDoAlmoco} tipo={'time'} personalizacao={'Horário'} subtitulo={'Horário do almoço '} obrigatorio={true} />

            <Dropdown selectedOption={grupo} setSelectedOption={setGrupo} optionsData={Group} etiqueta={'Selecione o grupo'} desativado={!active} personalizacao={'Grupo'} subtitulo={'Grupo '} obrigatorio={true} />
            <Dropdown selectedOption={gestorResponsavel} setSelectedOption={setgestorResponsavel} optionsData={gestores} etiqueta={'Selecione o gestor'} desativado={!active} personalizacao={'Gestor'} subtitulo={'Gestor '} obrigatorio={true} />

            <Input etiqueta={'Digite o CPF'} desativado={!active} input={CPF} setinput={setCPF} tipo={'text'} personalizacao={'CPF'} subtitulo={'CPF '} obrigatorio={false} />
            <Input etiqueta={'Digite um novo usuário de acesso'} desativado={!active} input={usuario} setinput={setusuario} tipo={'text'} personalizacao={'Usuário'} subtitulo={'Usuário'} />
            <Input etiqueta={'Digite uma nova senha de acesso'} desativado={!active} input={senha} setinput={setsenha} tipo={'text'} personalizacao={'Senha'} subtitulo={'Senha'} />
            <Input etiqueta={'Digite o email'} desativado={!active} input={email} setinput={setmail} tipo={'text'} personalizacao={'Email'} subtitulo={'Email'} />

            <input
                className="form-check-input"
                type="checkbox"
                id="flexCheckDefault"
                onChange={handleToggleGestor}
                checked={isGestor} // Adicionando o atributo checked
            />
            <label className="form-check-label" htmlFor="flexCheckDefault">
                Defina se é um gestor
            </label>



            <GerenciamentoUserEdit
                dadosSystem={dadosacesso}
                infoSetor={infoSetor}
                setSystemimageStatus={setSystemimageStatus}
                systemimageStatus={systemimageStatus}
                listMain={listMain}
                systemStates={systemStates}
                systemStatus={systemStatus}
                setListMain={setListMain}
                setSystemStates={setSystemStates}
                setSystemStatus={setSystemStatus}
                listSecondary={listSecondary}
                setListSecondary={setListSecondary}
                listSecondaryID={listSecondaryID}
                setListSecondaryID={setListSecondaryID}
                systemSecondary={systemSecondary}
                setSystemSecondary={setSystemSecondary}
                systemStatusSecondary={systemStatusSecondary}
                setSystemStatusSecondary={setSystemStatusSecondary}
                StatusAccess={StatusAccess}
                grupo={grupo}
                setGrupo={setGrupo}


            />
            {msg && (
                <div className={`alert alert-${msgStatus}`} role="alert">
                    {msg}
                </div>
            )}

            <div className="modal-footer">
                <button type="button" className="btn btn-primary" onClick={handleSave}>Salvar</button>
            </div>
            <div className="modal-footer">
                <button type="button" className="btn btn-danger" onClick={handleDisabled}>Desativar</button>
            </div>
        </div>

    );
};

export default Modalbodyusersedit;
