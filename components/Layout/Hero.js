// pages/index.js
"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Re } from "./Re";
import BookingForm from "./BookingForm";

const carImages = [
	"/image/carro2.png",
	"/image/carro1.png", // agrega más si deseas
];

export default function Hero() {
	const [index, setIndex] = useState(0);

	useEffect(() => {
		const interval = setInterval(() => {
			setIndex((prev) => (prev + 1) % carImages.length);
		}, 4000);

		return () => clearInterval(interval);
	}, []);

	return (
		<section className="">
			<div className="relative min-h-screen flex flex-col md:flex-row">
				<div className="relative flex items-center justify-center">
					<Image
						src="/image/hero.png"
						alt="Fondo"
						width={800}
						height={600}
						className="absolute inset-0 w-full h-full z-0 opacity-80"
					/>

					{/* Autos animados */}
					<div className="relative w-[600px] h-[400px] z-10">
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
									priority
								/>
							</motion.div>
						</AnimatePresence>
					</div>
				</div>

				{/* Parte derecha con texto */}
				<div className="flex-grow flex flex-col items-center justify-center text-center p-8 ">
					<h1 className="text-6xl font-bold text-black leading-tight  italic ">
						Rent <span className="text-secondary"> Your Ride,</span>
					</h1>
					<h2 className="text-7xl font-extrabold text-secondary italic ">
						Own the Road
					</h2>
					<p className="text-2xl text-gray-600 italic ">
						Fast booking flexible options
					</p>
				</div>
			</div>
			<div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-full  p-8 rounded-t-lg z-20">
				{/* <Re /> */}
				<BookingForm />
			</div>
		</section>
	);
}
