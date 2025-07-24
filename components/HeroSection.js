// pages/index.js
"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import Booking from "./Booking";

const carImages = [
	"/image/Camry.png",
	"/image/Corolla.png",
	"/image/Elantra.png",
	"/image/GMC-terrain.png",
	"/image/Jeep compass.png",
	"/image/Nissan Sentra 1.png",
	// puedes agregar más imágenes aquí
];

export default function HeroSection() {
	const [index, setIndex] = useState(0);
	useEffect(() => {
		if (carImages.length === 0) return;

		const interval = setInterval(() => {
			setIndex((prev) => (prev + 1) % carImages.length);
		}, 4000);

		return () => clearInterval(interval);
	}, []);

	if (carImages.length === 0) return null;
	return (
		<section id="reserva" className="relative">
			<div className="relative min-h-screen flex flex-col lg:flex-row">
				<div className="relative w-full lg:w-1/2 min-h-[50vh] lg:min-h-screen flex items-center justify-center p-4 md:p-8">
					<Image
						src="/image/banner.png"
						alt="Fondo"
						fill
						className="absolute inset-0 w-full h-full z-0 opacity-80 object-cover"
					/>
					<div className="relative w-full max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl aspect-video z-10">
						<AnimatePresence mode="wait">
							<motion.div
								key={carImages[index]}
								initial={{ opacity: 0, x: 100 }}
								animate={{ opacity: 1, x: 0 }}
								exit={{ opacity: 0, x: -100 }}
								transition={{ duration: 0.8 }}
								className="absolute inset-0"
							>
								<Image
									src={carImages[index]}
									alt={`Auto ${index + 1}`}
									fill
									className="object-contain"
								/>
							</motion.div>
						</AnimatePresence>
					</div>
				</div>
				<div className="w-full lg:w-1/2 flex flex-col items-center justify-center text-center p-8 md:p-12 lg:p-16">
					<h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-black leading-tight italic mb-2">
						Rent <span className="text-secondary">Your Ride,</span>
					</h1>
					<h2 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-secondary italic mb-4">
						Own the Road
					</h2>
					<p className="text-lg md:text-xl lg:text-2xl text-gray-600 italic max-w-md mx-auto">
						Fast booking flexible options
					</p>
				</div>
			</div>
			<div className="relative -mt-28 lg:-mt-32">
				<Booking />
			</div>
		</section>
	);
}
