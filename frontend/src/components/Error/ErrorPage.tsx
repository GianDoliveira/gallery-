import { useRouteError } from "react-router-dom";
import styles from './error.module.css';

function ErrorPage() {

    const error:any = useRouteError();
    console.error(error);

    return (
        <section className={styles.container}>
            <h1>ERROR 404</h1>
            <p>Página não encontrada</p>
            <p>
                <i>{error.statusText || error.message}</i>
            </p>
        </section>
    )
}

export default ErrorPage;