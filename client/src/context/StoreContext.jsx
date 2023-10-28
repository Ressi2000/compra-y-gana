import React, { createContext, useContext, useEffect, useState } from "react";
import { createStoreRequest, deleteStoreRequest, getStoreEditRequest, getStoreRequest, getStoresRequest, updateStoreRequest } from "../api/store";


const StoreContext = createContext();

export const useStore= () => {
    const context = useContext(StoreContext);
    if(!context){
        throw new Error("useStore debe estar dentro de un Provider");
    }
    return context;
}

export function StoreProvider( { children }) {
    const [stores, setStores] = useState([]);
    const [errors, setErrors] = useState([]);

    //Mostrar Locales en el Select
    const getStore = async () => {
        try {
            const res = await getStoreRequest();
            setStores(res.data);
        } catch (error) {
            console.error("Error al obtener los resultados:", error);
        }
    }
    //Mostrar Locales en la Tabla
    const getStoreTable = async () => {
        try {
            const res = await getStoresRequest();
            setStores(res.data);
        } catch (error) {
            console.error("Error al obtener los resultados:", error);
        }
    }

    const createStore = async (stores) => {
        const res = await createStoreRequest(stores);
        //console.log(res);
    };

    //Editar Local
    const getStoreEdit = async (id) => {
        try {
            const res = await getStoreEditRequest(id);
            return res.data; // retorna los datos de la respuesta
        } catch (error) {
            console.error("Error al obtener el local:", error);
        }
    }

    //Actualizar Locales
    const updateStore = async (id, store) => {
        try {
            const res = await updateStoreRequest(id, store);
            console.log(res);
            if (res.status === 200) {
                // El local se actualizó con éxito en el servidor
                console.log("Local actualizado exitosamente");
                // Actualizar el state para reflejar el local actualizada
                const updatedStore = stores.map((t) => (t._id === id ? res.data : t));
                setStores(updatedStore);
                // Puedes realizar cualquier otra acción que necesites después de actualizar el local
            } else {
                console.log("Error al actualizar el local");
                // Puedes manejar errores aquí si es necesario
            }
        } catch (error) {
            console.error("Error al actualizar el local:", error);
            // Maneja cualquier error de solicitud o excepción aquí
        }
    };
    
    //Borrar Locales
    const deleteStore = async (id) => {
        try {
          const res = await deleteStoreRequest(id); // Debes tener una función deleteTaskRequest(id) en tu archivo de solicitudes
        console.log(res)
          if (res.status === 204) {
            // El local se eliminó con éxito en el servidor
            console.log("Local eliminado exitosamente");
            // Filtrar y actualizar el state para quitar el local del array
            let filteredStore = stores.filter((t) => t._id !== id);
            setStores(filteredStore);
            // Puedes realizar cualquier otra acción que necesites después de eliminar el local
          } else {
            console.log("Error al eliminar el local");
            // Puedes manejar errores aquí si es necesario
          }
        } catch (error) {
          console.error("Error al eliminar el local:", error);
          // Maneja cualquier error de solicitud o excepción aquí
        }
    };


    return(
        <StoreContext.Provider value={{ stores, getStore, getStoreTable, createStore, getStoreEdit, updateStore, deleteStore, errors,}}>
            {children}
        </StoreContext.Provider>
    );

}