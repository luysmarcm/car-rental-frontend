// components/CarDisplaySection.jsx
"use client";

import { useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_CARS } from "@/lib/graphql/cars";
import CarCard from "./CarCard";
import { motion, AnimatePresence } from "framer-motion";
import CarModal from "./CarModal";

export default function CarDisplaySection() {
	const [currentIndex, setCurrentIndex] = useState(0);
	const [showModal, setShowModal] = useState(false); // Estado para controlar el modal
	const [selectedCar, setSelectedCar] = useState(null); // Estado para el carro seleccionado en el modal

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

	// Función para abrir el modal
	const openModal = (car) => {
		setSelectedCar(car);
		setShowModal(true);
	};

	// Función para cerrar el modal
	const closeModal = () => {
		setShowModal(false);
		setSelectedCar(null);
	};

	return (
		<div className=" relative w-full py-16 px-4">
			<div className="relative flex items-center justify-center">
				{/* Botón de navegación izquierda */}
				<motion.button
					onClick={prevCar}
					className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center bg-white text-secondary rounded-full shadow-md hover:bg-gray-200 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-opacity-75"
					whileHover={{ scale: 1.1 }}
					whileTap={{ scale: 0.9 }}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="h-6 w-6"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						strokeWidth={2}
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M15 19l-7-7 7-7"
						/>
					</svg>
				</motion.button>

				{/* Contenedor de la tarjeta del carro con animación */}
				<AnimatePresence mode="wait">
					{currentCar && (
						<motion.div
							key={currentCar.documentId}
							initial={{ opacity: 0, x: 100 }}
							animate={{ opacity: 1, x: 0 }}
							exit={{ opacity: 0, x: -100 }}
							transition={{ duration: 0.3 }}
							className="w-full flex justify-center"
						>
							{/* Pasamos la función openModal a CarCard */}
							<CarCard car={currentCar} onCarClick={openModal} />
						</motion.div>
					)}
				</AnimatePresence>

				{/* Botón de navegación derecha */}
				<motion.button
					onClick={nextCar}
					className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center bg-white text-secondary rounded-full shadow-md hover:bg-gray-200 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-opacity-75"
					whileHover={{ scale: 1.1 }}
					whileTap={{ scale: 0.9 }}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="h-6 w-6"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						strokeWidth={2}
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M9 5l7 7-7 7"
						/>
					</svg>
				</motion.button>
			</div>

			{/* Modal del carro */}
			{showModal && selectedCar && (
				<CarModal car={selectedCar} onClose={closeModal} />
			)}
		</div>
	);
}
