import './styles.css';
import React, { useEffect, useRef } from 'react';

const FormsComponent: React.FC = () => {

    const containerRef = useRef<HTMLDivElement>(null);
    const registerBtnRef = useRef<HTMLButtonElement>(null);
    const loginBtnRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        const container = containerRef.current;
        const registerBtn = registerBtnRef.current;
        const loginBtn = loginBtnRef.current;

        registerBtn?.addEventListener('click', () => {
            container?.classList.add("active");
        });

        loginBtn?.addEventListener('click', () => {
            container?.classList.remove("active");
        });
    }, []);

    return (
        <main>
            <section className="container" ref={containerRef} id="container">
                <div className="form-container sign-up">
                    <form>
                        <h1>Cadastre-se</h1>
                        <div className="social-icons">
                            <a href="#"></a>
                            <a href="#"></a>
                            <a href="#"></a>
                        </div>
                        <span>ou use seu e-mail para cadastro</span>
                        <input type="text" id="username" placeholder="Nome de usuário" />
                        <input type="email" id="email1" placeholder="E-mail" />
                        <input type="password" id="password1" placeholder="Senha" />
                        <button>Cadastrar</button>
                    </form>
                </div>
                <div className="form-container sign-in">
                    <form>
                        <h1>Login</h1>
                        <div className="social-icons">
                            <a href="#"></a>
                            <a href="#"></a>
                            <a href="#"></a>
                        </div>
                        <span>ou use seu e-mail e senha</span>
                        <input type="email" id="email2" placeholder="E-mail" />
                        <input type="password" id="password2" placeholder="Senha" />
                        <a href="#">Esqueceu a sua senha ?</a>
                        <button>Login</button>
                    </form>
                </div>
                <div className="toggle-container">
                    <div className="toggle">
                        <div className="toggle-panel toggle-left">
                            <h1>Bem-vindo de volta!</h1>
                            <p>Insira seus dados pessoais para usar todos os recursos do site</p>
                            <button
                                className="hidden"
                                id="login"
                                ref={loginBtnRef}
                            >
                                Login
                            </button>
                        </div>
                        <div className="toggle-panel toggle-right">
                            <h1>A paz, amigo!</h1>
                            <p>Registre-se com seus dados pessoais para usar todos os recursos do site</p>
                            <button
                                className="hidden"
                                id="register"
                                ref={registerBtnRef}
                            >
                                Cadastre-se
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}

export default FormsComponent;