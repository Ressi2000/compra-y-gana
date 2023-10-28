import mongoose from "mongoose";

const formularioSchema = new mongoose.Schema({
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
  },
  numeroFactura: {
    type: String,
    required: true,
  },
  establecimientoComercial: {
    type: mongoose.Schema.Types.ObjectId,
    ref:'Locales',
    required: true,
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
  // Agregamos un campo para la ruta de la foto de la factura
  fotoFactura: {
    type: String,
    required: true,
  },
  montoFactura: {
    type: Number,
    required: true,
  },
  valorDolar: {
    type: Number,
    required: true,
  },
  terminos: {
    type: String,
    required: true,
  },
}, {
  timestamps: true
});

// Ahora, asegurémonos de que el número de factura sea único para un mismo establecimiento comercial
formularioSchema.index({ numeroFactura: 1, establecimientoComercial: 1 }, { unique: true });

formularioSchema.methods.SetImgUrl = function SetImgUrl (filename) {
  this.fotoFactura = `'http://localhost:3000/public'/${filename}`
}

export default mongoose.model('Formulario', formularioSchema);
