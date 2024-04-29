import React, { useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { usePhoto } from "../../Context/photoContext";
import { useAuth } from "../../Context/useAuth";
import styles from "./photos.module.css";

const PhotosUploader = () => {
  const { uploadPhoto } = usePhoto();
  const { isLoggedIn, user } = useAuth();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const navigate = useNavigate();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleSubmit = async () => {
    if (!isLoggedIn()) {
      navigate('/login');
      return;
    }
    if (!selectedFile) {
      // Verifique se um arquivo foi selecionado antes de enviar
      return;
    }

    const userId = user?.id;

    const formData = new FormData();
    formData.append("photo", selectedFile);

    try {
      await uploadPhoto(userId, formData);
      // Limpe o estado após o envio bem-sucedido, se necessário
      setSelectedFile(null);
    } catch (error) {
      console.error("Erro ao enviar foto:", error);
      // Lidar com erros de envio de foto, se necessário
    }
  };

  return (
    <form>
      <input
        type="file"
        id="upload"
        accept=".jpeg, .png, .gif, .jpg"
        hidden
        onChange={handleFileChange}
      />
      <label htmlFor="upload" className={styles.uploadLabel}>
        <span><FaCloudUploadAlt /></span>
        <p>Clique para Enviar</p>
      </label>
      <button type="button" onClick={handleSubmit}>
        Enviar Foto
      </button>
    </form>
  );
};

export default PhotosUploader;
