import Formulario from "../models/formulario.model.js";
import { getDolarForm } from "./dolar.controller.js";
import Locales from "../models/locales.js";
import Crm from "../models/crm.model.js";

// Enviar el Formulario
export const sendForm = async (req, res) => {
  try {
    const datosFormulario = req.body;
    const datosCrm = req.body;
    const { numeroFactura, establecimientoComercial, montoFactura } = datosFormulario;
    const { nombreApellido, edad, sexo, cedulaIdentidad, numeroContacto, correoElectronico, lugarDeVisita, tiendasFrecuentadas } = datosCrm;

    // Obtener la cotización del dólar actual
    const cotizacionActual = await getDolarForm();
    // console.log(cotizacionActual.price)

    if (cotizacionActual && cotizacionActual.price) {
      // Continuar con la conversión y validación
      const montoEnDolares = montoFactura / cotizacionActual.price;

      datosFormulario.valorDolar = cotizacionActual.price;

      // Verificar si el monto en dólares es mayor que $20
      if (montoEnDolares <= 20) {
        return res.status(400).json(["El monto en dólares debe ser mayor que $20 para participar." ]);
      }
    } else {
      return res.status(500).json(['No se pudo obtener el valor del dólar' ]);
    }

    // Verificar si ya existe un formulario con el mismo número de factura en el mismo establecimiento
    const existeFormulario = await Formulario.findOne({
      numeroFactura,
      establecimientoComercial,
    });

    if (existeFormulario) {
      return res.status(400).json(["El número de factura ya existe en este establecimiento." ]);
    }

    // Comprueba si se ha subido una foto y la almacena en la base de datos
    if (req.file) {
      // Si se ha subido una foto, puedes acceder a ella con req.file
      const fotoFactura = req.file.filename;

      if (fotoFactura.size > 5 * 1024 * 1024) {
        return res.status(400).json(['El tamaño de la imagen de la factura debe ser máximo de 5 MB.' ]);
      }
      // Asigna el nombre de la foto de factura a los datos del formulario
      datosFormulario.fotoFactura = fotoFactura;
    } else {
      return res.status(400).json(['No has enviado ninguna imagen' ]);
    }

    const formulario = new Formulario(datosFormulario);
    await formulario.save();
    

    // Verificar si ya existe un registro en la tabla 'crm' con la misma cédula
    const existingCrmRecord = await Crm.findOne({ cedulaIdentidad });

    if (existingCrmRecord) {
      // La cédula ya existe en la tabla 'crm', no hagas nada y sigue con el flujo normal
    } else {
      // La cédula no existe en la tabla 'crm', procede con la inserción
      const crmData = {
        nombreApellido,
        edad,
        sexo,
        cedulaIdentidad,
        numeroContacto,
        correoElectronico,
        lugarDeVisita,
        tiendasFrecuentadas,
      };

      const crmRecord = new Crm(crmData);
      await crmRecord.save();
    }
    res.status(201).json({ message: "Formulario creado exitosamente." });
  } catch (error) {
    res.status(500).json(['Hubo un error al guardar el formulario' ]);
  }
};

//Mostrar Formularios
export const viewForms = async (req, res) => {
  try {
    const formularios = await Formulario.find({
      
    }).populate('establecimientoComercial', 'razon_comercial');
    res.status(200).json(formularios);
  } catch (error) {
    res.status(500).json({ error: 'Hubo un error al obtener los formularios' });
  }
}

//Mostrar Locales del Select
export const storeForms = async (req, res) => {
 
  try {
    console.log(res)
    const store = await Locales.find();
    res.status(200).json(store);    
    // console.log(store)
  } catch (error) {
    res.status(500).json({ error: 'Hubo un error al obtener los locales' });
  }
}