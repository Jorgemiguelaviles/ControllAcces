// Modalbodygroup.jsx
import React, { useState, useEffect } from 'react';
import { Input, Textarea, Gerenciamento, Checkbox } from '../index';
import seta_baixo from '../../assets/seta-para-baixo.png';
import useCreate from '../../hooks/UseCreate'
import { useUser } from '../../userContext'

const Modalbodygroup = ({ setVisible, visible, dados }) => {
    const { domain } = useUser()
    const [msg, setmsg] = useState('');
    const [nomeDoGrupo, setnomeDoGrupo] = useState('');
    const [descricaoDoGrupo, setdescricaoDoGrupo] = useState('');

    const [listMain, setListMain] = useState([]);
    const [systemStates, setSystemStates] = useState({});
    const [systemStatus, setSystemStatus] = useState({});
    const [systemimageStatus, setSystemimageStatus] = useState({});
    const [state, setstate] = useState('danger');


    useEffect(() => {


        const fetchData = async () => {
            try {
                const newListMain = [];
                const newSystemStates = {};
                const newSystemStatus = {};
                const newSystemimageStatus = {};

                dados.message[0].forEach((element) => {
                    const sistema = element.nome_do_sistema;

                    newListMain.push(sistema);
                    newSystemStates[sistema] = seta_baixo;
                    newSystemStatus[sistema] = element.status;
                    newSystemimageStatus[sistema] = false;

                });

                setListMain(newListMain);
                setSystemStates(newSystemStates);
                setSystemStatus(newSystemStatus);
                setSystemimageStatus(newSystemimageStatus)
            } catch (error) {
                console.error('Erro ao obter dados:', error);
            }
        };

        fetchData();
    }, []);

    const [listSecondary, setListSecondary] = useState([]);
    const [listSecondaryID, setListSecondaryID] = useState([]);
    const [systemSecondary, setSystemSecondary] = useState({});
    const [systemStatusSecondary, setSystemStatusSecondary] = useState({});
    const [StatusAccess, setStatusAccess] = useState([]);

    useEffect(() => {
        const fetchDataSecondary = async () => {
            try {
                const newListSecondary = [];
                const newListSecondaryID = [];
                const newStatusAccess = [];
                const newSystemStatesSecondary = {};
                const newSystemStatusSecondary = {};

                dados.message[0].forEach((elementid) => {
                    dados.message[1].forEach((element) => {
                        const id = elementid.id;
                        const system_id = element.system_id;
                        if (id === system_id) {
                            newStatusAccess.push(element.status)
                            newListSecondary.push(element.nome_do_acesso);
                            newListSecondaryID.push(id);
                            newSystemStatesSecondary[id] = seta_baixo;
                        }
                    });
                });

                dados.message[1].forEach((elementid) => {
                    newSystemStatusSecondary[elementid.id] = false;
                });

                setListSecondary(newListSecondary);
                setListSecondaryID(newListSecondaryID);
                setSystemSecondary(newSystemStatesSecondary);
                setSystemStatusSecondary(newSystemStatusSecondary);
                setStatusAccess(newStatusAccess)
            } catch (error) {
                console.error('Erro ao obter dados secundários:', error);
            }
        };

        fetchDataSecondary();
    }, []);

    const { validarGroup, enviarDadosParaBackend } = useCreate();

    const handleSave = async () => {

        try {
            const result = await validarGroup(nomeDoGrupo);
            setstate('danger')

            if (result.sucesso) {
                const data = {
                    database: dados,
                    nomeDoGrupo: nomeDoGrupo,
                    descricaoDoGrupo: descricaoDoGrupo,
                    listMain: listMain,
                    listSecondary: listSecondary,
                    listSecondaryID: listSecondaryID,
                    systemStatusSecondary: systemStatusSecondary,
                    StatusAccess: StatusAccess,
                };

                const rota = `${domain}CreateGroup`;

                // Lógica para tratamento de sucesso
                let response = await enviarDadosParaBackend(rota, data, domain);

                setmsg(response.message)
                //setmsg(response.message)
                setstate('success')

                // Se a solicitação for bem-sucedida, apresente uma mensagem de sucesso
                if (response.status === 200) {
                    setmsg('Sistema criado com sucesso!');
                    setstate('success')
                    // Você pode definir a mensagem de sucesso ou fazer outras ações aqui
                }
            } else {
                // Lógica para tratar as mensagens de erro durante a validação
                setmsg('Falha na validação: ' + result.mensagens.join(', '));
            }
        } catch (error) {
            // Lógica para tratar erros durante a validação ou chamada para o backend
            console.error('Erro durante a validação ou chamada para o backend:', error);

            // Verifica se é um erro de resposta do servidor
            if (error.response) {
                // Se o servidor retornou um código de erro (ex: 422), trate conforme necessário
                if (error.response.status === 422) {
                    setmsg('Erro de validação: ' + 'Sistema ja existente');
                    setstate('warning')
                } else {
                    // Outro tratamento de erro de resposta do servidor
                    setmsg('Erro do servidor: ' + error.response.data.message);
                }
            } else {
                // Outro tratamento de erro, que não é uma resposta do servidor
                setmsg('Erro desconhecido: ' + error.message);
            }
        }
    };



    useEffect(() => {
        setmsg('');
    }, [nomeDoGrupo, descricaoDoGrupo]);


    return (
        <>
            <div style={{ overflowY: 'auto', maxHeight: '80vh', padding: '1rem' }}>
                <Input
                    etiqueta={'Digite o nome do novo grupo'}
                    desativado={false}
                    input={nomeDoGrupo}
                    setinput={setnomeDoGrupo}
                    tipo={'text'}
                    personalizacao={'Novo grupo'}
                    subtitulo={'Novo grupo'}
                    obrigatorio={true}
                />
                <Textarea etiqueta={'Descreva o grupo'} input={descricaoDoGrupo} setInput={setdescricaoDoGrupo} />
                <Gerenciamento
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
                </Gerenciamento>
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

export default Modalbodygroup;
