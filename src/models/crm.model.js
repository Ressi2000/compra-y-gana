import mongoose from "mongoose";

const crmSchema = new mongoose.Schema({
  nombreApellido: {
    type: String,
    required: true,
  },
  edad: {
    type: Number,
    required: true,
  },
  sexo: {
    type: String,
    required: true,
  },
  cedulaIdentidad: {
    type: String,
    required: true,
    unique: true, // Hace que el campo sea único
  },
  numeroContacto: {
    type: String,
    required: true,
  },
  correoElectronico: {
    type: String,
    required: true,
  },
  lugarDeVisita: {
    type: String,
    required: false,
  },
  tiendasFrecuentadas: {
    type: String,
    required: false,
  },

}, {
  timestamps: true
});

const Crm = mongoose.model('Crm', crmSchema);

export default Crm;
