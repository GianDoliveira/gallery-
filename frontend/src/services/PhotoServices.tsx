import axios from "axios";
import { handleError } from "../Helpers/ErrorHandler";
import { PhotoProfile } from "../Models/ModelType";
import { useAuth } from "../Context/useAuth";

const { token } = useAuth();

const api = axios.create({
    baseURL: 'http://localhost:3006',
    headers: {
        Authorization: `Bearer ${token}`,
    },
});

export const photoGet = async () => {
    try {
        const { data } = await axios.get<PhotoProfile[]>(`${api}}/photos`)
        return data;
    } catch (error) {
        handleError(error);
    }
}

export const photoPost = async () => {
    try {
        const { data } = await axios.post<PhotoProfile[]>(`${api}/photos`)
        return data;
    } catch (error) {
        handleError(error);
    }
}

export const photoUpdate = async () => {
    try {
        const { data } = await axios.put<PhotoProfile[]>(`${api}/photos/update`)
        return data;
    } catch (error) {
        handleError(error);
    }
}

export const photoDelete = async (id: number) => {
    try {
        const { data } = await axios.delete<PhotoProfile[]>(`${api}/photos/delete/${id}`)
        return data;
    } catch (error) {
        handleError(error);
    }
}