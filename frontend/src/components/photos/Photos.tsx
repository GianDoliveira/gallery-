import { useState, useEffect } from 'react';
import styles from "./photos.module.css";
import axios from "axios";

import PhotosUploader from "./PhotosUploader";
import PhotosList from "./PhotosList";

const PhotosComponent = () => {
    const [photosList, setphotosList] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const fetchPhotos = async () => {
            try {
                const response = await axios.get(`http://localhost:3006/photos`);
                setphotosList(response.data);
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching photos:', error);
                setIsLoading(false);
            }
        };
        if (!isLoading && photosList.length == 0) {
            setIsLoaded(true);
        }

        fetchPhotos();
    }, [isLoading, photosList]);

    return (
        <div>
            <h1>Suas Fotos!</h1>
            {isLoaded ? (
                <main className={styles.main}>
                    <section className={styles.container}>
                        <div className={styles.inputBx}>
                            <h2 className={styles.titleUpload}>Envie a sua imagem</h2>
                            <PhotosUploader />
                        </div>
                    </section>
                </main>
            ) : (
                <div className={styles.main}>
                    <PhotosList/>
                </div>
            )}
        </div>
    )
}


export default PhotosComponent;