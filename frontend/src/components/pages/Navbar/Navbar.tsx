import styles from "./navbar.module.css"
import { Link } from "react-router-dom";
import { useAuth } from "../../../Context/useAuth";

interface Props { }

const Navbar = (props: Props) => {
    const { isLoggedIn, logout } = useAuth();
    return (
        <nav className={styles.navbar}>
            <div>
                {isLoggedIn() ? (
                    <ul className={styles.navLogin}>
                        <li><Link to="/fotos">Fotos</Link></li>
                        <li><Link to="/album">Albúm</Link></li>
                        <li><Link to="/">Lixeira</Link></li>
                        <button className={styles.logout} onClick={logout}>Sair</button>
                    </ul>
                ) : (
                    <ul className={styles.container}>
                        <li>
                            <Link to="/login" className="hover:text-darkBlue">
                                Login
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/register"
                                className="px-8 py-3 font-bold rounded text-white bg-lightGreen hover:opacity-70"
                            >
                                Cadastre-se
                            </Link>
                        </li>
                    </ul>
                )}
            </div>
        </nav>
    )
}

export default Navbar;


