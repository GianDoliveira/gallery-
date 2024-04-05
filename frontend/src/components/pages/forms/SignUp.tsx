const SignUpComponent = () => {
    return (
        <form>
            <h1>Cadastre-se</h1>
            <input
                type="text" placeholder="Nome de usuário" required
            />
            <input
                type="email" placeholder="E-mail" required
            />
            <input
                type="password" placeholder="Senha" required
            />
            <button type='submit'>Cadastrar</button>
        </form>
    )
}

export default SignUpComponent;