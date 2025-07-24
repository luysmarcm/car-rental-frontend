"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react"; // Importamos useState para manejar el estado del menú móvil

export default function Navbar() {
	const [isOpen, setIsOpen] = useState(false); // Estado para controlar si el menú móvil está abierto

	const links = [
		{
			name: "Home",
			href: "#reserva",
			current: false,
		},
		{
			name: "Reserve",
			href: "#reserva",
			current: false,
		},
		{
			name: "About",
			href: "#about",
			current: false,
		},
		{
			name: "Vehicles",
			href: "#vehicles",
			current: false,
		},
	];

	return (
		<nav className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4">
			<div className="flex items-center w-full max-w-7xl px-6 py-2 rounded-full shadow-lg bg-primary relative">
				{" "}
				{/* Agregamos 'relative' aquí para posicionar el menú móvil */}
				{/* Logo */}
				<div className="flex w-32 md:w-1/2 justify-start font-extrabold ">
					<Link href="/" passHref>
						<div style={{ width: "60px" }}>
							<Image src="/image/via.svg" alt="Logo" width="484" height="326" />
						</div>
					</Link>
				</div>
				{/* Botón de Hamburguesa para Móvil */}
				<div className="ml-auto flex items-center lg:hidden">
					{" "}
					{/* Solo visible en pantallas pequeñas */}
					<button
						onClick={() => setIsOpen(!isOpen)}
						className="text-secondary p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-inset focus:ring-secondary"
						aria-expanded={isOpen ? "true" : "false"}
						aria-label="Toggle navigation"
					>
						{isOpen ? (
							// Icono de X cuando el menú está abierto
							<svg
								className="h-6 w-6"
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M6 18L18 6M6 6l12 12"
								/>
							</svg>
						) : (
							// Icono de Hamburguesa cuando el menú está cerrado
							<svg
								className="h-6 w-6"
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M4 6h16M4 12h16M4 18h16"
								/>
							</svg>
						)}
					</button>
				</div>
				{/* Contenido del Navbar para Desktop */}
				<div className="hidden lg:flex ml-auto items-center space-x-6 text-secondary">
					<div className="mr-3 flex items-center space-x-4">
						{links.map((link) => (
							<Link
								key={link.name}
								href={link.href}
								className="px-3 py-2 rounded-md text-sm lg:text-base uppercase font-extrabold text-gris hover:text-secondary transition-colors duration-200"
							>
								{link.name}
							</Link>
						))}
					</div>
					{/* Botón de Contacto para Desktop */}
					<Link href="#contact" passHref>
						{" "}
						{/* Asume una página de contacto, cambia la href si es diferente */}
						<button className="rounded-full font-extrabold text-white bg-secondary px-4 py-1 hover:bg-gris text-sm transition-colors duration-200">
							CONTACT
						</button>
					</Link>
				</div>
			</div>

			{/* Menú Móvil (se muestra/oculta según el estado 'isOpen') */}
			<div
				className={`lg:hidden absolute top-full left-0 right-0 bg-primary shadow-lg rounded-b-lg overflow-hidden transition-all duration-300 ease-in-out ${
					isOpen ? "max-h-screen opacity-100 py-4" : "max-h-0 opacity-0"
				}`}
			>
				<div className="flex flex-col items-center space-y-4 text-secondary">
					{links.map((link) => (
						<Link
							key={link.name}
							href={link.href}
							className="w-full text-center px-4 py-2 text-lg uppercase font-semibold hover:bg-gray-700 hover:text-white transition-colors duration-200"
							onClick={() => setIsOpen(false)} // Cierra el menú al hacer clic en un enlace
						>
							{link.name}
						</Link>
					))}
					{/* Botón de Contacto dentro del menú móvil */}
					<Link href="/contact" passHref>
						{" "}
						{/* Asume una página de contacto, cambia la href si es diferente */}
						<button
							className="mt-4 rounded-full font-light text-white bg-secondary px-6 py-2 hover:bg-morado text-base w-fit transition-colors duration-200"
							onClick={() => setIsOpen(false)} // Cierra el menú al hacer clic en el botón
						>
							Contact
						</button>
					</Link>
				</div>
			</div>
		</nav>
	);
}
