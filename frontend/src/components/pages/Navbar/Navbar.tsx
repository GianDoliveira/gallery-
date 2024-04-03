import styles from "./navbar.module.css"

const Navbar =() => {
    return (
        <nav className={styles.navbar}>
                <ul>
                    <li><a href="#">Fotos</a></li>
                    <li><a href="#">Albúm</a></li>
                    <li><a href="#">Lixeira</a></li>
                </ul>
                <button className={styles.logout}>Sair</button>
        </nav>
    )
}

export default Navbar;