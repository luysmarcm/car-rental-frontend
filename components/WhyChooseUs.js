"use client";
import Image from "next/image";
import { motion } from "framer-motion"; // Importa motion
import { use } from "react";
import { CardChoose } from "./CardChoose";

export default function WhyChooseUs() {
	const features = [
		{
			imageSrc: "/image/iconos 1.svg",
			title: "Great variety",
			description: "We have a wide variety of models that adapt to your needs.",
		},
		{
			imageSrc: "/image/iconos 2.svg",
			title: "Profitability",
			description:
				"You will get affordable costs, which will allow you to save.",
		},
		{
			imageSrc: "/image/iconos 3.svg",
			title: "Reliability and security",
			description: "Reliable and safe vehicles that guarantee your well-being.",
		},
		{
			imageSrc: "/image/iconos 4.svg",
			title: "Pick-up service",
			description: "We offer airport pick-up service.",
		},
		{
			imageSrc: "/image/iconos 5.svg",
			title: "Business hours",
			description: "We work 7 days a week.",
		},
	];

	const sectionVariants = {
        hidden: { opacity: 0, y: 100 }, // Estado inicial: invisible y 100px abajo
        visible: {
            opacity: 1,
            y: 0, // Estado final: visible y en su posición original
            transition: {
                duration: 0.8, // Duración de la animación
                ease: "easeOut", // Tipo de easing
                when: "beforeChildren", // Anima la sección antes que sus hijos
                staggerChildren: 0.2 // Opcional: si quieres que las CardChoose aparezcan una tras otra
            },
        },
    };
	

	return (
		<motion.section
			id="about"
			className="py-16 px-4 md:px-8 lg:px-20 bg-white text-center"
			variants={sectionVariants} // Asigna las variantes
			initial="hidden" // Establece el estado inicial
			whileInView="visible" // Anima a 'visible' cuando el componente entra en el viewport
			viewport={{ once: true, amount: 0.2 }} // Anima solo una vez cuando el 20% del componente está visible
		
		>
			<h2 className="text-4xl sm:text-4xl font-extrabold lg:text-7xl text-secondary text-center mb-10 sm:mb-12 lg:mb-16">
				Why choose us?
			</h2>

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-12 w-full items-stretch justify-items-center">
				{features.map((feature, index) => (
					<CardChoose feature={feature} key={index} />
				))}
			</div>
		</motion.section>
	);
}
