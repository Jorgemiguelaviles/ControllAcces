import React, { useState, useEffect } from 'react';
import { Steppers3passos, ModalSelectCorpos, Modalbodysistems, Filter, TableSystem, TableSystemFilter } from '../index';
import useCreateTable from '../../hooks/UseCreateTable';
import { useUser } from '../../userContext';

const Sistemas = () => {
    const [filter, setFilter] = useState('');
    const [visible, setVisible] = useState(false);
    const getBackendData = useCreateTable();
    const [data, setData] = useState(null);
    const [dataFilter, setDataFilter] = useState(null);
    const [dataFilterBool, setDataFilterBool] = useState(false);
    const [loading, setLoading] = useState(true);
    const { domain, mobile, setMobile } = useUser();
    const [isSecondEffectCompleted, setIsSecondEffectCompleted] = useState(false);
    const [msg, setMsg] = useState();

    const rota = `${domain}filterSystem`;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await getBackendData(`${domain}getSistemas`, domain);
                setData(result);
            } catch (error) {
                console.error('Erro ao obter dados do backend:', error);
            } finally {
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
    			<Steppers3passos rota1={'/Sistemas'} rota2={'/Grupo'} rota3={'/Usuarios'} ativo1={true} ativo2={false} ativo3={false} />
		</div>
		<div className="mb-4">
    			<Filter setLoading={setLoading} domain={domain} rotaBack={rota} subtitulo={'Filtrar sistemas'} filter={filter} setFilter={setFilter} setDataFilter={setDataFilter} setDataFilterBool={setDataFilterBool} setMsg={setMsg} />
		</div>
            	<div className="mb-4 ">
                	<ModalSelectCorpos setVisible={setVisible} visible={visible} descricao={'Criar um novo sistema'} titulo={'Cadastro de novos sistemas'} corpomodal={<Modalbodysistems setVisible={setVisible} visible={visible} />} />



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
                ) : dataFilterBool ? (
                    <TableSystemFilter Dados={dataFilter} />
                ) : (
                    <TableSystem Dados={data} />
                )}
            </div>
        </div>
    );
};

export default Sistemas;
