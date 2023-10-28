import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

function ProtectedRoute() {
    const { loading, isAuthenticated } = useAuth(); // Corrección: useAuth es una función
    //console.log(loading, isAuthenticated);
    if (loading) return <h1>
        Loading....
    </h1>
    if (!loading && !isAuthenticated) return <Navigate to="/admin/login" replace />;
    return <Outlet />;
}

export default ProtectedRoute;