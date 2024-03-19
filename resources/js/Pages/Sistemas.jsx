import Main from '../Layouts/main';
import { Sistemas } from '../Components/index'
import useEncaminhar from '../hooks/functions/encaminhar/useEncaminhar';
import { useCookies } from 'react-cookie';
import { useUser } from '../userContext'


const Home = () => {

    const { statusSideBar, setstatusSideBar } = useUser();


    const [cookies] = useCookies(['user']);
    const valorDoCookie = cookies['user'];
    const encaminharPara = useEncaminhar();

	console.log('valorDoCookie: ',valorDoCookie )



if (valorDoCookie === 1) {
return (
        <>
            <Main statusSideBar={statusSideBar} setStatusSideBar={setstatusSideBar} titulo={'Sistemas'} conteudoPrincipal={<Sistemas />} />
        </>    )
} else{
    
    encaminharPara('/');
    return null; // Certifique-se de retornar algo na ramificação else

}






         }

export default Home;
