// components/CarModal.jsx
"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState } from "react"; 
import { CircleX } from "lucide-react";

const loaderProp = ({ src }) => {
	return src;
};



const CarModal = ({ car, onClose }) => {
	const hasMultiplePhotos = Array.isArray(car?.photos) && car.photos.length > 0;
	const allPhotoUrls = [];
	if (car?.image?.url) {
		allPhotoUrls.push({ url: car.image.url, id: "main" });
	}
	if (hasMultiplePhotos) {
		
		car.photos.forEach((photo, index) => {
			if (photo.url) {
				allPhotoUrls.push({
					url: photo.url,
					id: photo.id || `gallery-${index}`,
				});
			}
		});
	}

	const [currentImage, setCurrentImage] = useState(
		allPhotoUrls.length > 0 ? allPhotoUrls[0].url : "/car-image-placeholder.png"
	);

	const imageAlt = `${car?.brand || ""} ${car?.name || "Carro"}`;

	const features = [
		{ label: "Bluetooth", iconPath: "/image/bl.png", key: "bluetooth" },
		{ label: "Automatic", iconPath: "/image/au.png", key: "gear_shift" },
		{
			label: "Air Conditioning",
			iconPath: "/image/ac.png",
			key: "air_conditioning",
		},
		{ label: "Fuel Type", iconPath: "/image/fuel.png", key: "fuel_type" },
		{ label: "Passengers", iconPath: "/image/seats.png", key: "passengers" },
		{ label: "Bags", iconPath: "/image/bags.png", key: "bags" },
	];

	const detailedFeatures = [
		{ label: "Marca", value: car.brand, key: "brand" },
		{ label: "Modelo", value: car.name, key: "name" },
		{ label: "Año", value: car.year, key: "year" },
		...features.map((feature) => {
			let value;
			if (feature.key === "bluetooth" || feature.key === "air_conditioning") {
				value = car[feature.key] ? "Yes" : "No";
			} else {
				value = car[feature.key];
			}
			return {
				...feature,
				value: value,
			};
		}),
		{ label: "Descripción", value: car.description, key: "description" },
	].filter((feature) => feature.value !== undefined && feature.value !== null);

	return (
		<AnimatePresence>
			<motion.div
				className="fixed inset-0 bg-opacity-70 flex justify-center items-center z-50 p-4" // Fondo oscuro
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0 }}
				onClick={onClose}
			>
				<motion.div
					className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto relative shadow-xl" // Aumentado el max-w para la galería
					initial={{ scale: 0.9, y: 50 }}
					animate={{ scale: 1, y: 0 }}
					exit={{ scale: 0.9, y: 50 }}
					transition={{ duration: 0.3 }}
					onClick={(e) => e.stopPropagation()}
				>
					{/* Close button */}
					<button
						onClick={onClose}
						className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-2xl font-bold p-1 rounded-full  hover:bg-primary"
						aria-label="Cerrar modal"
					>
						<CircleX className="text-secondary" />
					</button>

					<div className="flex flex-col md:flex-row gap-6">
						<div className="md:w-1/2 flex flex-col items-center">
							<div className="w-full rounded-lg p-4 flex justify-center items-center mb-4 min-h-[250px] relative">
								<Image
									src={currentImage}
									alt={imageAlt}
									layout="fill"
									objectFit="contain"
									className="rounded-lg"
									loader={loaderProp}
								/>
							</div>

							{allPhotoUrls.length > 1 && (
								<div className="grid grid-cols-3 sm:grid-cols-4 gap-2 w-full max-w-md">
									{allPhotoUrls.map((photo) => (
										<div
											key={photo.id}
											className={`relative w-full h-20 cursor-pointer rounded-lg overflow-hidden border-2 ${
												currentImage === photo.url
													? "border-blue-500"
													: "border-transparent"
											} hover:border-blue-300 transition-all duration-200`}
											onClick={() => setCurrentImage(photo.url)}
										>
											<Image
												src={photo.url}
												alt={`Thumbnail of ${imageAlt}`}
												layout="fill"
												objectFit="cover"
												className="rounded-lg"
												loader={loaderProp}
											/>
										</div>
									))}
								</div>
							)}
						</div>

						<div className="md:w-1/2">
							<h2 className="text-3xl font-bold text-secondary mb-2">
								{car.brand} {car.name}
							</h2>

							<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
								{detailedFeatures.map((feature, index) =>
									feature.iconPath ||
									["brand", "name", "year"].includes(feature.key) ? (
										<div
											key={index}
											className="flex items-center text-gray-700"
										>
											{feature.iconPath && (
												<Image
													src={feature.iconPath}
													alt={feature.label}
													width={24}
													height={24}
													className="h-6 w-6"
												/>
											)}
											<span className="ml-2 font-medium">
												{feature.label}: {feature.value}
											</span>
										</div>
									) : null
								)}
							</div>
						</div>
					</div>
				</motion.div>
			</motion.div>
		</AnimatePresence>
	);
};

export default CarModal;
