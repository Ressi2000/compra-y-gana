import { createContext, useContext, useState } from "react";
import { createTaskRequest, getTasksRequest, deleteTaskRequest, getTaskRequest, updateTaskRequest } from "../api/task";
import { getDolarBcvRequest } from "../api/dolarBcv";
const TaskContext = createContext();

export const useTask = () => {
    const context = useContext(TaskContext);
    if(!context){
        throw new Error("useTask debe estar dentro de un Provider");
    }
    return context;
}

export function TaskProvider( { children }) {
    const [tasks, setTasks] = useState([]);
    const [dolarValue, setDolarValue] = useState(null);
    
    const createTask = async (task) => {
        const res = await createTaskRequest(task);
        //console.log(res);
    };

    const getTasks = async () => {
        try {
            const res = await getTasksRequest();
            const tasksData = res.data; // Obtener los datos de la respuesta
            // Actualizar el estado de tasks con los datos
            setTasks(tasksData);
            //console.log(res);
        } catch (error) {
            console.error("Error al obtener las tareas:", error);
        }
    }

    const deleteTask = async (id) => {
        try {
          const res = await deleteTaskRequest(id); // Debes tener una función deleteTaskRequest(id) en tu archivo de solicitudes
        console.log(res)
          if (res.status === 204) {
            // La tarea se eliminó con éxito en el servidor
            console.log("Tarea eliminada exitosamente");
            // Filtrar y actualizar el state para quitar la tarea del array
            let filteredTasks = tasks.filter((t) => t._id !== id);
            setTasks(filteredTasks);
            // Puedes realizar cualquier otra acción que necesites después de eliminar la tarea
          } else {
            console.log("Error al eliminar la tarea");
            // Puedes manejar errores aquí si es necesario
          }
        } catch (error) {
          console.error("Error al eliminar la tarea:", error);
          // Maneja cualquier error de solicitud o excepción aquí
        }
    };

    const getTask = async (id) => {
        try {
            const res = await getTaskRequest(id);
            return res.data; // retorna los datos de la respuesta
        } catch (error) {
            console.error("Error al obtener la tarea:", error);
        }
    }

    const updateTask = async (id, task) => {
        try {
            const res = await updateTaskRequest(id, task); // Debes tener una función updateTaskRequest(id, task) en tu archivo de solicitudes
            console.log(res);
            if (res.status === 200) {
                // La tarea se actualizó con éxito en el servidor
                console.log("Tarea actualizada exitosamente");
                // Actualizar el state para reflejar la tarea actualizada
                const updatedTasks = tasks.map((t) => (t._id === id ? res.data : t));
                setTasks(updatedTasks);
                // Puedes realizar cualquier otra acción que necesites después de actualizar la tarea
            } else {
                console.log("Error al actualizar la tarea");
                // Puedes manejar errores aquí si es necesario
            }
        } catch (error) {
            console.error("Error al actualizar la tarea:", error);
            // Maneja cualquier error de solicitud o excepción aquí
        }
    };

    const getDolar = async () => {
        try {
            const res = await getDolarBcvRequest();
            const dolarData = res.data.price; 
            setDolarValue(dolarData);
            //console.log(res);
            //console.log(res.data[0].value);
        } catch (error) {
            console.error("Error al obtener el Dólar BCV:", error);
        }
    }
    
    return(
        <TaskContext.Provider value={{ tasks, dolarValue, createTask, getTask, deleteTask, getTasks, updateTask, getDolar}}>
            {children}
        </TaskContext.Provider>
    );
}