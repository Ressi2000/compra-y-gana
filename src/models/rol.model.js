import mongoose from "mongoose";

const rolSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        trim: true
    },
    // Otros campos de rol si los necesitas
}, {
    timestamps: true
});

const Rol = mongoose.model("Rol", rolSchema);

export default Rol;
