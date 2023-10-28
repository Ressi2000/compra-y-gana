import React, { createContext, useContext, useEffect, useState } from "react";
import { getFormsRequest, createFormRequest } from "../api/formulario";


const FormContext = createContext();

export const useForms = () => {
    const context = useContext(FormContext);
    if(!context){
        throw new Error("useForm debe estar dentro de un Provider");
    }
    return context;
}

export function FormProvider( { children }) {
    const [forms, setForms] = useState([]);
    const [errors, setErrors] = useState([]);
    
    
    
    const createForm = async (formData) => {
        try {
          // Asegúrate de configurar la opción `headers` para indicar que estás enviando un formulario multipart
          const config = {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          };
          // Realiza la solicitud POST al servidor
          const res = await createFormRequest(formData, config);
          // console.log(res);
      
          if (res.status === 201) {
            console.log("Formulario enviado con éxito.");
            return res; 
          } else {
            console.error("Error al enviar el formulario. Respuesta inesperada:", res);
            throw new Error(res);
          }
        } catch (error) {
          console.error("Error al enviar el formulario:", error);
          setErrors(error.response.data);
          throw error;
        }
    };
      

    const getForms = async () => {
        try {
            const res = await getFormsRequest();
            const formsData = res.data; // Obtener los datos de la respuesta
            //console.log('getForms', formsData);
            setForms(formsData);
            //console.log(res);
        } catch (error) {
            console.error("Error al obtener los resultados:", error);
        }
    }

    useEffect(() => {
      if (errors.length > 0) {
          const timer = setTimeout(() => {
              setErrors([]);
          }, 5000);
          return () => clearTimeout(timer);
      }
    }, [errors]);

   
  
    
    return(
        <FormContext.Provider value={{ forms, createForm, getForms, errors,}}>
            {children}
        </FormContext.Provider>
    );
}