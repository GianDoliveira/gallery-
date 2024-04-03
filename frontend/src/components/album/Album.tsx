import Navbar from "../pages/Navbar/Navbar";
import styles from "./album.module.css";

const Album = () => {
    return (
        <main className={styles.main}>
            <Navbar />
            <section className={styles.container}>
                <p>Albúms estão aqui!</p>
            </section>
        </main>
    )
}

export default Album;