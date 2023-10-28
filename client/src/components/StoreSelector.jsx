import React, { useState, useEffect } from "react";
import Select from "react-select";
import { Controller } from "react-hook-form";

const StoreSelector = ({ stores, control, errors }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredStores, setFilteredStores] = useState([]);

  useEffect(() => {
    // Filtrar las tiendas basadas en el término de búsqueda
    const filtered = stores.filter((store) =>
      store.razon_comercial.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredStores(filtered);
  }, [searchTerm, stores]);

  // Preparar las opciones para el componente Select
  const options = filteredStores.map((store) => ({
    value: store._id,
    label: store.razon_comercial,
  }));

  return (
    <div>
      {/* <label htmlFor="selectStore">Selecciona una tienda:</label>
      <input
        type="text"
        placeholder="Buscar tienda..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      /> */}
      <Controller
        name="establecimientoComercial"
        control={control} // Pasa el objeto control desde los props del formulario
        rules={{ required: "El establecimiento comercial es requerido" }}
        render={({ field }) => (
          <Select {...field} options={options} isClearable isSearchable />
        )}
      />
      {errors.establecimientoComercial && <p className="text-red-500">{errors.establecimientoComercial.message}</p>}
    </div>
  );
};

export default StoreSelector;
