import Task from "../models/task.model.js";

// Mostrar todas las tareas
export const getTasks = async (req, res) => {
    try {
      const tasks = await Task.find({
        user: req.user.id
      }).populate('user');
      res.json(tasks);
    } catch (error) {
      console.error("Error al obtener tareas:", error);
      res.status(500).json({ message: "Error interno del servidor" });
    }
  }
  
  // Crear una tarea
  export const createTask = async (req, res) => {
    try {
      // Obtener los datos del cuerpo de la solicitud
      const { title, description, date } = req.body;
      // Crear una nueva Tarea
      const newTask = new Task({
        title,
        description,
        date,
        user: req.user.id
      });
      // Guardar la nueva tarea en la base de datos
      const savedTask = await newTask.save();
      // Mensaje de respuesta
      res.json(savedTask);
    } catch (error) {
      console.error("Error al crear la tarea:", error);
      res.status(500).json({ message: "Error interno del servidor" });
    }
  }
  
//Mostrar una tarea
export const getTask = async (req, res) => {
   try{
    const task = await Task.findById(req.params.id).populate('user');
    if(!task) return res.status(404).json({ message: "Tarea no encontrada" })
    res.json(task);
   } catch {
    res.status(404).json({message: "Error al obtener la tarea"})
   }
  }

// Actualizar una tarea
export const updateTask = async (req, res) => {
    try {
      const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      if (!task) return res.status(404).json({ message: "Tarea no encontrada" });
      res.json(task);
    } catch (error) {
      console.error("Error al actualizar la tarea:", error);
      res.status(500).json({ message: "Error interno del servidor" });
    }
  }
  
  // Eliminar una tarea
  export const deleteTask = async (req, res) => {
    try {
      const task = await Task.findByIdAndDelete(req.params.id);
      if (!task) return res.status(404).json({ message: "Tarea no encontrada" });
      return res.sendStatus(204);
    } catch (error) {
      console.error("Error al eliminar la tarea:", error);
      res.status(500).json({ message: "Error interno del servidor" });
    }
  }
  