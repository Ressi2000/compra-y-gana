import React, { createContext, useContext, useEffect, useState } from "react";
import { getCrmsRequest } from "../api/crm";


const CrmContext = createContext();

export const useCrm = () => {
    const context = useContext(CrmContext);
    if(!context){
        throw new Error("useCrm debe estar dentro de un Provider");
    }
    return context;
}

export function CrmProvider( { children }) {
    const [crms, setCrms] = useState([]);
    const [errors, setErrors] = useState([]);
      

    const getCrms = async () => {
        try {
            const res = await getCrmsRequest();
            const crmsData = res.data; // Obtener los datos de la respuesta
            //console.log('getCrms', CrmsData);
            setCrms(crmsData);
            //console.log(res);
        } catch (error) {
            console.error("Error al obtener los resultados:", error);
        }
    }  
    
    return(
        <CrmContext.Provider value={{ crms, getCrms, errors,}}>
            {children}
        </CrmContext.Provider>
    );
}