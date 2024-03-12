import { useAuth } from "../../contexts/useAuth";

useAuth

const PhotosComponent = () => {

    const { logout }: any = useAuth();

    const handleLogout = () => {
        logout();
    };

    return (
        <div>
            <h1>Fotos</h1>
            <p>aqui estão suas fotos!</p>
            <button onClick={handleLogout}>Logout</button>
        </div>
    )
}

export default PhotosComponent;