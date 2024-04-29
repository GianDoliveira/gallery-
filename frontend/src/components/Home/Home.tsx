import styles from "./Home.module.css";

function Home() {
    return (
        <main>
            <div className={styles.container}>
                <header className={styles.header}>
                    <h1>Welcome to My Image Storage</h1>
                    <p>Store and organize your images with ease.</p>
                </header>
                <main className={styles.main}>
                    <p>Start by uploading your images or exploring existing ones.</p>
                    {/* Add additional content or features here */}
                </main>
            </div>
            <footer className={styles.footer}>
                <p>© Gian de Oliveira. All rigths reserved</p>
            </footer>
        </main>
    );
}

export default Home;