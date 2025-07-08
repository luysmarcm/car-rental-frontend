// components/CarModal.jsx
"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

// Reutiliza los iconos de CarCard o define nuevos si necesitas diferentes estilos
const IconBluetooth = () => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		strokeWidth="2"
		strokeLinecap="round"
		strokeLinejoin="round"
		className="h-6 w-6 text-blue-600" // Diferente color para modal
	>
		<path d="M7 17l10-10L12 2v20l5-5-10-10" />
	</svg>
);

const IconAutomatic = () => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		strokeWidth="2"
		strokeLinecap="round"
		strokeLinejoin="round"
		className="h-6 w-6 text-blue-600"
	>
		<rect x="2" y="7" width="20" height="15" rx="2" ry="2"></rect>
		<path d="M12 7V2M12 11V7M12 15V11M12 19V15M17 7h-5v4h5v-4z"></path>
	</svg>
);

const IconAC = () => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		strokeWidth="2"
		strokeLinecap="round"
		strokeLinejoin="round"
		className="h-6 w-6 text-blue-600"
	>
		<path d="M12 18V6M12 2v2M12 20v2M19 9h3M2 9h3M17 15h3M4 15h3M10 4a2 2 0 10-4 0M10 20a2 2 0 10-4 0M17 4a2 2 0 10-4 0M17 20a2 2 0 10-4 0"></path>
	</svg>
);

// Nuevos iconos para el modal (ejemplos, puedes usar más si tu GraphQL los provee)
const IconFuel = () => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		className="h-6 w-6 text-blue-600"
		fill="none"
		viewBox="0 0 24 24"
		stroke="currentColor"
		strokeWidth="2"
	>
		<path
			strokeLinecap="round"
			strokeLinejoin="round"
			d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.828 0L6.343 16.657m10.314-10.314L13.414 3.1a1.998 1.998 0 00-2.828 0L6.343 6.657m10.314 0L14.243 9.77a4.5 4.5 0 01-6.364 0L3.343 6.657m14.314 0L12 10.971m5.657-3.657L12 10.971m-5.657-3.657L12 10.971"
		/>
	</svg>
);

const IconSeats = () => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		className="h-6 w-6 text-blue-600"
		fill="none"
		viewBox="0 0 24 24"
		stroke="currentColor"
		strokeWidth="2"
	>
		<path
			strokeLinecap="round"
			strokeLinejoin="round"
			d="M12 20V10m0 0a2 2 0 100-4 2 2 0 000 4zm0 0h.01M16 16v-6m0 0a2 2 0 100-4 2 2 0 000 4zm0 0h.01M8 16v-6m0 0a2 2 0 100-4 2 2 0 000 4zm0 0h.01M20 20H4a2 2 0 01-2-2V6a2 2 0 012-2h16a2 2 0 012 2v12a2 2 0 01-2 2z"
		/>
	</svg>
);

const loaderProp = ({ src }) => {
	return src;
};

const baseUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:1337";

const CarModal = ({ car, onClose }) => {
	const strapiBaseUrl =
		process.env.NEXT_PUBLIC_API_URL || "http://localhost:1337";
	const rawImageUrl = car?.image?.url;
	const imageUrl = rawImageUrl
		? `${strapiBaseUrl}${rawImageUrl}`
		: "/car-image-placeholder.png";
	const imageAlt = `${car?.brand || ""} ${car?.name || "Carro"}`;

	// Características detalladas para el modal
	const detailedFeatures = [
		{ label: "Marca", value: car.brand },
		{ label: "Modelo", value: car.name },
		{ label: "Año", value: car.year },
		{ label: "Combustible", value: car.fuel_type, icon: IconFuel },
		{ label: "Transmisión", value: car.gear_shift, icon: IconAutomatic },
		{ label: "Pasajeros", value: car.passengers, icon: IconSeats },
		{ label: "Bolsos", value: car.bags, icon: IconSeats }, // Puedes usar el mismo icono o uno de bolso más específico
		{
			label: "Bluetooth",
			value: car.bluetooth ? "Sí" : "No",
			icon: IconBluetooth,
		},
		{
			label: "Aire Acondicionado",
			value: car.air_conditioning ? "Sí" : "No",
			icon: IconAC,
		},
		{ label: "Descripción", value: car.description }, // Asumiendo que tienes un campo de descripción
	].filter((feature) => feature.value !== undefined && feature.value !== null); // Filtrar características sin valor

	return (
		<AnimatePresence>
			<motion.div
				className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 p-4"
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0 }}
				onClick={onClose} // Cierra el modal al hacer clic en el fondo oscuro
			>
				<motion.div
					className="bg-white rounded-lg p-6 w-full max-w-3xl max-h-[90vh] overflow-y-auto relative shadow-xl"
					initial={{ scale: 0.9, y: 50 }}
					animate={{ scale: 1, y: 0 }}
					exit={{ scale: 0.9, y: 50 }}
					transition={{ duration: 0.3 }}
					onClick={(e) => e.stopPropagation()} // Evita que el clic dentro del modal lo cierre
				>
					{/* Botón de cerrar */}
					<button
						onClick={onClose}
						className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-2xl font-bold p-1 rounded-full bg-gray-100 hover:bg-gray-200"
						aria-label="Cerrar modal"
					>
						&times;
					</button>

					<div className="flex flex-col md:flex-row gap-6">
						{/* Imagen del carro en el modal */}
						<div className="md:w-1/2 flex justify-center items-center bg-gray-50 rounded-lg p-4">
							<Image
								src={imageUrl}
								alt={imageAlt}
								width={500} // Ajusta el tamaño de la imagen en el modal
								height={300}
								objectFit="contain"
								className="w-full h-auto max-h-72" // Altura máxima para evitar que la imagen sea demasiado grande
								loader={loaderProp}
							/>
						</div>

						{/* Detalles del carro */}
						<div className="md:w-1/2">
							<h2 className="text-3xl font-bold text-blue-800 mb-2">
								{car.brand} {car.name}
							</h2>
							<p className="text-xl text-gray-600 mb-4">Año: {car.year}</p>

							<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
								{detailedFeatures.map((feature, index) =>
									// Algunas características no necesitan un icono visual si es solo texto
									// Asegúrate de que el key en GraphQL para 'description' sea 'description'
									feature.key !== "description" &&
									feature.key !== "brand" &&
									feature.key !== "name" &&
									feature.key !== "year" ? (
										<div
											key={index}
											className="flex items-center text-gray-700"
										>
											{feature.icon && <feature.icon />}
											<span className="ml-2 font-medium">
												{feature.label}: {feature.value}
											</span>
										</div>
									) : null // No renderizar para estas claves aquí, se manejan por separado
								)}
							</div>
							{/* Descripción del auto (si existe) */}
							{car.description && (
								<div className="mb-6">
									<h3 className="text-lg font-semibold text-gray-800 mb-2">
										Descripción:
									</h3>
									<p className="text-gray-700 text-sm leading-relaxed">
										{car.description}
									</p>
								</div>
							)}

							{/* Botón de reservar en el modal */}
							<button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg text-lg transition duration-300">
								Reservar este Vehículo
							</button>
						</div>
					</div>
				</motion.div>
			</motion.div>
		</AnimatePresence>
	);
};

export default CarModal;
