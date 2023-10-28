import Locales from "../models/locales.js";

//Mostrar Locales
export const getStores = async (req, res) => {
 
    try {
      console.log(res)
      const store = await Locales.find();
      res.status(200).json(store);    
      // console.log(store)
    } catch (error) {
      res.status(500).json({ error: 'Hubo un error al obtener los locales' });
    }
  }
//Ingresar Nuevos Locales Comerciales
  export const createStore = async (req, res) => {
    try {
      // Obtener los datos del cuerpo de la solicitud
      const { razon_comercial } = req.body;
      // Crear una nueva Tarea
      const newStore = new Locales({
        razon_comercial
      });
      // Guardar la nueva tarea en la base de datos
      const savedStore = await newStore.save();
      // Mensaje de respuesta
      res.json(savedStore);
    } catch (error) {
      console.error("Error al crear el local:", error);
      res.status(500).json({ message: "Error interno del servidor" });
    }
  }
//Mostrar un Local Comercial
export const getStore = async (req, res) => {
  try{
   const store = await Locales.findById(req.params.id);
   if(!store) return res.status(404).json({ message: "Local no encontrada" })
   res.json(store);
  } catch {
   res.status(404).json({message: "Error al obtener el local"})
  }
}
// Actualizar un Local Comercial
export const updateStore = async (req, res) => {
  try {
    const store = await Locales.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!store) return res.status(404).json({ message: "Local no encontrado" });
    res.json(store);
  } catch (error) {
    console.error("Error al actualizar el local:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
}
//Eliminar un Local Comercial
export const deleteStore = async (req, res) => {
  try {
    const store = await Locales.findByIdAndDelete(req.params.id);
    if (!store) return res.status(404).json({ message: "Local no encontrado" });
    return res.sendStatus(204);
  } catch (error) {
    console.error("Error al eliminar el local:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
}