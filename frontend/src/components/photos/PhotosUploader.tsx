import React, { useState } from "react";
import axios from "axios";

import { FaCloudUploadAlt } from "react-icons/fa";
import styles from "./photos.module.css";

const PhotosUploader: React.FC = () => {
    const [file, setFile] = useState<File | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };

    const handleSubmit = async () => {
        if (!file) return;

        try {
            const formData = new FormData();
            formData.append('image', file);

            await axios.post('http://localhost:3006/:userId/photos', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            alert('Photo uploaded successfully');
        } catch (error) {
            console.error('Error uploading photo:', error);
        }
    };

    return (
        <form action="">
            <input 
                type="file" 
                id="upload" 
                accept=".jpeg, .png, .gif, .jpg" 
                hidden 
                onChange={handleFileChange}
            />
            <label 
                onClick={handleSubmit} 
                htmlFor="upload" 
                className={styles.uploadLabel}
            >
                <span><FaCloudUploadAlt /></span>
                <p>Clique para Enviar</p>
            </label>
        </form>
    )
}

export default PhotosUploader;