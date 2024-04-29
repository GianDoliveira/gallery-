import { useEffect } from "react";
import { usePhoto } from "../../Context/photoContext";
import { useAuth } from "../../Context/useAuth";

const PhotoList = () => {
    const { photos, getPhotos } = usePhoto();
    const { user } = useAuth();

    useEffect(() => {
        const fetchPhotos = async () => {
            const userId = user?.id;
            getPhotos(userId);
        };
        fetchPhotos();
    }, [getPhotos]);

    return (
        <section>
            <p>Fotos</p>
            <ul>
                {Array.isArray(photos) &&
                    photos.map((photo) => (
                        <li key={photo.id}>
                            <img src={photo.imageUrl} alt={photo.title} />
                            <h2>{photo.title}</h2>
                            <p>{photo.description}</p>
                        </li>
                    ))}
            </ul>
        </section>
    );
};

export default PhotoList;
