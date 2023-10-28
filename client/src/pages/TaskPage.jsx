import { useEffect } from "react";
import { Link } from 'react-router-dom';
import { useTask } from "../context/TaskContext";
import TaskCard from "../components/TaskCard";

function TaskPage() {
    const { getTasks, tasks, getDolar, dolarValue } = useTask();

    useEffect(() => {
        getTasks();
        getDolar();
    }, []);

    return (
        <div className="p-4">
            <div className=" flex justify-between">
                <Link to="/admin/add-task" className="inline-block bg-indigo-500 text-white font-bold px-4 py-2 rounded-lg mb-4">
                    Agregar tarea
                </Link>
                <p className="font-medium">Valor del dólar de hoy: <span className="text-blue-600">{dolarValue}</span></p>
            </div>
            <div className="grid grid-cols-3 gap-2">
                {tasks.length > 0 ? (
                    tasks.map((task, index) => (
                        <TaskCard task={task} key={index}/>
                    ))
                ) : (
                    <p className="bg-indigo-500 text-white p-5 text-center rounded-lg w-full">
                        No hay tareas disponibles.
                    </p>
                )}
            </div>
        </div>
    );
}

export default TaskPage;
