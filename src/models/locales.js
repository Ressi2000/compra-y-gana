import mongoose from "mongoose";

const localesSchema = new mongoose.Schema({
    razon_comercial: {
        type: String,
        required: true,
        trim: true
    },
    // Otros campos de locales si los necesitas
}, {
    timestamps: true
});

const Locales = mongoose.model("Locales", localesSchema);

export default Locales;