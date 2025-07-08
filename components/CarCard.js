"use client";

import Image from "next/image";
import { motion } from "framer-motion"; // Mantén Framer Motion si lo usas para las animaciones de la tarjeta

const loaderProp = ({ src }) => {
  return src;
};

// ******* NO MÁS DEFINICIONES DE ICONOS SVG AQUÍ *******
// Se asume que las imágenes de iconos están en tu carpeta `public/icons/`

// Define las rutas a tus imágenes de iconos
const features = [
	{ label: "Bluetooth", iconPath: "/image/blue.svg", key: "bluetooth" }, // Cambiado a iconPath
	{ label: "Automatic", iconPath: "/image/automat.svg", key: "gear_shift" }, // Cambiado a iconPath
	{
		label: "Air Conditioning",
		iconPath: "/image/aire.svg",
		key: "air_conditioning",
	},
];

const baseUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:1337";

// Recibe `onCarClick` como prop
export default function CarCard({ car, onCarClick }) {
  const strapiBaseUrl =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:1337";
  const rawImageUrl = car?.image?.url;
  const imageUrl = rawImageUrl
    ? `${strapiBaseUrl}${rawImageUrl}`
    : "/car-image-placeholder.png";
  const imageAlt = `${car?.brand || ""} ${car?.name || "Carro"}`;

  return (
    <motion.div
      className="flex flex-col md:flex-row items-center p-0 w-full cursor-pointer"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      style={{ minHeight: "350px" }}
      onClick={() => onCarClick(car)} // Llama a onCarClick cuando se hace clic en la tarjeta
    >
      <div className="flex flex-col items-start justify-start p-8 pl-12 text-left md:w-1/3">
        <h3 className="text-blue-900 text-6xl font-bold uppercase mb-0">
          {car.brand}
        </h3>
        <p className="text-gray-700 text-3xl font-normal mt-0">{car.name}</p>
        <div className="bg-orange-500 h-1 w-20 rounded-full my-2 opacity-0"></div>
      </div>

      {/* Sección de la imagen del carro en el centro */}
      <div className="relative w-full md:w-1/2 h-[250px] md:h-[300px] flex items-center justify-center overflow-hidden">
        <Image
          src={imageUrl}
          alt={imageAlt}
          layout="fill"
          objectFit="contain"
          className="rounded-lg"
          loader={loaderProp}
        />
      </div>

      <div className="md:w-1/4 flex flex-col items-start justify-center p-8 pr-12 text-gray-700">
        {features.map((feature) => {
          let shouldDisplay = false;
          if (feature.key === "bluetooth" && car.bluetooth) {
            shouldDisplay = true;
          } else if (feature.key === "air_conditioning" && car.air_conditioning) {
            shouldDisplay = true;
          } else if (feature.key === "gear_shift" && car.gear_shift) {
            shouldDisplay = true;
          }

          if (!shouldDisplay) return null;

          return (
            <div
              key={feature.key}
              className="flex items-center text-gray-700 text-lg mb-3"
            >
              {/* Usar Next/Image para cargar el icono */}
              <Image
                src={feature.iconPath} // Usamos iconPath aquí
                alt={`${feature.label} icon`}
                width={24} // Ajusta el tamaño según tus necesidades, debe coincidir con el h-6 w-6 de Tailwind
                height={24}
                className="mr-2" // Agrega las clases de margen
              />
              <span className="font-medium">{feature.label}</span>
            </div>
          );
        })}
        <button className="mt-8 bg-primary hover:bg-yellow-600 text-white font-bold py-3 px-8 rounded-4xl shadow-md transition duration-300 ease-in-out uppercase text-lg w-full">
          Reserve
        </button>
      </div>
    </motion.div>
  );
}