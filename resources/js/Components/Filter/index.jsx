import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Input } from '../index'
import enviarDadosParaBackend from '../../hooks/functions/submitbackend/submitbackend'
import { useUser } from '../../userContext';


const Filter = ({ setLoading, domain, rotaBack, subtitulo, filter, setFilter, setDataFilter, setDataFilterBool, setMsg }) => {


	const { mobile, setMobile } = useUser();
	const [larguraFilter, setLarguraFilter] = useState();


    function filtrarandLoading() {
        setMsg()
        setLoading(true)
        filtrar()
    }

    async function filtrar() {
        try {
            const data = { filter: filter, }

            let response = await enviarDadosParaBackend(rotaBack, data, domain);
            console.log('response', response)

            setDataFilter(response)
            setDataFilterBool(true)
        } catch (error) {
            console.log(error.response.data.message)
            console.error('Ocorreu um erro:', error);
            if (error.response.data.message === 'The filter field is required.') {

                setMsg("O filtro precisa ser prenchido")
                // Lidar com o erro, se necessário
            }

        }
    }

    useEffect(() => {
	if(mobile === 'desktop'){
	
	} else{
	
	}
        
    }, []);




    return (
        <>
            <div className="d-flex flex-column">
                <div className="row">
                    <Input obrigatorio={false} etiqueta={'Filtrar'} desativado={false} input={filter} setinput={setFilter} tipo={'text'} subtitulo={subtitulo} />
                </div>
                <div className="row">
                    <button className="btn btn-outline-success" onClick={filtrarandLoading}>Filtrar dados</button>
                </div>
            </div>
        </>


    )
};

Filter.propTypes = {
    domain: PropTypes.string.isRequired,
    rotaBack: PropTypes.string.isRequired,
    setData: PropTypes.node.isRequired,
    filter: PropTypes.node.isRequired,
    setFilter: PropTypes.node.isRequired,
    subtitulo: PropTypes.string.isRequired,
};

export default Filter;
