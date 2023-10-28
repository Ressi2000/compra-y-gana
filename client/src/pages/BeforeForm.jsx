import React, { useEffect } from "react";
import Confetti from "react-confetti";
import useWindowSize from "react-use/lib/useWindowSize";

function BeforeForm() {
  const { width, height } = useWindowSize();

  useEffect(() => {
    // Agrega la clase al body cuando el componente se monta
    document.body.classList.add("formulario-page");
    // Quita la clase del body cuando el componente se desmonta
    return () => {
      document.body.classList.remove("formulario-page");
    };
  }, []);

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-blue-500 text-white border-x-4 border-lime-500">
      <div className="text-center mb-44">
        <img
          src="/images/logo_cc_lasamericas.jpg"
          alt="Imagen de perfil"
          className="w-32 h-32 rounded-full mx-auto mb-2 shadow-lg shadow-slate-400"
        />
      </div>
      <img
        src="/images/factura.gif"
        alt="Imagen de perfil"
        className="w-50 h-50 rounded-full"
      />
      <div className="text-center mt-4">
        <h1 className="text-2xl font-bold">¡GRACIAS POR PARTICIPAR!</h1>
        <h2 className="text-xl">¡Guarda tu Factura!</h2>
      </div>
      <Confetti
        width={width}
        height={height}
        colors={["#283a96", "#91c73e", "#ffce01"]}
        numberOfPieces={300}
        tweenDuration={5000}
      />
    </div>
  );
}

export default BeforeForm;
