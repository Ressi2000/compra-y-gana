import Crm from "../models/crm.model.js";

//Mostrar CRM
export const viewCrm = async (req, res) => {
    try {
      const crm = await Crm.find();
      res.status(200).json(crm);
    } catch (error) {
      res.status(500).json({ error: 'Hubo un error al obtener los crm' });
    }
}