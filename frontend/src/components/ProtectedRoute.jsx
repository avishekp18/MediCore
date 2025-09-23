import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../AuthContext.jsx";

const ProtectedRoute = ({ children }) => {
    const { isAuthenticated } = useContext(AuthContext);

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default ProtectedRoute;
