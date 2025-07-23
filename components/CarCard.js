"use client";

import Image from "next/image";
import { motion } from "framer-motion";

// REMOVE THE LOADER IF YOU ARE USING NEXT.JS 13+ WITH remotePatterns
// AND YOU WANT NEXT.JS OPTIMIZATION.
// If you still need a custom loader for some reason, keep it.
const loaderProp = ({ src }) => {
	return src;
};

const features = [
	{ label: "Bluetooth", iconPath: "/image/bl.png", key: "bluetooth" },
	{ label: "Automatic", iconPath: "/image/au.png", key: "gear_shift" },
	{
		label: "Air Conditioning",
		iconPath: "/image/ac.png",
		key: "air_conditioning",
	},
];

// baseUrl no es necesario aquí para las imágenes de Cloudinary
// const baseUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:1337";

export default function CarCard({ car, onCarClick, isLoading = false }) {
	// Cuando Cloudinary está configurado, car.image.url YA ES LA URL COMPLETA DE CLOUDINARY.
	// No necesitas prefijarla con strapiBaseUrl.
	const imageUrl = car?.image?.url ?? "/car-image-placeholder.png";
	const imageAlt = `${car?.brand || ""} ${car?.name || "Carro"}`;

	// ... (rest of your skeleton loading state remains the same)
	if (isLoading) {
		return (
			<div
				className="flex flex-col md:flex-row items-center p-5 w-full justify-around px-14 animate-pulse"
				style={{ minHeight: "350px" }}
			>
				{/* Skeleton para la sección de texto izquierda */}
				<div className="flex flex-col items-start justify-start px-20 text-left md:w-1/3">
					<div className="h-10 bg-gray-300 rounded w-3/4 mb-2"></div>{" "}
					{/* Placeholder para la marca */}
					<div className="h-7 bg-gray-300 rounded w-1/2"></div>{" "}
					{/* Placeholder para el nombre */}
					<div className="bg-gray-300 h-1 w-20 rounded-full my-2"></div>{" "}
					{/* Placeholder para la línea decorativa */}
				</div>

				{/* Skeleton para la imagen del carro */}
				<div className="relative w-full md:w-1/2 h-[250px] md:h-[300px] flex items-center justify-center overflow-hidden bg-gray-300 rounded-lg"></div>

				{/* Skeleton para la sección de características y botón */}
				<div className="md:w-1/4 flex flex-col items-start justify-center p-8 pr-12">
					{features.map((_, index) => (
						<div
							key={index}
							className="flex items-center text-gray-700 text-lg mb-3"
						>
							<div className="h-6 w-6 bg-gray-300 rounded-full mr-2"></div>{" "}
							{/* Placeholder para el icono */}
							<div className="h-5 bg-gray-300 rounded w-2/3"></div>{" "}
							{/* Placeholder para el texto de la característica */}
						</div>
					))}
					<div className="mt-8 h-12 bg-gray-300 rounded-4xl w-full"></div>{" "}
					{/* Placeholder para el botón */}
				</div>
			</div>
		);
	}

	return (
		<motion.div
			className="flex flex-col md:flex-row items-center p-5 w-full cursor-pointer justify-around px-14"
			initial={{ opacity: 0, y: 50 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5 }}
			style={{ minHeight: "350px" }}
			onClick={() => onCarClick(car)}
		>
			<div className="flex flex-col items-start justify-start px-20 text-left md:w-1/3">
				<h3 className="text-secondary text-4xl lg:text-6xl font-bold uppercase mb-0">
					{car.brand}
				</h3>
				<p className="text-secondary text-3xl font-normal mt-0">{car.name}</p>
				<div className="bg-orange-500 h-1 w-20 rounded-full my-2 opacity-0">
					{car.year}
				</div>
			</div>

			{/* Sección de la imagen del carro en el centro */}
			<div className="relative w-full md:w-1/2 h-[250px] md:h-[300px] flex items-center justify-center overflow-hidden">
				<Image
					src={imageUrl} // Ahora imageUrl es directamente la URL de Cloudinary
					alt={imageAlt}
					layout="fill"
					objectFit="contain"
					className="rounded-lg"
					// Elimina 'loader={loaderProp}' si ya configuraste remotePatterns en next.config.js
					// y quieres que Next.js maneje la optimización por ti.
					// Si tienes una razón específica para usar un loader custom, mantenlo.
					loader={loaderProp} // Opcional: Mantener si tienes un caso de uso específico
				/>
			</div>

			<div className="md:w-1/4 flex flex-col items-start justify-center p-8 pr-12 text-gray-700">
				{features.map((feature) => {
					let shouldDisplay = false;
					if (feature.key === "bluetooth" && car.bluetooth) {
						shouldDisplay = true;
					} else if (
						feature.key === "air_conditioning" &&
						car.air_conditioning
					) {
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
							<Image
								src={feature.iconPath}
								alt={`${feature.label} icon`}
								width={24}
								height={24}
								className="mr-2"
							/>
							<span className="font-medium">{feature.label}</span>
						</div>
					);
				})}
				<button className="mt-8 bg-primary hover:bg-primary text-gris font-extrabold py-3 px-8 rounded-4xl shadow-md transition duration-300 ease-in-out uppercase text-xl w-full italic">
					Reserve
				</button>
			</div>
		</motion.div>
	);
}
