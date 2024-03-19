import React, { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';


// Crie o contexto
const UserContext = createContext();

// Crie um componente provedor para envolver sua aplica��o
export const UserProvider = ({ children }) => {

const [mobile, setMobile] = useState('');

    const [nome, setNome] = useState('');
    const [statusSideBar, setstatusSideBar] = useState(true);
    const [foto, setFoto] = useState('');
    const [domain, setDomain] = useState('http://162.240.102.146:5174/');


    // Verificar se cookies � uma array antes de desestruturar

    return (
        <UserContext.Provider
            value={{ nome, setNome, foto, setFoto, domain, setDomain, statusSideBar, setstatusSideBar, mobile, setMobile }}
        >
            {children}
        </UserContext.Provider>
    );
};


// Crie um hook para acessar o contexto em componentes
export const useUser = () => useContext(UserContext);

UserProvider.propTypes = {
    children: PropTypes.node.isRequired,
};


