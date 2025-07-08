import Image from "next/image";

export default function Testimonials() {
	const testimonials = [
		{
			text: "Very easy to book, car was waiting for us when we arrived, all great",
			// Reemplaza con las rutas correctas a tus imágenes
			image: "/user-placeholder.png", // Usamos un placeholder universal para el SVG
		},
		{
			text: "The rental was perfect. The car was in good conditions. The personal was precise and kind.",
			image: "/user-placeholder.png",
		},
		{
			text: "It was very easy and extremely convenient. I enjoyed not having to wait in line!",
			image: "/user-placeholder.png",
		},
	];

	return (
		<section className="py-16 px-4 md:px-8 lg:px-20 bg-white text-center">
			<h2 className="text-4xl sm:text-4xl font-extrabold lg:text-7xl text-center mb-10 sm:mb-12 lg:mb-16">
				<span className="text-secondary">We are your </span>
				<span className="text-primary italic">best option</span>
			</h2>

			<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
				{testimonials.map((item, idx) => (
					// CARD CONTAINER
					<div
						key={idx}
						className="bg-gray-100 p-6 rounded-xl rounded-l-3xl shadow-sm flex flex-col items-start text-left relative pl-16 md:pl-20 pr-4 py-8" // Ajustado padding y alineación
					>
						{/* IMAGE CONTAINER - Posicionado Absolutamente */}
						<div className="absolute top-1/2 transform -translate-y-1/2 -left-10 md:-left-12 z-10">
							{" "}
							{/* Posicionamiento flotante */}
							{/* Usamos un SVG placeholder para el icono de usuario */}
							<div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-blue-900 flex items-center justify-center shadow-md border-4 border-white">
								<svg
									className="w-10 h-10 md:w-12 md:h-12 text-white"
									fill="currentColor"
									viewBox="0 0 24 24"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										fillRule="evenodd"
										d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
										clipRule="evenodd"
									/>
								</svg>
							</div>
							{/* Si quieres usar una imagen real de usuario en vez del SVG, descomenta y ajusta: */}
							{/* <Image
                src={item.image} // Asegúrate de que item.image apunte a un SVG o PNG para el usuario si no es el placeholder
                alt={`User ${idx + 1}`}
                width={96} // Equivalente a w-24
                height={96} // Equivalente a h-24
                className="rounded-full object-cover border-4 border-blue-900 shadow-md"
              /> */}
						</div>

						{/* TESTIMONIAL TEXT */}
						<p className="italic text-blue-900 mb-4 text-[17px] leading-relaxed">
							{item.text}
						</p>

						{/* STARS RATING */}
						<div className="flex gap-1 text-yellow-500 text-lg">
							{[...Array(5)].map((_, i) => (
								<span key={i}>★</span>
							))}
						</div>
					</div>
				))}
			</div>
		</section>
	);
}
