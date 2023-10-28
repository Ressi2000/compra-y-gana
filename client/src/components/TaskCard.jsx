import { Link } from "react-router-dom";
import { useTask } from "../context/TaskContext";

function TaskCard({ task }) {

    const {deleteTask} = useTask();
    return (
        <div className="m-4 max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <div className="relative">
                <a href="#">
                    <img className="rounded-t-lg w-full" src="https://images.vexels.com/media/users/3/152133/raw/b5d509f8fa813fb3136e2da1f36df154-ilustracion-de-iconos-de-escuela-de-tarea.jpg" alt="" />
                </a>
                <div className="p-5">
                    <header>
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{task.title}</h5>
                    </header>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 overflow-hidden" style={{ wordWrap: 'break-word' }}>
                        {task.description}
                    </p>
                    <p>
                        {new Date(task.date).toLocaleDateString()}
                    </p>
                </div>
            </div>
            <div className="p-5 flex justify-between">
                <Link to={`/admin/tasks/${task._id}`} className="w-1/3 items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    Editar
                </Link>
                <button onClick={() => {
                    deleteTask(task._id)
                }} className="w-1/3 items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    Eliminar
                </button>
            </div>
        </div>
    );
}

export default TaskCard;
