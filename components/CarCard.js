// components/CarCard.jsx
"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const loaderProp = ({ src }) => {
	return src;
};

// Iconos simples (puedes reemplazarlos con iconos reales de una librería como Heroicons o Font Awesome)
const IconPassenger = () => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		className="h-5 w-5 text-blue-500"
		viewBox="0 0 20 20"
		fill="currentColor"
	>
		<path
			fillRule="evenodd"
			d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
			clipRule="evenodd"
		/>
	</svg>
);
const IconBag = () => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		className="h-5 w-5 text-blue-500"
		viewBox="0 0 20 20"
		fill="currentColor"
	>
		<path
			fillRule="evenodd"
			d="M10 2a4 4 0 00-4 4v2H3a2 2 0 00-2 2v6a2 2 0 002 2h14a2 2 0 002-2v-6a2 2 0 00-2-2h-3V6a4 4 0 00-4-4zm2 6V6a2 2 0 10-4 0v2h4z"
			clipRule="evenodd"
		/>
	</svg>
);
const IconBluetooth = () => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		className="h-5 w-5 text-blue-500"
		viewBox="0 0 20 20"
		fill="currentColor"
	>
		<path d="M10 18a8 8 0 100-16 8 8 0 000 16zm-1.707-3.707a1 1 0 001.414 0L14 10.414V13a1 1 0 002 0v-6a1 1 0 00-1-1h-6a1 1 0 000 2h2.586L9 12.293a1 1 0 000 1.414z" />
	</svg>
);
const IconAutomatic = () => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		className="h-5 w-5 text-blue-500"
		viewBox="0 0 20 20"
		fill="currentColor"
	>
		<path
			fillRule="evenodd"
			d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.027l2.222 2.222a1 1 0 010 1.414l-2.222 2.222a1 1 0 01-1.414-1.414L9.121 10l-1.98-1.98a1 1 0 011.414-1.414z"
			clipRule="evenodd"
		/>
	</svg>
);
const IconAC = () => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		className="h-5 w-5 text-blue-500"
		viewBox="0 0 20 20"
		fill="currentColor"
	>
		<path d="M10 2a.75.75 0 01.75.75v3a.75.75 0 01-1.5 0v-3A.75.75 0 0110 2zM5.72 5.06a.75.75 0 011.06 0l1.77 1.77a.75.75 0 01-1.06 1.06L5.72 6.12a.75.75 0 010-1.06zM2 10a.75.75 0 01.75-.75h3a.75.75 0 010 1.5h-3A.75.75 0 012 10zm3.72 1.94a.75.75 0 010 1.06l-1.77 1.77a.75.75 0 11-1.06-1.06l1.77-1.77a.75.75 0 011.06 0zM10 18a.75.75 0 01-.75-.75v-3a.75.75 0 011.5 0v3a.75.75 0 01-.75.75zm4.28-5.06a.75.75 0 010-1.06l1.77-1.77a.75.75 0 011.06 1.06l-1.77 1.77a.75.75 0 01-1.06 0zM18 10a.75.75 0 01-.75.75h-3a.75.75 0 010-1.5h3A.75.75 0 0118 10zm-3.72-1.94a.75.75 0 01-1.06 0l-1.77-1.77a.75.75 0 111.06-1.06l1.77 1.77a.75.75 0 010 1.06z" />
	</svg>
);
const baseUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:1337";
const features = [
	{ label: "Pasajeros", icon: IconPassenger, key: "passengers" },
	{ label: "Bolsos", icon: IconBag, key: "bags" },
	{ label: "Bluetooth", icon: IconBluetooth, key: "bluetooth" },
	{ label: "Transmisión", icon: IconAutomatic, key: "gear_shift" },
	{ label: "Aire Acondicionado", icon: IconAC, key: "air_conditioning" },
    
];

// const url = "http://localhost:1337";

export default function CarCard({ car }) {
	// const imageUrl = car?.image?.url ?? "/car-image-placeholder.png";

	// Asegúrate de que NEXT_PUBLIC_API_URL esté definido en tu .env.local
	// y que tenga el prefijo NEXT_PUBLIC_
	const strapiBaseUrl =
		process.env.NEXT_PUBLIC_API_URL || "http://localhost:1337";

	// Accede a la URL de la imagen a través de car.image.url
	// Usa optional chaining (?.) para prevenir errores si 'car' o 'car.image' son nulos/indefinidos
	const rawImageUrl = car?.image?.url;

	// Concatena la URL base de Strapi solo si rawImageUrl existe
	// De lo contrario, usa el placeholder local
	const imageUrl = rawImageUrl
		? `${strapiBaseUrl}${rawImageUrl}`
		: "/car-image-placeholder.png"; // Asegúrate de tener esta imagen en tu carpeta public/

	const imageAlt = `${car?.brand || ""} ${car?.name || "Carro"}`;
	return (
		<motion.div
			className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col md:flex-row items-center justify-center p-4 md:p-8 space-y-4 md:space-y-0 md:space-x-8 max-w-4xl mx-auto"
			initial={{ opacity: 0, y: 50 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5 }}
		>
			{/* Sección de detalles del carro a la izquierda */}
			<div className="flex flex-col items-center md:items-start text-center md:text-left space-y-2 md:w-1/3">
				<h3 className="text-xl md:text-2xl font-bold text-blue-700 uppercase">
					{car.brand}
				</h3>
				<p className="text-2xl md:text-4xl font-extrabold text-gray-800">
					{car.name}
				</p>
				<div className="bg-blue-600 h-1.5 w-20 md:w-28 rounded-full my-2"></div>
				<p className="text-gray-600 text-sm md:text-base text-center md:text-left">
					Tarifas competitivas diarias, semanales y mensuales.
				</p>
				<button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg shadow transition duration-300 ease-in-out">
					<span className="flex items-center">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-5 w-5 mr-2"
							viewBox="0 0 20 20"
							fill="currentColor"
						>
							<path
								fillRule="evenodd"
								d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
								clipRule="evenodd"
							/>
						</svg>
						RESERVAR AHORA
					</span>
				</button>
			</div>

			{/* Sección de la imagen del carro en el centro */}
			<div className="relative w-full md:w-1/2 h-48 md:h-64 flex items-center justify-center">
				<Image
					src={imageUrl} // Aquí se usa la URL construida
					alt={imageAlt}
					layout="fill" // MANTÉN SOLO ESTO
					objectFit="contain"
					className="rounded-lg"
					loader={loaderProp}
				/>
			</div>

			{/* Sección de características a la derecha */}
			<div className="md:w-1/4 flex flex-col items-center md:items-start space-y-2 mt-4 md:mt-0">
				{features.map((feature) => {
					let valueToDisplay;
					// Lógica para mostrar el valor de la característica
					if (feature.key === "gear_shift") {
						valueToDisplay = car[feature.key]; // Mostrar el valor tal cual
					} else if (typeof car[feature.key] === "boolean") {
						// Para booleanos (Bluetooth, AC), mostrar "Sí" o "No"
						valueToDisplay = car[feature.key] ? "Sí" : "No";
					} else {
						valueToDisplay = car[feature.key]; // Para números (Pasajeros, Bolsos)
					}

					if (valueToDisplay === undefined || valueToDisplay === null) {
						return null; // No mostrar la característica si el valor es nulo/indefinido
					}

					return (
						<div
							key={feature.key}
							className="flex items-center text-gray-700 text-base"
						>
							<feature.icon />
							<span className="ml-2">
								{valueToDisplay} {feature.label}
							</span>
						</div>
					);
				})}
			</div>
		</motion.div>
	);
}
