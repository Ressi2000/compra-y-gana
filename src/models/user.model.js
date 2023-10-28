import mongoose from "mongoose";

const usuarioSchema = new mongoose.Schema({
    nombre_apellido: {
        type: String,
        required: true,
        trim: true
    },
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    password: {
        type: mongoose.Schema.Types.Mixed,
        minlength: 8,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    id_rol: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'Rol',
        required: true,
        default: "65281ea8f0adc639e0a33154", // Valor por defecto
    },
    status: {
        type: String,
        required: true,
        default: "ON", // Valor por defecto
    },
}, {
    timestamps: true
});

const Usuario = mongoose.model("Usuario", usuarioSchema);

export default Usuario;
