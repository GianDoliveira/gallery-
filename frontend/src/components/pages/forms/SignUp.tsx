import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAuth } from "../../../Context/useAuth";
import { useForm } from "react-hook-form";

type Props = {};

type RegisterFormsInputs = {
    email: string;
    userName: string;
    password: string;
};

const validation = Yup.object().shape({
    email: Yup.string().required("Email is required"),
    userName: Yup.string().required("Username is required"),
    password: Yup.string().required("Password is required"),
});

const SignUpComponent = (props: Props) => {

    const { registerUser } = useAuth();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RegisterFormsInputs>({ resolver: yupResolver(validation) });

    const handleLogin = (form: RegisterFormsInputs) => {
        registerUser(form.email, form.userName, form.password);
    };

    return (
        <form onSubmit={handleSubmit(handleLogin)}>
            <h1>Cadastre-se</h1>
            <input
                type="text"
                placeholder="Nome de usuário"
                required
                {...register("userName")}
            />
            {errors.userName ? (
                <p className="text-white">{errors.userName.message}</p>
            ) : (
                ""
            )}
            <input
                type="email"
                placeholder="E-mail"
                required
                {...register("email")}
            />
            {errors.email ? (
                <p className="text-white">{errors.email.message}</p>
            ) : (
                ""
            )}
            <input
                type="password"
                placeholder="Senha"
                required
                {...register("password")}
            />
            {errors.password ? (
                <p className="text-white">{errors.password.message}</p>
            ) : (
                ""
            )}
            <button type='submit'>Cadastrar</button>
        </form>
    )
}

export default SignUpComponent;