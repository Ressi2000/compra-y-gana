import { useEffect, useState } from 'react';

function Carousel() {
    const [current, setCurrent] = useState(0); // Estado para la imagen actual
    const images = ['https://imagenes.muyinteresante.es/files/composte_image/uploads/2023/08/01/64c8a20035395.jpeg', 'https://img.freepik.com/fotos-premium/escalera-madera-al-amanecer-al-estilo-paisajes-tropicales_916626-8049.jpg', 'https://astelus.com/wp-content/viajes/Lago-Moraine-Parque-Nacional-Banff-Alberta-Canada.jpg', 'https://thumbs.dreamstime.com/b/paisajes-de-yosemite-46208063.jpg', 'https://img.freepik.com/fotos-premium/colorful-anime-landscape_691833-766.jpg']; // Reemplaza 'url1', 'url2', 'url3', 'url4', 'url5' con las URLs de tus imágenes

    // Función para ir a la imagen siguiente
    const nextImage = () => {
        setCurrent(current === images.length - 1 ? 0 : current + 1);
    };

    // Función para ir a la imagen anterior
    const prevImage = () => {
        setCurrent(current === 0 ? images.length - 1 : current - 1);
    };

    // Cambia la imagen actual cada 3 segundos
    useEffect(() => {
        const timer = setInterval(nextImage, 3000);
        return () => clearInterval(timer); // Limpia el intervalo cuando el componente se desmonta
    }, [current]);

    return (
        <div className="relative w-full h-96 md:h-96 overflow-hidden rounded-lg">
            {images.map((img, index) => (
                <img
                    key={index}
                    src={img}
                    alt=""
                    className={`absolute w-full h-full object-cover transition-opacity duration-700 ease-in-out ${current === index ? 'block' : 'hidden'}`}
                />
            ))}
            <button onClick={prevImage} className="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none">
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                    <svg className="w-4 h-4 text-white dark:text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 1 1 5l4 4"/>
                    </svg>
                </span>
            </button>
            <button onClick={nextImage} className="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none">
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                    <svg className="w-4 h-4 text-white dark:text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
                    </svg>
                </span>
            </button>
        </div>
    );
}

export default Carousel;