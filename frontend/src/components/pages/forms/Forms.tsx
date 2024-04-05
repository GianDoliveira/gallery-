import styles from './forms.module.css';
import LoginComponent from './Login';
import SignUpComponent from './SignUp';

import React, { useRef, useEffect } from 'react';

const FormsComponent: React.FC = () => {

    const containerRef = useRef<HTMLDivElement>(null);
    const registerBtnRef = useRef<HTMLButtonElement>(null);
    const loginBtnRef = useRef<HTMLButtonElement>(null);

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
        <main className={styles.main}>
            <section className={styles.container} ref={containerRef} id="container">
                <div className={`${styles.signUp} ${styles.formContainer}`}>
                    <SignUpComponent />
                </div>
                <div className={`${styles.formContainer} ${styles.signIn}`}>
                    <LoginComponent/>
                </div>
                <div className={styles.toggleContainer}>
                    <div className={styles.toggle}>
                        <div className={`${styles.togglePanel} ${styles.toggleLeft}`}>
                            <h1>Bem-vindo de volta!</h1>
                            <p>Insira seus dados para usar todos os recursos do site</p>
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

