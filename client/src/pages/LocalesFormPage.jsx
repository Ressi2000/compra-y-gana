import { useForm } from "react-hook-form";
import { useStore } from "../context/StoreContext";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";

function LocalesFormPage() {
    const { handleSubmit, register, setValue  } = useForm();
    const { createStore, getStoreEdit, updateStore, } = useStore();
    const navigate = useNavigate();
    const params = useParams();

    useEffect(() => {
        async function loadStore(){
            if(params.id){
                try {
                    const store = await getStoreEdit(params.id);
                    console.log("store", store);
                    setValue("razon_comercial", store.razon_comercial);
                } catch (error) {
                    console.error("Error al cargar el local:", error);
                }
            }
        }
        loadStore();
    }, [params.id]);

    const Onsubmit = handleSubmit(async (data) => {
        if (params.id) {
            // Si hay un ID en los parámetros, es una edición, entonces actualizamos la tarea
            await updateStore(params.id, data);
          } else {
            // Si no hay un ID en los parámetros, es una creación, entonces creamos la tarea
            await createStore(data);
          }
          navigate('/admin/stores');
    });

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="bg-zinc-800 max-w-md p-10 rounded-md">
                <div className="relative text-center mb-6"> 
                    <h1>Formulario de Locales Comerciales de C.C Las Américas</h1>
                </div>
                <form onSubmit={ Onsubmit }>
                    <label htmlFor="razon_comercial">Razón Comercial</label>
                    <input type="text" {...register("razon_comercial")}
                        className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                        autoFocus
                    />
                    <div className="flex justify-center items-center p-2"> 
                        <button type="submit"
                            data-te-ripple-init
                            data-te-ripple-color="light"
                            className="bg-indigo-700 text-white font-semibold py-2 px-4 rounded hover-bg-indigo-800"
                        >
                            {params.id ? "Actualizar" : "Guardar"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default LocalesFormPage;