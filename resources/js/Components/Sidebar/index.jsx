// Sidebar.js
import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { Imagens } from '../index';
import retorno from '../../assets/retorno.png';
import Image from '../../assets/barra-lateral.png';
import DefaultImage from '../../assets/logo.png';
import { useCookies } from 'react-cookie';
import { Link } from 'react-router-dom';
import { useUser } from '../../userContext';

export default function Sidebar({ open, setOpen }) {
    const [sidebar, setSidebar] = useState(true);
    const [sidebar2, setSidebar2] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [projeto, setProjeto] = useState(false);
    const [torres, setTorres] = useState(false);
    const [cookies] = useCookies(['user', 'nome', 'rotaDasFotos']);
    const { nome, rotaDasFotos } = cookies;
    const { domain, mobile, setMobile } = useUser();
    const [largurasidabar, setlargurasidabar] = useState();
    const [imguseraltura, setimguseraltura] = useState();
    const [imguserlargura, setimguserlargura] = useState();




    const handleResize = () => {
        setIsDesktop(window.innerWidth >= 1024);
    };

    const toggleSidebar = () => {
        setOpen((prevState) => !prevState);
    };

    const toggleProjeto = () => {
        setProjeto((prevState) => !prevState);
    };

    const toggleTorres = () => {
        setTorres((prevState) => !prevState);
    };

    useEffect(() => {
if(mobile == 'desktop'){
setlargurasidabar(50)
setimguseraltura('8rem')
setimguserlargura('8rem')
}
else{
setlargurasidabar(75)
setimguseraltura('4rem')
setimguserlargura('4rem')

}


        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        window.addEventListener('resize', handleResize);
        handleResize();

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <>
            {open && (
                <div
                    className={'d-flex flex-column justify-content-start align-items-center w-{largurasidabar}'}
                    style={{
                        background: '#333',
                        position: 'fixed',
                        left: '0',
                        top: '0',
                        padding: '3rem',
                        height: '100%',
                    }}
                >
                    <div style={{ position: 'relative' }}>

                        <Button
                            onClick={toggleSidebar}
                            style={{
                                backgroundColor: '#333',
                                borderColor: '#333',
                                color: '#fff',
                                height: '4.375rem',
                                width: '4.375rem',
                                position: 'relative',
                                top: '0rem',
                                left: '-5rem',
                                zIndex: '2000',// Ajuste o z-index para um valor maior que a Sidebar
                            }}
                        >
                            <Imagens src={retorno} altura="2rem" />
                        </Button>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem 0' }}>
                        {rotaDasFotos !== 'undefined' ? (
                            <Imagens src={cookies.rotaDasFotos} altura={imguseraltura} largura={imguserlargura} />
                        ) : (
                            <Imagens src={DefaultImage} altura={imguseraltura} largura={imguserlargura} />
                        )}

                        <p style={{ color: 'white' }}>Nome: {nome}</p>
                        <p style={{ color: 'white' }}>TI</p>
                    </div>

                    <div className="d-flex flex-column align-items-center justify-content-center" style={{ overflowY: 'auto', marginTop: '1rem' }}>
                        <h5 style={{ color: '#fff', fontWeight: 'bold', fontSize: '1.2rem', margin: '1rem 0' }}>Fun&ccedil;&eth;es</h5>
                        <Button
                            onClick={toggleProjeto}
                            style={{
                                backgroundColor: '#222',
                                borderColor: '#222',
                                color: '#fff',
                                margin: '0.3125rem 0',
                                padding: '2rem ',
                                zIndex: '1001', // Ajuste o z-index para um valor mais alto que a Sidebar
                            }}
                        >
                            Controle de acesso
                        </Button>
                        {projeto && (
                            <>
                                <Link to="/Sistemas" className="nav-link" style={{ color: 'white', margin: '0.125rem 0' }}>
                                    Controles
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            )}
            {!open && (
                <div
                    style={{
                        background: '#333',
                        width: '4.375rem',
                        height: '4.375rem',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        zIndex: '1001', // Ajuste o z-index para um valor mais alto que a Sidebar

                    }}
                >
                    <Button
                        onClick={toggleSidebar}
                        style={{
                            backgroundColor: '#333',
                            borderColor: '#333',
                            color: '#fff',
                            height: '100%',
                            width: '100%',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            zIndex: '1010', // Ajuste o z-index para um valor maior que a Sidebar e o botão de abrir
                        }}
                    >
                        <Imagens src={Image} altura="50%" />
                    </Button>
                </div>
            )}

        </>
    );
}
