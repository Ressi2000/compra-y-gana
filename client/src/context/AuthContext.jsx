import { createContext, useState, useContext, useEffect } from "react";
import { registerRequest, loginRequest, verifyTokenRequest } from "../api/auth";
import Cookies from 'js-cookie';

export const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if(!context){
        throw new Error("useAuth debe estar dentro de un Provider");
    }
    return context;
}

export const AuthProvider = ({children}) => {
   const [user, setUser] = useState(null);
   const [isAuthenticated, setIsAuthenticated] = useState(false);
   const [errors, setErrors] = useState([]);
   const [loading, setLoading ] = useState(true);

   const signUp = async (user) => {
        try{
            const res  = await registerRequest(user);
            setUser(res.data.usuarioGuardado);
            setIsAuthenticated(true);
        }catch (error) {
            console.log(error.response);
            setErrors(error.response.data);
        }
    }

    const signIn = async (user) => {
        try{
            const res  = await loginRequest(user);
            //console.log(res.data.user);
            setUser(res.data.user);
            setIsAuthenticated(true);
        }catch (error) {
            if(Array.isArray(error.response.data)) {
                return setErrors(error.response.data)
            } else {
                setErrors("Error de inicio de sesión. Verifica tus credenciales.");
            }
        }
    };

    const logout = async () => {
        try {
            // Realiza una solicitud de cierre de sesión al backend, si es necesario
            // Esto es un ejemplo, reemplaza con tu lógica real
            // Aquí puedes eliminar la cookie u otras tareas de limpieza
            // Luego, establece isAuthenticated en false y borra el usuario
            // para indicar que el usuario ha cerrado la sesión
            setIsAuthenticated(false);
            setUser(null);
            Cookies.remove('token'); // Elimina la cookie del token de autenticación
        } catch (error) {
            console.log("Error al cerrar sesión:", error);
        }
    };

    useEffect(() => {
        async function checkLogin() {
            const cookies = Cookies.get();
            if (!cookies.token) {
                setIsAuthenticated(false);
                setUser(null);
            } else {
                try {
                    const res = await verifyTokenRequest(cookies.token);
                    if (!res.data) {
                        setIsAuthenticated(false);
                    } else {
                        setIsAuthenticated(true);
                        setUser(res.data);
                    }
                } catch (error) {
                    console.log(error);
                    setIsAuthenticated(false);
                    setUser(null);
                }
            }
    
            // Finaliza la carga una vez que se complete la verificación
            setLoading(false);
        }
    
        checkLogin();
    }, []);
    
    useEffect(() => {
        if (errors.length > 0) {
            const timer = setTimeout(() => {
                setErrors([]);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [errors]);


   return(
        <AuthContext.Provider value={{signUp, signIn, logout, loading, user, isAuthenticated, errors, }}>
            {children}
        </AuthContext.Provider>
   );
};