import React from 'react';
import { Sidebar } from '../Components';
import useDeslogin from '../hooks/UseDeslogin';
import { useUser } from '../userContext';


const Main = ({ titulo, conteudoPrincipal, statusSideBar, setStatusSideBar }) => {

    const { deslogar } = useDeslogin();
    const { domain, mobile, setMobile } = useUser();
console.log(mobile)


    return ( mobile === 'desktop'?(
        <div>
            <div className="row" style={{ paddingBottom: '5rem' }}>

                <nav className="navbar navbar-expand-lg navbar-light" style={{ background: '#333', height: '5rem', width: '100%', zIndex: '100' }}>
                    <div className="container-fluid">
                        {/* Sidebar */}
                        <div style={{ width: '20%' }}>
                            <Sidebar open={statusSideBar} setOpen={setStatusSideBar} />

                        </div>


                        {/* Título */}
                        <h3 className="navbar-brand mb-0 text-white">
				{titulo}
			</h3>

                        {/* Botão de deslogar */}
                        <div style={{ width: '20%' }}>
                            <button
                                className="btn btn-outline-success btn-lg btn-block rounded-pill"
                                onClick={() => deslogar('/')}
                            >
                                Deslogar
                            </button>
                        </div>

                    </div>
                </nav>


                {/*<nav className="navbar navbar-expand-lg navbar-light fixed-top" style={{ background: '#333', height: '5rem', width: '100%', zIndex: '100' }}>
                    <div className="container-fluid navbar navbar-expand-lg navbar-light">
                        <div className="collapse navbar-collapse d-flex justify-content-end" id="navbarNav">
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <h3 style={{ color: 'white' }}>
                                        {titulo}
                                    </h3>
                                </li>
                            </ul>

                        </div>
                        <div className="collapse navbar-collapse d-flex justify-content-end" id="navbarNav">
                            <div className="row" >
                                <div className="col text-center">
                                    <button
                                        className="btn btn-success col-sm-2 col-form-label col-form-label-sm w-10"
                                    >
                                        Deslogar
                                    </button>
                                </div>
                            </div>

                        </div>

                    </div>
    </nav>*/}
            </div>
            <div className="row" style={{ paddingTop: '5rem' }}>
                <div className="d-flex justify-content-center w-100">
                    {conteudoPrincipal}
                </div>
            </div>
        </div>): (
<div>
            <div className="row" style={{ paddingBottom: '5rem' }}>

                <nav className="navbar navbar-expand-lg navbar-light" style={{ background: '#333', height: '5rem', width: '100%', zIndex: '100' }}>
                    <div className="container-fluid">
                        {/* Sidebar */}
                        <div style={{ width: '20%' }}>
                            <Sidebar open={statusSideBar} setOpen={setStatusSideBar} />
                        </div>

                        {/* Título */}
                        <h3 className="navbar-brand mb-0 text-white">{titulo}</h3>

                        {/* Botão de deslogar */}
                        <div style={{ width: '20%' }}>
                            <button
                                className="btn btn-outline-success btn-sm btn-block rounded-pill"
                                onClick={() => deslogar('/')}
				width= '35%'
                            >
                                Deslogar
                            </button>
                        </div>

                    </div>
                </nav>


                {/*<nav className="navbar navbar-expand-lg navbar-light fixed-top" style={{ background: '#333', height: '5rem', width: '100%', zIndex: '100' }}>
                    <div className="container-fluid navbar navbar-expand-lg navbar-light">
                        <div className="collapse navbar-collapse d-flex justify-content-end" id="navbarNav">
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <h5 style={{ color: 'white' }}>
                                        {titulo}
                                    </h5>
                                </li>
                            </ul>

                        </div>
                        <div className="collapse navbar-collapse d-flex justify-content-end" id="navbarNav">
    				<div className="row" >
        				<div className="col text-center">
            					<button className="btn btn-success col-form-label col-form-label-sm w-10">
                					Deslogar
            					</button>
        				</div>
    				</div>
			</div>
                    </div>
    	      </nav>*/}
            </div>
            <div className="row" style={{ paddingTop: '5rem' }}>
                <div className="d-flex justify-content-center w-100">
                    {conteudoPrincipal}
                </div>
            </div>
        </div>	)
    	);
	}

export default Main;
