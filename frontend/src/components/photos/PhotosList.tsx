import React, { useEffect, useState } from 'react';
import axios from "axios";

interface Photos {
    id: number;
    title: string;
    description: string;
    imageUrl: string;
}

interface PhotosListProps {
    photos: Photos[];
}

const PhotosList: React.FC<PhotosListProps> = ({ photos }) => {
    const [isPhotos, setPhotos] = useState<Photos[]>([]);

    useEffect(() => {
        const fetchPhotos = async () => {
            try {
                const response = await axios.get('http://localhost:3006/:userId/photos');
                setPhotos(response.data);
            } catch (error) {
                console.error('Error fetching photos', error);
            }
        };

        fetchPhotos();
    }, [])

    return (
        <section>
            <p>data</p>
            <ul>
                {Array.isArray(isPhotos) && isPhotos.map((photo) => (
                    <li key={photo.id}>
                        <img src={photo.imageUrl} alt={photo.title} />
                        <h2>{photo.title}</h2>
                        <p>{photo.description}</p>
                    </li>
                ))}
            </ul>
        </section>
    )
}

export default PhotosList;