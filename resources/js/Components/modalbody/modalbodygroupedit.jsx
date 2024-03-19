import React, { useState, useEffect } from 'react';
import { Input, Textarea, GerenciamentoGroup, Checkbox } from '../index';
import seta_baixo from '../../assets/seta-para-baixo.png';
import useCreate from '../../hooks/UseCreate'
import { useUser } from '../../userContext'

const Modalbodygroupsedit = ({
    setVisible,
    visible,
    dadossistema,
    dadosacesso,
    dadosgrupo
}) => {
    const { domain } = useUser();
    const [data, setdata] = useState('');
    const [status, setstatus] = useState('');
    const [statusOrigem, setstatusOrigem] = useState('');
    const [msg, setmsg] = useState('');
    const [nomeDoGrupo, setnomeDoGrupo] = useState('');
    const [chave, setchave] = useState('');
    const [descricaoDoGrupo, setdescricaoDoGrupo] = useState('');
    const [listMain, setListMain] = useState([]);
    const [systemStates, setSystemStates] = useState({});
    const [systemStatus, setSystemStatus] = useState({});
    const [systemimageStatus, setSystemimageStatus] = useState({});
    const [listSecondary, setListSecondary] = useState([]);
    const [listSecondaryID, setListSecondaryID] = useState([]);
    const [systemSecondary, setSystemSecondary] = useState({});
    const [systemStatusSecondary, setSystemStatusSecondary] = useState({});
    const [StatusAccess, setStatusAccess] = useState([]);
    const [StatusAlter, setStatusAlter] = useState(false);
    const [StatusAlterActive, setStatusAlterActive] = useState(false);
    const [state, setstate] = useState('danger');

    useEffect(() => {
        if (dadosgrupo) {
            setchave(dadosgrupo.NomeDoSetor || '')
            setnomeDoGrupo(dadosgrupo.NomeDoSetor || '');
            setdescricaoDoGrupo(dadosgrupo.DescricaoDepartamento || '');
            setstatus(dadosgrupo.status || '');
            setstatusOrigem(dadosgrupo.status || '');
            const newSystemStatusSecondary = {};
            dadosacesso.forEach((elementid, id) => {
                newSystemStatusSecondary[elementid.id] = dadosgrupo[dadosacesso[0]['acesso']];
            });

            setSystemStatusSecondary(newSystemStatusSecondary);
        }
    }, [dadosgrupo]);

    useEffect(() => {
        if (status !== statusOrigem) {
            setStatusAlterActive(true)
        } else {
            setStatusAlterActive(false)
        }
    }, [status]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const newListMain = [];
                const newSystemStates = {};
                const newSystemStatus = {};
                const newSystemimageStatus = {};

                dadossistema.forEach((element, index) => {
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
                console.error('Erro ao obter dados secund rios:', error);
            }
        };

        fetchDataSecondary();
    }, []);



    const { validarGroup, enviarDadosParaBackend } = useCreate();

    const handleSave = async () => {
        try {
            const result = await validarGroup(nomeDoGrupo);

            if (result.sucesso) {
                const data = {
                    chave: chave,
                    dadosgrupo: dadosgrupo,
                    database: dadosacesso,
                    nomeDoGrupo: nomeDoGrupo,
                    descricaoDoGrupo: descricaoDoGrupo,
                    listMain: listMain,
                    listSecondary: listSecondary,
                    listSecondaryID: listSecondaryID,
                    systemStatusSecondary: systemStatusSecondary,
                    StatusAccess: StatusAccess,
                    statusGroup: status,
                    StatusAlterActive: StatusAlterActive,
                };

                const rota = `${domain}EditeGroup`;
                const mensagem = await enviarDadosParaBackend(rota, data, domain);
                setstate('success');


                setmsg(mensagem.message);


            } else {
                const errorMessage = 'Falha na valida  o: ' + result.mensagens.join(', ');
                setmsg(errorMessage);

                if (errorMessage.includes('Sistema ja existente')) {
                    setstate('warning');
                } else {
                    setstate('error');
                }
            }
        } catch (error) {
            console.error('Erro durante a valida  o ou chamada para o backend:', error);

            if (error.response) {
                if (error.response.status === 422) {
                    const errorMessage = 'Erro de valida  o: ' + 'Sistema ja existente';
                    setmsg(errorMessage);
                    setstate('warning');
                } else {
                    const errorMessage = 'Erro de valida  o: ' + 'Imposs vel desabilitar o grupo. Existem usu rios no mesmo.';
                    setmsg(errorMessage);
                    setstate('warning');
                }
            } else {
                const errorMessage = 'Erro desconhecido: ' + error.message;
                setmsg(errorMessage);
                setstate('warning');
            }
        }
    };

    return (
        <>
            <div style={{ overflowY: 'auto', maxHeight: '80vh', padding: '1rem' }}>
                <Input
                    etiqueta={'Digite o nome do novo grupo'}
                    desativado={status ? false : true}
                    input={nomeDoGrupo}
                    setinput={setnomeDoGrupo}
                    tipo={'text'}
                    personalizacao={'Novo grupo'}
                    subtitulo={'Novo grupo'}
                    obrigatorio={true}
                />

                <button
                    type="button"
                    className={`btn ${status ? 'btn-danger' : 'btn-success'} mb-3`}
                    onClick={() => setstatus(!status)}
                >
                    {status ? 'Desativar' : 'Ativar'}
                </button>

                <Textarea etiqueta={'Descreva o grupo'} input={descricaoDoGrupo} setInput={setdescricaoDoGrupo} />
                <GerenciamentoGroup
                    dadosacesso={dadosacesso}
                    dadosgrupo={dadosgrupo}
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
                >
                    {listMain.map((elementid, mainIndex) => (
                        <Checkbox
                            key={`checkbox_${mainIndex}`}
                            value={systemStatus[elementid]}
                            setvalue={(newValue) => {
                                setListMain((prevList) => prevList.map((el) => (el === elementid ? newValue : el)));
                                setSystemStatus((prevStatus) => ({ ...prevStatus, [elementid]: newValue }));
                            }}
                            etiqueta={elementid}
                            image={systemStates[elementid]}
                            setimage={(image) => {
                                setSystemStates((prevStates) => ({ ...prevStates, [elementid]: image }));
                            }}
                            setimagestatus={(status) => {
                                setSystemStatus((prevStatus) => ({ ...prevStatus, [elementid]: status }));
                            }}
                            interligacao={elementid}
                        />
                    ))}
                </GerenciamentoGroup>
            </div>

            {msg && (
                <div className={`alert alert-${state}`} role="alert">
                    {msg}
                </div>
            )}

            <div className="modal-footer">
                <button type="button" className="btn btn-primary" onClick={handleSave}>
                    Salvar
                </button>
            </div>
        </>
    );
};

export default Modalbodygroupsedit;
