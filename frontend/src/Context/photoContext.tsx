import { createContext, useState } from "react";
import { PhotoProfile } from "../Models/ModelType";
import { handleError } from "../Helpers/ErrorHandler";
import { toast } from "react-toastify";
import React from "react";
import axios from "axios";

type PhotoContextType = {
  photos: PhotoProfile[] | null;
  getPhotos: () => Promise<void>;
  uploadPhoto: (photoData: FormData) => Promise<void>;
  updatePhoto: (photoId: number, updatedData: Partial<PhotoProfile>) => Promise<void>;
  deletePhoto: (photoId: number) => Promise<void>;
};

type Props = { children: React.ReactNode };

const PhotoContext = createContext<PhotoContextType>({} as PhotoContextType);

export const PhotoProvider = ({ children }: Props) => {
  const [photos, setPhotos] = useState<PhotoProfile[] | null>(null);
  const [isReady, setIsReady] = useState(false);

  const getPhotos = async () => {
    try {
      const { data } = await axios.get<PhotoProfile[]>(`http://localhost:3006/photos`);
      setPhotos(data);
      setIsReady(true)
    } catch (error) {
      handleError(error);
    }
  };

  const uploadPhoto = async (photoData: FormData) => {
    try {
      const { data } = await axios.post<PhotoProfile[]>(`http://localhost:3006/photos`, photoData);
      setPhotos(data);
      toast.success("Photo uploaded successfully");
    } catch (error) {
      handleError(error);
    }
  };

  const updatePhoto = async (photoId: number, updatedData: Partial<PhotoProfile>) => {
    try {
      const { data } = await axios.put<PhotoProfile[]>(`http://localhost:3006/photos/update/${photoId}`, updatedData);
      setPhotos(data);
      toast.success("Photo updated successfully");
    } catch (error) {
      handleError(error);
    }
  };

  const deletePhoto = async (photoId: number) => {
    try {
      await axios.delete<PhotoProfile[]>(`http://localhost:3006/photos/delete/${photoId}`);
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
