import { useForm } from "react-hook-form";
import { useTask } from "../context/TaskContext";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";

function TaskFormPage() {
    const { handleSubmit, register, setValue  } = useForm();
    const { createTask, getTask, updateTask } = useTask();
    const navigate = useNavigate();
    const params = useParams();

    useEffect(() => {
        async function loadTask(){
            if(params.id){
                try {
                    const task = await getTask(params.id);
                    console.log("task", task);
                    setValue("title", task.title);
                    setValue("description", task.description);
                } catch (error) {
                    console.error("Error al cargar la tarea:", error);
                }
            }
        }
        loadTask();
    }, [params.id]);

    const Onsubmit = handleSubmit(async (data) => {
        if (params.id) {
            // Si hay un ID en los parámetros, es una edición, entonces actualizamos la tarea
            await updateTask(params.id, data);
          } else {
            // Si no hay un ID en los parámetros, es una creación, entonces creamos la tarea
            await createTask(data);
          }
          navigate('/admin/tasks');
    });

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="bg-zinc-800 max-w-md p-10 rounded-md">
                <div className="relative text-center mb-6"> 
                    <h1>Formulario de Tareas</h1>
                </div>
                <form onSubmit={ Onsubmit }>
                    <label htmlFor="title">Título</label>
                    <input type="text" {...register("title")}
                        className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                        autoFocus
                    />
                    <label htmlFor="description">Descripción</label>
                    <textarea {...register("description")}
                        rows="3"
                        className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2">
                    </textarea>
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

export default TaskFormPage;