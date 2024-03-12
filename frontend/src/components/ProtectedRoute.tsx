import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/useAuth";

export const ProtectedRoute = ({ children }: any) => {
  const { user }: any = useAuth();
  if (!user) {
    return <Navigate to="/" />;
  }
  return children;
};
