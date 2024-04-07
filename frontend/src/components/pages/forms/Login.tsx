import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAuth } from "../../../Context/useAuth";
import { useForm } from "react-hook-form";

type Props = {};

type LoginFormsInputs = {
  userName: string;
  password: string;
};

const validation = Yup.object().shape({
  userName: Yup.string().required("Username is required"),
  password: Yup.string().required("Password is required"),
});

const LoginComponent = (props: Props) => {
  const { loginUser } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormsInputs>({ resolver: yupResolver(validation) });

  const handleLogin = (formData: LoginFormsInputs) => {
    loginUser(formData.userName, formData.password);
  };

  return (
    <form onSubmit={handleSubmit(handleLogin)}>
      <h1>Login</h1>
      <input
        {...register("userName")}
        type="text"
        placeholder="E-mail"
        required
      />
      {errors.userName && <p>{errors.userName.message}</p>}
      <input
        {...register("password")}
        type="password"
        placeholder="Senha"
        required
      />
      {errors.password && <p>{errors.password.message}</p>}
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginComponent;
