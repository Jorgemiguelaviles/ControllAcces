import React from 'react';
import Main from '../Layouts/main';
import { TelaPrincipal } from '../Components/index';
import { useCookies } from 'react-cookie';
import useEncaminhar from '../hooks/functions/encaminhar/useEncaminhar';
import { useUser } from '../userContext'

const Home = () => {

    const { statusSideBar, setstatusSideBar } = useUser();

    const [cookies] = useCookies(['user', 'nome', 'rotaDasFotos']);
    const valorDoCookie = cookies['user'];
    const encaminharPara = useEncaminhar();


if (valorDoCookie === 1) {
return (
        <div>
            <Main statusSideBar={statusSideBar} setStatusSideBar={setstatusSideBar} titulo={'Home'} conteudoPrincipal={<TelaPrincipal />} />
        </div>
    );} else{
    
    encaminharPara('/');
    return null; // Certifique-se de retornar algo na ramificação else

}

    
};

export default Home;
