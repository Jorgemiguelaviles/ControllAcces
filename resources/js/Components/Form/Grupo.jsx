import React, { useState, useEffect } from 'react';
import { Steppers3passos, ModalSelectCorpos, Modalbodygroup, Filter, TableGroup, TableGroupFilter } from '../index';
import useCreateTable from '../../hooks/UseCreateTable';
import { useUser } from '../../userContext';

const Setores = () => {
    const [filter, setFilter] = useState('');
    const { domain } = useUser();
    const [visible, setVisible] = useState(false);
    const getBackendData = useCreateTable();
    const [datasistemas, setDatasistemas] = useState(null);
    const [data, setdata] = useState(null);
    const [DataUser, setDataUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [dataFilter, setDataFilter] = useState(null);
    const [dataSistemasFilter, setDataSistemasFilter] = useState(null);
    const [dataUserFilter, setDataUserFilter] = useState(null);
    const [dataFilterBool, setDataFilterBool] = useState(false);
    const [isSecondEffectCompleted, setIsSecondEffectCompleted] = useState(false);
    const [msg, setMsg] = useState();

    const rota = `${domain}filterGroup`;

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
                setdata(resultGroup);
            } catch (error) {
                console.error('Erro ao obter dados do backend:', error);
            } finally {
                // Atualiza o estado de loading quando ambas as requisições forem completadas
                setIsSecondEffectCompleted(true);
            }
        };

        fetchData();
    }, [data, getBackendData]);

    useEffect(() => {
        if (isSecondEffectCompleted) {
            setLoading(false);
        }
    }, [isSecondEffectCompleted, dataFilter]);

    return (
        <div className="d-flex flex-column align-items-center w-75">
            <div className="mb-4">
                <Steppers3passos rota1={'/Sistemas'} rota2={'/Grupo'} rota3={'/Usuarios'} ativo1={false} ativo2={true} ativo3={false} />
            </div>
            <div className="mb-4">
                <Filter setLoading={setLoading} domain={domain} rotaBack={rota} subtitulo={'Filtrar grupos'} filter={filter} setFilter={setFilter} setDataFilter={setDataFilter} setDataFilterBool={setDataFilterBool} setMsg={setMsg} />
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
                            <ModalSelectCorpos setVisible={setVisible} visible={visible} descricao={'Criar um novo grupo'} titulo={'Cadastro de novos grupos'} corpomodal={<Modalbodygroup setVisible={setVisible} visible={visible} dados={datasistemas} />} />
                            <TableGroupFilter DadosGrupo={dataFilter} DadosSistema={datasistemas} />
                        </>
                    ) : (
                        <>
                            <ModalSelectCorpos setVisible={setVisible} visible={visible} descricao={'Criar um novo grupo'} titulo={'Cadastro de novos grupos'} corpomodal={<Modalbodygroup setVisible={setVisible} visible={visible} dados={datasistemas} />} />
                            <TableGroup DadosGrupo={data} DadosSistema={datasistemas} />
                        </>
                    )
                )}
            </div>
        </div>
    );
}

export default Setores;
