import { createContext, useState } from "react";
import { PhotoProfile } from "../Models/ModelType";
import { handleError } from "../Helpers/ErrorHandler";
import { toast } from "react-toastify";
import React from "react";
import axios from "axios";

type PhotoContextType = {
  photos: PhotoProfile[] | null;
  getPhotos: (userId: number) => void;
  uploadPhoto: (userId: number, photoData: FormData) => void;
  updatePhoto: (userId: number, photoId: number, updatedData: Partial<PhotoProfile>) => void;
  deletePhoto: (userId: number, photoId: number) => void;
};

type Props = { children: React.ReactNode };

const PhotoContext = createContext<PhotoContextType>({} as PhotoContextType);

export const PhotoProvider = ({ children }: Props) => {
  const [photos, setPhotos] = useState<PhotoProfile[] | null>(null);
  const [isReady, setIsReady] = useState(false);

  const getPhotos = async (userId: number) => {
    try {
      const { data } = await axios.get<PhotoProfile[]>(`http://localhost:3006/${userId}/photos`);
      setPhotos(data);
      setIsReady(true)
    } catch (error) {
      handleError(error);
    }
  };

  const uploadPhoto = async (userId: number, photoData: FormData) => {
    try {
      const { data } = await axios.post<PhotoProfile[]>(`http://localhost:3006/${userId}/photos`, photoData);
      setPhotos(data);
      toast.success("Photo uploaded successfully");
    } catch (error) {
      handleError(error);
    }
  };

  const updatePhoto = async (userId: number, photoId: number, updatedData: Partial<PhotoProfile>) => {
    try {
      const { data } = await axios.put<PhotoProfile[]>(`http://localhost:3006/${userId}/photos/update/${photoId}`, updatedData);
      setPhotos(data);
      toast.success("Photo updated successfully");
    } catch (error) {
      handleError(error);
    }
  };

  const deletePhoto = async (userId: number, photoId: number) => {
    try {
      await axios.delete<PhotoProfile[]>(`http://localhost:3006/${userId}/photos/delete/${photoId}`);
      setPhotos(prevPhotos => (prevPhotos ? prevPhotos.filter(photo => photo.id !== photoId) : []));
      toast.success("Photo deleted successfully");
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <PhotoContext.Provider
      value={{ photos, getPhotos, uploadPhoto, updatePhoto, deletePhoto }}
    >
      {isReady ? children : null}
    </PhotoContext.Provider>
  );
};

export const usePhoto = () => React.useContext(PhotoContext);
