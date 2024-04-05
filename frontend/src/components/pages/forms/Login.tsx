const LoginComponent = () => {
    return (
        <form>
            <h1>Login</h1>
            <input
                type="email" placeholder="E-mail" required
            />
            <input
                type="password" placeholder="Senha" required
            />
            <button type='submit'>Login</button>
        </form>
    )
};

export default LoginComponent;