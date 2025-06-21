// components/CarDisplaySection.jsx
"use client";

import { useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_CARS } from "@/lib/graphql/cars";
import CarCard from "./CarCard";
import { motion, AnimatePresence } from "framer-motion";

export default function CarDisplaySection() {
	const [currentIndex, setCurrentIndex] = useState(0);

	const { data, loading, error } = useQuery(GET_CARS, {
		variables: {
			filters: {
				available: {
					eq: true, // Filtrar solo carros disponibles
				},
			},
		},
	});

	if (loading)
		return (
			<p className="text-center text-lg text-gray-700">
				Cargando carros disponibles...
			</p>
		);
	if (error)
		return (
			<p className="text-center text-lg text-red-600">
				Error al cargar los carros: {error.message}
			</p>
		);

	const cars = data?.cars || [];
    console.log("Cars data:", cars);

	if (cars.length === 0) {
		return (
			<p className="text-center text-lg text-gray-700">
				No hay carros disponibles para mostrar.
			</p>
		);
	}

	const nextCar = () => {
		setCurrentIndex((prevIndex) => (prevIndex + 1) % cars.length);
	};

	const prevCar = () => {
		setCurrentIndex((prevIndex) => (prevIndex - 1 + cars.length) % cars.length);
	};

	const currentCar = cars[currentIndex];

	return (
		<div className="relative w-full max-w-6xl mx-auto py-8">
			<h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
				Nuestra Flota Disponible
			</h2>

			<div className="relative flex items-center justify-center p-4">
				{/* Botón de navegación izquierda */}
				<motion.button
					onClick={prevCar}
					className="absolute left-0 z-10 p-3 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 -translate-x-1/2"
					whileHover={{ scale: 1.1 }}
					whileTap={{ scale: 0.9 }}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="h-6 w-6"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M15 19l-7-7 7-7"
						/>
					</svg>
				</motion.button>

				{/* Contenedor de la tarjeta del carro con animación */}
				<AnimatePresence mode="wait">
					{currentCar && (
						<motion.div
							key={currentCar.documentId} // Importante para que AnimatePresence detecte el cambio de item
							initial={{ opacity: 0, x: 100 }}
							animate={{ opacity: 1, x: 0 }}
							exit={{ opacity: 0, x: -100 }}
							transition={{ duration: 0.3 }}
							className="w-full flex justify-center"
						>
							<CarCard car={currentCar} />
						</motion.div>
					)}
				</AnimatePresence>

				{/* Botón de navegación derecha */}
				<motion.button
					onClick={nextCar}
					className="absolute right-0 z-10 p-3 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 translate-x-1/2"
					whileHover={{ scale: 1.1 }}
					whileTap={{ scale: 0.9 }}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="h-6 w-6"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M9 5l7 7-7 7"
						/>
					</svg>
				</motion.button>
			</div>
			<div className="text-center text-gray-600 mt-4">
				{currentIndex + 1} de {cars.length}
			</div>
		</div>
	);
}
