import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

function RegisterPage() {
    const { handleSubmit, register, formState: {errors} } = useForm();
    const { signUp, isAuthenticated, errors: registerErrors } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if(isAuthenticated) navigate('/admin/tasks')
    }, [isAuthenticated] )

    const Onsubmit = handleSubmit(async (values) => {
        signUp(values);
    });

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="bg-zinc-800 max-w-md p-10 rounded-md">
                <div className="relative text-center mb-6">
                    <img
                        src="data:image/png;base64,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"
                        alt="Imagen de perfil"
                        className="w-20 h-20 rounded-full mx-auto mb-2"
                    />
                    <p>Administración de Compra y Gana</p>
                    <p>Formulario de Registro</p>
                </div>
                {
                    registerErrors.map((errors, i) => (
                        <div className="bg-red-500 p-2 my-2" key={i}>
                            {errors}
                        </div>
                    ))
                }
                <form onSubmit={ Onsubmit }>
                    <label htmlFor="nombre_apellido">Nombre y Apellido</label>
                    <input type="text" { ...register("nombre_apellido", { required: true })}
                        className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                    />
                    {
                        errors.nombre_apellido && <p className="text-red-500"> El nombre y apellido son requeridos</p>
                    }
                    <label htmlFor="username">Username</label>
                    <input type="text" { ...register("username", { required: true })}
                        className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                    />
                    {
                        errors.username && <p className="text-red-500"> El username es requerido </p>
                    }
                    <label htmlFor="password">Password</label>
                    <input type="password" { ...register("password", { required: true })}
                        className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                    />
                    {
                        errors.password && <p className="text-red-500"> La constraseña es requerida</p>
                    }
                    <label htmlFor="email">Email</label>
                    <input type="email" { ...register("email", { required: true })}
                        className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                    />
                    {
                        errors.email && <p className="text-red-500"> El email es requerido</p>
                    }
                    <div className="flex justify-center items-center p-2"> 
                        <button type="submit"
                            data-te-ripple-init
                            data-te-ripple-color="light"
                            className="bg-indigo-700 text-white font-semibold py-2 px-4 rounded hover:bg-indigo-800"
                        >
                            Registrarse
                        </button>
                    </div>

                    <p>¿Ya tienes una cuenta? <Link to="/admin/login" className="text-indigo-500 font-bold">Iniciar Sesión</Link> </p>

                </form>

            </div>
        </div>
    );
}

export default RegisterPage;
