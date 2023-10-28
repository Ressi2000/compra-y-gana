import { useForm } from "react-hook-form";
import { useForms } from "../context/FormContext";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Carousel from "../components/Carrusel";
import confetti from "canvas-confetti";
import { useStore } from "../context/StoreContext";
import StoreSelector from "../components/StoreSelector";
import Modal from "../components/CustomModal";

function FormularioPage() {
  const {
    handleSubmit,
    register,
    formState: { errors },
    watch,
    control,
  } = useForm();

  const { stores, getStore } = useStore();
  const errorRef = useRef(null);

  const { createForm, errors: formErrors } = useForms();
  const selectedFile = watch("fotoFactura");
  const navigate = useNavigate();

  const containerRef = useRef(null);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    // Agrega la clase al body cuando el componente se monta
    document.body.classList.add("formulario-page");
    getStore();

    return () => {
      // Quita la clase del body cuando el componente se desmonta
      document.body.classList.remove("formulario-page");
    };
  }, []);

  useEffect(() => {
    if (formErrors.length > 0 && errorRef.current) {
      errorRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [formErrors]);

  const handleClick = () => {
    const { left, top, width, height } =
      containerRef.current.getBoundingClientRect();
    const x = left + width / 2;
    const y = top + height / 2;

    confetti({
      particleCount: 200,
      startVelocity: 30,
      spread: 360,
      colors: ["#283a96", "#91c73e", "#ffce01"],
      origin: { x: x / window.innerWidth, y: y / window.innerHeight },
    });
  };

  const handleFormSubmit = (data) => {
    const formData = new FormData();

    for (const key in data) {
      if (key === "fotoFactura") {
        formData.append(key, data[key][0]);
      } else if (key === "montoFactura") {
        const value = parseFloat(data[key]).toFixed(2);
        formData.append(key, value);
      } else if (key === "establecimientoComercial") {
        formData.append(key, data[key].value);
      } else {
        formData.append(key, data[key]);
      }
    }

    createForm(formData)
      .then(() => {
        navigate("/beforeForm");
      })
      .catch((error) => {
        console.error("Error al enviar el formulario:", error);
      });
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <Carousel /> {/* Coloca el carrusel aquí */}
      <div className=" bg-slate-50 max-w-lg p-10 rounded-md my-5 border-bicolor mx-auto mb-2 shadow-lg shadow-slate-600">
        <div className="relative text-center mb-6">
          <img
            src="public/images/logo_cc_lasamericas.jpg"
            alt="Imagen de perfil"
            className="w-1/2 h-1/2 rounded-full mx-auto mb-2 shadow-lg shadow-slate-400"
          />
          <h2 className=" text-xl text-gray-900 dark:text-black font-semibold">
            COMPRA Y GANA <br /> ¡EDICIÓN 2023!
          </h2>
        </div>
        <div ref={errorRef}>
          {formErrors.map((errors, i) => (
            <div className="bg-red-500 p-2 my-2 text-white" key={i}>
              {errors}
            </div>
          ))}
        </div>
        <form
          onSubmit={handleSubmit(handleFormSubmit)}
          encType="multipart/form-data"
        >
          <p className="pb-3 text-lg font-medium text-gray-900 text-center">
            ¡Cuéntanos sobre ti!
          </p>
          <div className="mb-4">
            <label htmlFor="nombreApellido">
              Nombre y Apellidos <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              {...register("nombreApellido", {
                required: "El nombre y apellido son requeridos",
              })}
              name="nombreApellido"
              className="w-full bg-gray-300 border border-lime-500 text-gray-900 px-4 py-2 rounded-md my-2"
            />
            {errors.nombreApellido && (
              <p className="text-red-500">{errors.nombreApellido.message}</p>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="edad">
              Edad <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              {...register("edad", {
                required: "El nombre y apellido son requeridos",
                validate: (value) =>
                  (Number.isInteger(Number(value)) && Number(value) >= 18) ||
                  "La edad debe ser un número entero y mayor o igual a 18",
              })}
              name="edad"
              className="w-full bg-gray-300 border border-lime-500 text-gray-900 px-4 py-2 rounded-md my-2"
            />

            {errors.edad && (
              <p className="text-red-500">{errors.edad.message}</p>
            )}
          </div>
          <div className="mb-4">
            <p className="py-2">
              Sexo<span className="text-red-400">*</span>
            </p>
            <div className="flex items-center mb-4">
              <input
                id="masculino"
                type="radio"
                value="masculino"
                {...register("sexo", {
                  required: "Selecciona una opción",
                })}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                htmlFor="masculino"
                className="ml-2 text-sm font-medium text-gray-200 dark:text-gray-600"
              >
                Masculino
              </label>
            </div>
            <div className="flex items-center">
              <input
                id="femenino"
                type="radio"
                value="femenino"
                {...register("sexo", {
                  required: "Selecciona una opción",
                })}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                htmlFor="femenino"
                className="ml-2 text-sm font-medium text-gray-200 dark:text-gray-600"
              >
                Femenino
              </label>
            </div>
            {errors.sexo && (
              <p className="text-red-500">{errors.sexo.message}</p>
            )}
          </div>
          <div className="mb-4">
            <label>
              Cédula de Identidad<span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              {...register("cedulaIdentidad", {
                required: "La cédula de identidad es requerida",
              })}
              name="cedulaIdentidad"
              className="w-full bg-gray-300 border border-lime-500 text-gray-900 px-4 py-2 rounded-md my-2"
            />
            {errors.cedulaIdentidad && (
              <p className="text-red-500">{errors.cedulaIdentidad.message}</p>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="numeroContacto">
              Número de Contacto<span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              placeholder="Ej. 0414-1231234"
              {...register("numeroContacto", {
                required: "El número de contacto es requerido",
              })}
              name="numeroContacto"
              className="w-full bg-gray-300 border border-lime-500 text-gray-900 px-4 py-2 rounded-md my-2"
            />
            {errors.numeroContacto && (
              <p className="text-red-500">{errors.numeroContacto.message}</p>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="correoElectronico">
              Correo Electrónico<span className="text-red-400">*</span>
            </label>
            <input
              type="email"
              {...register("correoElectronico", {
                required: "El correo electrónico es requerido",
              })}
              name="correoElectronico"
              className="w-full bg-gray-300 border border-lime-500 text-gray-900 px-4 py-2 rounded-md my-2"
            />
            {errors.correoElectronico && (
              <p className="text-red-500">{errors.correoElectronico.message}</p>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="numeroFactura">
              Número de Factura<span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              placeholder="Ej. 123456"
              {...register("numeroFactura", {
                required: "El número de factura es requerido",
              })}
              name="numeroFactura"
              className="w-full bg-gray-300 border border-lime-500 text-gray-900 px-4 py-2 rounded-md my-2"
            />
            {errors.numeroFactura && (
              <p className="text-red-500">{errors.numeroFactura.message}</p>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="montoFactura">
              Monto<span className="text-red-400">*</span>
            </label>
            <input
              type="text" // Debe ser "text" para permitir la entrada de decimales
              placeholder="Ej. 950.36"
              {...register("montoFactura", {
                required: "El número de factura es requerido",
                // Puedes agregar una validación adicional para asegurarte de que el monto es un número decimal
                validate: (value) =>
                  !isNaN(parseFloat(value)) ||
                  "El monto debe ser un número decimal",
              })}
              name="montoFactura"
              className="w-full bg-gray-300 border border-lime-500 text-gray-900 px-4 py-2 rounded-md my-2"
            />
            {errors.montoFactura && (
              <p className="text-red-500">{errors.montoFactura.message}</p>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="establecimientoComercial">
              Establecimiento Comercial <span className="text-red-400">*</span>
            </label>
            <StoreSelector stores={stores} control={control} errors={errors} />
          </div>
          <div className="mb-4">
            <label htmlFor="lugarDeVisita">¿De dónde nos visitas?</label>
            <input
              type="text"
              {...register("lugarDeVisita", {
                required: "El campo es requerido",
              })}
              name="lugarDeVisita"
              className="w-full bg-gray-300 border border-lime-500 text-gray-900 px-4 py-2 rounded-md my-2"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="tiendasFrecuentadas">
              ¿Qué tiendas frecuentas en nuestro centro comercial?
            </label>
            <input
              type="text"
              {...register("tiendasFrecuentadas", {
                required: "El campo es requerido",
              })}
              name="tiendasFrecuentadas"
              className="w-full bg-gray-300 border border-lime-500 text-gray-900 px-4 py-2 rounded-md my-2"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="fotoFactura">
              Subir foto de la factura<span className="text-red-400">*</span>
            </label>
            <div className="flex items-center justify-center w-full">
              <label
                htmlFor="fotoFactura"
                className="flex flex-col items-center justify-center w-full h-50 border-2 border-gray-500 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-300 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg
                    className="w-8 h-8 mb-4 text-gray-400 dark:text-gray-500"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 16"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                    />
                  </svg>
                  <p className="mb-2 text-sm text-gray-400 dark:text-gray-500">
                    <span className="font-semibold">Click to upload</span>
                  </p>
                  <p className="text-xs text-gray-400 dark:text-gray-500">
                    JPG, JPEG, PNG (MAX. 5MB)
                  </p>
                </div>
                <input
                  id="fotoFactura"
                  type="file"
                  name="fotoFactura"
                  accept=".jpg,.jpeg,.png"
                  {...register("fotoFactura", {
                    required: "La foto de la factura es requerida",
                  })}
                  className="hidden"
                />
                <p className="mt-2 text-xs text-gray-400 dark:text-gray-500 py-1">
                  Seleccione el Archivo:{" "}
                  {selectedFile && selectedFile[0]
                    ? selectedFile[0].name
                    : "No ha seleccionado un archivo"}
                </p>
              </label>
            </div>

            {errors.fotoFactura && (
              <p className="text-red-500">{errors.fotoFactura.message}</p>
            )}
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              value="Acepta"
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              {...register("terminos", {
                required:
                  "Debe leer y aceptar los términos y condiciones del concurso",
              })}
            />
            <label
              htmlFor="terminos"
              className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-500"
            >
              He leído y acepto los{" "}
              <a
                href="#!"
                onClick={openModal}
                className="text-blue-600 dark:text-blue-500 hover:underline"
              >
                términos y condiciones del concurso
              </a>
              {errors.terminos && (
                <p className="text-red-500">{errors.terminos.message}</p>
              )}
            </label>

            <Modal
              isOpen={isModalOpen}
              closeModal={closeModal}
              title="Términos y condiciones del concurso"
            >
              <p>
                1. <br />
                2. <br />
                3. <br />
                4. <br />
                5.
              </p>
            </Modal>
          </div>
          <div
            className="flex justify-center items-center p-2"
            ref={containerRef}
          >
            <button
              type="submit"
              data-te-ripple-init
              data-te-ripple-color="light"
              className="bg-blue-900 text-white font-semibold py-2 px-4 rounded hover:bg-indigo-800"
              onClick={handleClick}
            >
              Enviar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default FormularioPage;
