import styles from './forms.module.css';
import React, { useEffect, useRef, useState } from 'react';
import { useAuth } from '../../contexts/useAuth';
import { FaGoogle, FaGithub, FaFacebook } from "react-icons/fa";

const FormsComponent: React.FC = () => {

    const containerRef = useRef<HTMLDivElement>(null);
    const registerBtnRef = useRef<HTMLButtonElement>(null);
    const loginBtnRef = useRef<HTMLButtonElement>(null);

    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");
    const { login }: any = useAuth();

    const handleLogin = async (e: any) => {
        e.preventDefault();
        if(email === "user" && password === "password") {
            await login({ email });
        } else {
            alert("nome de usuário ou senha inválidos")
        }
    }

    useEffect(() => {
        const container = containerRef.current;
        const registerBtn = registerBtnRef.current;
        const loginBtn = loginBtnRef.current;

        registerBtn?.addEventListener('click', () => {
            container?.classList.add(styles.active);
        });

        loginBtn?.addEventListener('click', () => {
            container?.classList.remove(styles.active);
        });
    }, []);

    return (
        <main>
            <section className={styles.container} ref={containerRef} id="container">
                <div className={`${styles.signUp} ${styles.formContainer}`}>
                    <form onSubmit={handleLogin}>
                        <h1>Cadastre-se</h1>
                        <div className={styles.socialIcons}>
                            <a href="#"><FaGoogle /></a>
                            <a href="#"><FaGithub /></a>
                            <a href="#"><FaFacebook /></a>
                        </div>
                        <span>ou use seu e-mail para cadastro</span>
                        <input type="text" id="username" placeholder="Nome de usuário" />
                        <input type="email" id="email1" placeholder="E-mail" />
                        <input type="password" id="password1" placeholder="Senha" />
                        <button>Cadastrar</button>
                    </form>
                </div>
                <div className={`${styles.formContainer} ${styles.signIn}`}>
                    <form>
                        <h1>Login</h1>
                        <div className={styles.socialIcons}>
                            <a href="#"><FaGoogle /></a>
                            <a href="#"><FaGithub /></a>
                            <a href="#"><FaFacebook /></a>
                        </div>
                        <span>ou use seu e-mail e senha</span>
                        <input type="email" id="email2" placeholder="E-mail" value={email} onChange={(e)=>setEmail(e.target.value)} />
                        <input type="password" id="password2" placeholder="Senha" value={password} onChange={(e)=>setPassword(e.target.value)} />
                        <a href="#">Esqueceu a sua senha ?</a>
                        <button type='submit'>Login</button>
                    </form>
                </div>
                <div className={styles.toggleContainer}>
                    <div className={styles.toggle}>
                        <div className={`${styles.togglePanel} ${styles.toggleLeft}`}>
                            <h1>Bem-vindo de volta!</h1>
                            <p>Insira seus dados pessoais para usar todos os recursos do site</p>
                            <button
                                className={styles.hidden}
                                id="login"
                                ref={loginBtnRef}
                            >
                                Login
                            </button>
                        </div>
                        <div className={`${styles.togglePanel} ${styles.toggleRight}`}>
                            <h1>A paz, amigo!</h1>
                            <p>Registre-se com seus dados pessoais para usar todos os recursos do site</p>
                            <button
                                className={styles.hidden}
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