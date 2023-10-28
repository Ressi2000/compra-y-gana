import React from "react";
import { CSVLink } from "react-csv";
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

function ExportButtons({ data }) {
  const headers = [
    { label: "Loteria", key: "_id" },
    { label: "Nombre y Apellido", key: "nombreApellido" },
    { label: "Cédula de Identidad", key: "cedulaIdentidad" },
    { label: "Número de Factura", key: "numeroFactura" },
    { label: "Establecimiento Comercial", key: "establecimientoComercial.razon_comercial" },
    { label: "Número de Contacto", key: "numeroContacto" },
    { label: "Correo Electrónico", key: "correoElectronico" },
    { label: "Lugar de Visita", key: "lugarDeVisita" },
    { label: "Tiendas Frecuentadas", key: "tiendasFrecuentadas" },
    { label: "Términos y Condiciones", key: "terminos" },
    // Quitar "Foto de Factura" de las columnas de Excel
  ];

  const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  const fileExtension = '.xlsx';

  const exportToCSV = () => {
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const dataExcel = new Blob([excelBuffer], {type: fileType});
    FileSaver.saveAs(dataExcel, 'formularios' + fileExtension);
  }

  return (
    <div className="">
      <CSVLink
        data={data}
        headers={headers}
        filename={"formularios.csv"}
        className="bg-indigo-500 text-white p-3 text-center rounded-lg"
      >
        Exportar a CSV
      </CSVLink>
      <button onClick={exportToCSV} className="bg-green-500 ml-5 text-white p-3 text-center rounded-lg">
        Exportar a Excel
      </button>
    </div>
  );
}

export default ExportButtons;