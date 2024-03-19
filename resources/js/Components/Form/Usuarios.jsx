import React, { useState, useEffect } from 'react';
import { Steppers3passos, ModalSelectCorpos, Modalbodyusers, TableUsers, Filter } from '../index'
import useCreateTable from '../../hooks/UseCreateTable'
import { useUser } from '../../userContext'

const Usuarios = () => {
    const [filter, setFilter] = useState('');
    const [visible, setVisible] = useState(false);
    const getBackendData = useCreateTable();
    const [datasistemas, setDatasistemas] = useState(null);
    const [dataFilter, setDataFilter] = useState(null);
    const [datagroup, setDataGroup] = useState(null);
    const [DataUser, setDataUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const { domain } = useUser()
    const [dataFilterBool, setDataFilterBool] = useState(false);
    const [msg, setMsg] = useState();
    const [isSecondEffectCompleted, setIsSecondEffectCompleted] = useState(false);

    const rota = `${domain}filterUser`



    useEffect(() => {
        const fetchData = async () => {
            try {
                const [resultSistemas, resultGroup, resultUser] = await Promise.all([
                    getBackendData(`${domain}getSistemas`),
                    getBackendData(`${domain}getGrupo`),
                    getBackendData(`${domain}getUsuario`)
                ]);

                setDataUser(resultUser);
                setDatasistemas(resultSistemas);
                setDataGroup(resultGroup);
            } catch (error) {
                console.error('Erro ao obter dados do backend:', error);
            } finally {
                // Atualiza o estado de loading quando ambas as requisições forem completadas
                setIsSecondEffectCompleted(true);
            }
        };

        fetchData();
    }, [datagroup, getBackendData]);

    useEffect(() => {
        if (isSecondEffectCompleted) {
            setLoading(false);
        }
    }, [isSecondEffectCompleted, dataFilter]);




    return (
        <div className="d-flex flex-column align-items-center w-75">
            <div className="mb-4"> 
                <Steppers3passos rota1={'/Sistemas'} rota2={'/Grupo'} rota3={'/Usuarios'} ativo1={false} ativo2={false} ativo3={true} />
            </div>
            <div className="mb-4">
                <Filter setLoading={setLoading} domain={domain} rotaBack={rota} subtitulo={'Filtrar usuários'} filter={filter} setFilter={setFilter} setDataFilter={setDataFilter} setDataFilterBool={setDataFilterBool} setMsg={setMsg} />
            </div>
            <div className="w-75">





                {loading && msg ? (
                    <div className="alert alert-warning mt-3" role="alert">
                        {msg}
                    </div>
                ) : loading ? (
                    <div className="text-center mt-3">
                        <div className="spinner-border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                        <p>Carregando...</p>
                    </div>
                ) : (
	dataFilterBool ? (
                    <>
                        <ModalSelectCorpos setVisible={setVisible} visible={visible} descricao={'Criar um novo usuário'} titulo={'Cadastro de novos usuários'} corpomodal={<Modalbodyusers setVisible={setVisible} visible={visible} dadosUser={DataUser} dadosSystem={datasistemas} dadosGroup={datagroup} />} />
                        <TableUsers DadosUser={dataFilter} DadosSistema={datasistemas} DadosGrupo={datagroup} />
                    </>) : (
                    <>
                        <ModalSelectCorpos setVisible={setVisible} visible={visible} descricao={'Criar um novo usuário'} titulo={'Cadastro de novos usuários'} corpomodal={<Modalbodyusers setVisible={setVisible} visible={visible} dadosUser={DataUser} dadosSystem={datasistemas} dadosGroup={datagroup} />} />
                        <TableUsers DadosUser={DataUser} DadosSistema={datasistemas} DadosGrupo={datagroup} />
                    </>
                )

                )}
            </div>
        </div>
    )
}


export default Usuarios
