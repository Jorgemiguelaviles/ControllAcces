import React, { useState, useEffect } from 'react';
import { Input, RandomBarChart, Submit } from '../Components/index';
import useLogin from '../hooks/UseLogin';
import useEncaminhar from '../hooks/functions/encaminhar/useEncaminhar';
import { useCookies } from 'react-cookie';
import { useUser } from '../userContext';
import ReCAPTCHA from "react-google-recaptcha";

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [msg, setMsg] = useState('');
    const [data, setData] = useState('');
    const [captcha, setCaptcha] = useState(false);
    const { login } = useLogin();
    const [cookies, setCookie] = useCookies(['user', 'nome', 'rotaDasFotos'], { initial: { user: false, nome: false, rotaDasFotos: false } });
    const encaminharPara = useEncaminhar();
    const { domain, mobile, setMobile } = useUser();
    

  const handleResize = () => {
        let largura = window.innerWidth;
        if (largura >= 1024) {
setMobile('desktop')
                    } else if (largura >= 768) {
setMobile('tablet')
                    } else if (largura >= 480) {
setMobile('mobile')
                   } else {
setMobile('celular')
                    }
    };

    const onChangeCaptcha = (value) => {
        setCaptcha(value);
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        if (captcha) {
            await handleLogin();
        } else {
            setMsg('Por favor, preencha o captcha');
        }
    };

    const handleLogin = async () => {
        const rota1 = `${domain}api/validalogin`;
        const data = {
            'g-recaptcha-response': captcha,
            email: email,
            password: password,
        };

        const mensagem = await login(rota1, data, domain);
        setMsg(mensagem.message);
        setData(mensagem.data);

        // Atualiza os cookies com os novos dados
        setCookie('user', mensagem.data.TI || undefined, { maxAge: 900000 });
        setCookie('nome', mensagem.data.Nome || undefined, { maxAge: 900000 });
        setCookie('rotaDasFotos', mensagem.data.rotaDaFoto || undefined, { maxAge: 900000 });

        if (mensagem.data && mensagem.data.TI) {
            encaminharPara('/Home');
        }
    };

    useEffect(() => {
        handleResize(); // Chama a função de redimensionamento quando o componente é montado
        window.addEventListener('resize', handleResize); // Adiciona o ouvinte de redimensionamento

        return () => {
            window.removeEventListener('resize', handleResize); // Remove o ouvinte de redimensionamento ao desmontar o componente
        };
    }, []); // Passa um array vazio como segundo argumento para garantir que este efeito só seja executado uma vez

    useEffect(() => {
        if (data && data.TI) {
            encaminharPara('/Home');
        }
    }, [data, encaminharPara]);





    return (
        mobile === 'desktop' ? (
            <div style={{ display: 'flex', height: '100vh' }}>
                <div style={{ flex: 1, backgroundColor: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <RandomBarChart isDesktop ={mobile}/>
                </div>
                <div style={{ flex: 1, background: '#333', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ border: '1px solid white', padding: '20px', borderRadius: '10px' }}>
                        <h1 style={{ color: 'white' }}>Efetue o seu Login</h1>
                        <Input etiqueta={'Usuario'} desativado={false} input={email} setinput={setEmail} tipo={'text'} personalizacao={'basic-addon1'} subtitulo={'@'} />
                        <Input etiqueta={'Senha'} desativado={false} input={password} setinput={setPassword} tipo={'password'} personalizacao={'basic-addon2'} subtitulo={'#'} />
                        <div style={{ flex: 1,  display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>

			<ReCAPTCHA
                            sitekey="6LdKZokpAAAAAJ7UqFSb4FGQp_AaNpKJhitGMwdg"
                            onChange={onChangeCaptcha}
                        />
</div>
                        <Submit descricao={'Entrar'} funcao={handleFormSubmit} />
                        {msg && (
                            <div style={{ color: 'red', paddingLeft: '20px' }}>
                                {Array.isArray(msg) ? (
                                    msg.map((mensagem, index) => (
                                        <p key={index} style={{ margin: 0 }}>{mensagem}</p>
                                    ))
                                ) : (
                                    <p style={{ margin: 0 }}>{msg}</p>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        ) : (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh'  }}>
    <div style={{ flex: 3, backgroundColor: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', maxWidth: '100%', maxHeight: '80%' }}>
        <RandomBarChart style={{ width: '80%', height: '100%' }} />
    </div>
    <div style={{ flex: 9, background: '#333', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
        <div style={{ width: "100%", margin:"30px",border: '1px solid white', padding: '30px', borderRadius: '10px' }}>
            <h1 style={{ color: 'white' }}>Efetue o seu Login</h1>
            <Input etiqueta={'Usuario'} desativado={false} input={email} setinput={setEmail} tipo={'text'} personalizacao={'basic-addon1'} subtitulo={'@'} />
            <Input etiqueta={'Senha'} desativado={false} input={password} setinput={setPassword} tipo={'password'} personalizacao={'basic-addon2'} subtitulo={'#'} />
<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
    <ReCAPTCHA
        sitekey="6LdKZokpAAAAAJ7UqFSb4FGQp_AaNpKJhitGMwdg"
        onChange={onChangeCaptcha}
            />
</div>
            <Submit descricao={'Entrar'} funcao={handleFormSubmit} />
            {msg && (
                <div style={{ color: 'red', paddingLeft: '20px' }}>
                    {Array.isArray(msg) ? (
                        msg.map((mensagem, index) => (
                            <p key={index} style={{ margin: 0 }}>{mensagem}</p>
                        ))
                    ) : (
                        <p style={{ margin: 0 }}>{msg}</p>
                    )}
                </div>
            )}
        </div>
    </div>
</div>
        )
    );
};

export default LoginPage;
