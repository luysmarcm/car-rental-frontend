"use client";
import Image from "next/image";
import { motion } from "framer-motion"; 

export const CardChoose = ({ feature, index}) => {
    const bounceVariants = {
			hover: {
				scale: 1.1,
				transition: {
					yoyo: Infinity,
					duration: 0.4,
					ease: "easeOut",
				},
			},
		};
	return (
		<motion.div 
			key={index}
			className="bg-gray-100 rounded-xl p-6 sm:p-8 shadow-md flex flex-col items-center relative pt-16 h-full w-full lg:min-h-[100px]"
			whileHover="hover" 
			variants={bounceVariants}
		>
			<div
				className="absolute -top-10 flex justify-center items-center h-20 w-20 sm:h-24 sm:w-24 rounded-full z-10 border-4 border-white"
				style={{ left: "50%", transform: "translateX(-50%)" }}
			>
				<Image
					src={feature.imageSrc}
					alt={feature.title}
					width={100}
					height={100}
				/>
			</div>
			<h3 className="text-2xl sm:text-3xl font-extrabold text-gray-800 mb-4 lg:mt-10">
				{feature.title}
			</h3>
			<p className="text-gray-600 text-lg sm:text-xl italic grow text-center">
				{feature.description}
			</p>
		</motion.div>
	);
};
