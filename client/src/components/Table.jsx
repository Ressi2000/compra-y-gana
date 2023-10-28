import React, { useEffect, useState } from "react";
import { useTable, usePagination, useAsyncDebounce } from "react-table";

const MyTable = ({ data }) => {
  //console.log(data);
  const columns = React.useMemo(
    () => [
      {
        Header: "Loteria",
        accessor: "_id",
      },
      {
        Header: "Nombre y Apellido",
        accessor: "nombreApellido",
      },
      {
        Header: "Cédula de Identidad",
        accessor: "cedulaIdentidad",
      },
      {
        Header: "Número de Factura",
        accessor: "numeroFactura",
      },
      {
        Header: "Imagen de la Factura",
        accessor: "fotoFactura",
        Cell: ({ row }) => (
          <a href={`http://localhost:3000/public/${row.original.fotoFactura}`} download target="_blank">
            <img
            src={`http://localhost:3000/public/${row.original.fotoFactura}`} // Reemplaza URL_BASE con la URL base de tus imágenes
            alt={row.original.numeroFactura}
            className="w-10 h-10 rounded-full mx-auto mb-2"
          />
          </a>
        ),
      },
    ],
    []
  );

  const [filter, setFilter] = useState([""]);
  const [filteredData, setFilteredData] = useState(data);

  useEffect(() => {
    setFilteredData(data);
  }, [data]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data: filteredData, // Usar los datos sin filtrar
      initialState: { pageSize: 5 },
    },
    usePagination
  );

  const debouncedFilterData = useAsyncDebounce((filterValue) => {
    // Filtra los datos en función del valor del filtro
    const filtered = data.filter((row) => {
      return Object.values(row).some((value) =>
        value.toString().toLowerCase().includes(filterValue.toLowerCase())
      );
    });
    setFilteredData(filtered);
  }, 200);

  const pageCount = Math.ceil(data.length / pageSize);

  return (
    <div className="w-full relative overflow-x-auto shadow-md sm:rounded-lg">
      <div className="relative my-2 ">
        <input
          type="text"
          className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Buscar..."
          value={filter}
          onChange={(e) => {
            setFilter(e.target.value);
            debouncedFilterData(e.target.value);
          }}
        />
      </div>
      <table
        {...getTableProps()}
        className="w-full text-sm text-left text-gray-500 dark:text-gray-400"
      >
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()} className="px-6 py-3 ">
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <tr
                {...row.getRowProps()}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                {row.cells.map((cell) => {
                  return (
                    <td
                      {...cell.getCellProps()}
                      className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      {cell.render("Cell")}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="flex items-center justify-between pt-4">
        <div className=" py-2">
          Mostrar{" "}
          <select
            className="py-2 px-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 "
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
            }}
          >
            {[5, 10, 50].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                {pageSize}
              </option>
            ))}
          </select>{" "}
          filas por página
        </div>
        <div className="py-2">
          <button
            className="bg-indigo-500 text-white p-2 text-center rounded-lg"
            onClick={() => previousPage()}
            disabled={!canPreviousPage}
          >
            Anterior
          </button>{" "}
          <button
            className="bg-indigo-500 text-white p-2 text-center rounded-lg"
            onClick={() => nextPage()}
            disabled={!canNextPage}
          >
            Siguiente
          </button>
          <div>
            Página{" "}
            <strong>
              {pageIndex + 1} de {pageCount}
            </strong>{" "}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyTable;
