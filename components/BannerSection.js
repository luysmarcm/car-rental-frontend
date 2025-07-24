import Image from "next/image";
import Link from "next/link";

export default function BannerSection() {
	return (
		<section className="relative w-full h-[50vh] md:h-[70vh] lg:h-[80vh] flex items-center justify-center text-white overflow-hidden">
			{/* Imagen de fondo usando next/image */}
			<Image
				src="/image/bannersection.png" // Cambia esto a la ruta de tu imagen de fondo
				alt="Carretera con vista panorámica"
				layout="fill" // Permite que la imagen llene el contenedor
				objectFit="cover" // Asegura que la imagen cubra el área sin distorsionarse
				quality={90} // Ajusta la calidad de la imagen para optimización
				className="z-0" // Asegura que la imagen esté detrás del contenido
			/>

			{/* Capa de superposición para mejorar la legibilidad del texto (opcional) */}
			<div className="absolute inset-0 bg-black opacity-30 z-10"></div>

			{/* Contenido centrado (texto y botón) */}
			<div className="relative z-20 flex flex-col items-center justify-center text-center p-4 mt-6">
				<h1 className="italic text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-4 drop-shadow-lg leading-tight">
					FREEDOM
					<span className="block text-primary bg-secondary px-6 py-3 rounded-lg mt-3 md:mt-4 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold italic">
						on four wheels
					</span>
				</h1>
				<Link href="#reserva" passHref>
					<button className="mt-8 px-8 py-3 bg-white text-secondary	 font-bold rounded-full shadow-lg hover:bg-gray-200 transition duration-300 text-lg sm:text-xl transform hover:scale-105">
						BOOK NOW
					</button>
				</Link>
			</div>

			{/* Icono de Instagram en la esquina superior derecha */}
			<div className="absolute top-6 right-6 z-30 flex items-center bg-white bg-opacity-80 rounded-full py-2 px-4 shadow-md">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
					className="feather feather-instagram text-secondary	 mr-2"
				>
					<rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
					<path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
					<line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
				</svg>
				<span className="text-secondary font-semibold text-sm">
					viacarrentaltpa
				</span>
			</div>
		</section>
	);
}
