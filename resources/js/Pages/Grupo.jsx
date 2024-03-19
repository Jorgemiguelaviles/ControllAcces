import Main from '../Layouts/main';
import { Grupo } from '../Components/index'
import useEncaminhar from '../hooks/functions/encaminhar/useEncaminhar';
import { useCookies } from 'react-cookie';
import { useUser } from '../userContext'

const GrupoPage = () => {

    const { statusSideBar, setstatusSideBar } = useUser();
    const [cookies] = useCookies(['user']);

    const valorDoCookie = cookies['user'];
    const encaminharPara = useEncaminhar();
   if (valorDoCookie === 1) {
 return (
        <div>
            <Main statusSideBar={statusSideBar} setStatusSideBar={setstatusSideBar} titulo={'Grupos'} conteudoPrincipal={<Grupo />} />
        </div>
    );
} else{
    
    encaminharPara('/');
    return null; // Certifique-se de retornar algo na ramificação else

}

   

}

export default GrupoPage;
