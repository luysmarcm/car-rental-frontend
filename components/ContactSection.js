// ContactSection.jsx
"use client";

import { useState } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_CONTACT_MUTATION } from "@/lib/graphql/contact";
import Image from "next/image";
import { toast } from "react-toastify";
import { Mail } from "lucide-react";

export default function ContactSection() {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		phone: "",
		message: "",
	});

	const [createContact, { loading: mutationLoading }] = useMutation(
		CREATE_CONTACT_MUTATION,
		{
			onCompleted: (data) => {
				console.log("Contacto creado exitosamente:", data.createContact);
				toast.success("¡Gracias! Tu mensaje ha sido enviado.", {
					theme: "colored",
				});
				setFormData({ name: "", email: "", phone: "", message: "" });
			},
			onError: (error) => {
				console.error("Error al crear el contacto:", error);
				toast.error(
					"Hubo un error al enviar tu mensaje. Por favor, inténtalo de nuevo.",
					{
						position: "top-right",
						autoClose: 5000,
						hideProgressBar: false,
						closeOnClick: true,
						pauseOnHover: true,
						draggable: true,
						progress: undefined,
						theme: "colored",
					}
				);
			},
		}
	);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!formData.name || !formData.email || !formData.message) {
			toast.error("Por favor, completa todos los campos requeridos.", {
				position: "top-right",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "colored",
			});
			return;
		}

		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(formData.email)) {
			toast.error("Por favor, introduce un correo electrónico válido.", {
				position: "top-right",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "colored",
			});
			return;
		}

		try {
			await createContact({
				variables: {
					data: {
						name: formData.name,
						email: formData.email,
						phone: formData.phone,
						message: formData.message,
					},
				},
			});
		} catch (err) {
			console.error("Error general de envío (catch):", err);
		}
	};

	return (
		<section
			id="contact"
			className="relative flex flex-col md:flex-row items-center justify-center min-h-screen bg-white"
		>
			<div className="relative w-full md:w-1/2 h-[500px] md:h-auto md:min-h-screen">
				<Image
					src="/image/contact.png"
					alt="Office Image"
					fill
					className="object-cover w-full h-full opacity-80"
				/>
			</div>

			<div className="absolute top-0 left-0 w-full h-full flex items-center justify-center p-4 md:static md:w-1/2 md:p-12  md:bg-white z-10">
				<div className="w-full max-w-xl">
					<h2 className="text-4xl sm:text-4xl font-extrabold lg:text-7xl text-center mb-10 sm:mb-12 lg:mb-16 text-secondary">
						CONTACT US
					</h2>
					<form
						onSubmit={handleSubmit}
						className="grid gap-4 sm:gap-6 grid-cols-1 md:grid-cols-2"
					>
						<div>
							<label
								htmlFor="name"
								className="text-black text-sm font-semibold"
							>
								Name
							</label>
							<div className="flex items-center bg-white p-2 border rounded-4xl border-gray-200">
								<input
									type="text"
									id="name"
									name="name"
									value={formData.name}
									onChange={handleChange}
									className="flex-grow bg-transparent outline-none text-black text-sm"
									required
								/>
							</div>
						</div>

						<div>
							<label
								htmlFor="phone"
								className="text-black text-sm font-semibold"
							>
								Phone
							</label>
							<div className="flex items-center bg-white p-2 border rounded-4xl border-gray-200">
								<input
									type="text"
									id="phone"
									name="phone"
									value={formData.phone}
									onChange={handleChange}
									className="flex-grow bg-transparent outline-none text-black text-sm"
									required
								/>
							</div>
						</div>
						<div className="col-span-full">
							<label
								htmlFor="email"
								className="text-black text-sm font-semibold"
							>
								Email
							</label>
							<div className="flex items-center bg-white p-2 border rounded-4xl border-gray-200">
								<input
									type="email"
									id="email"
									name="email"
									value={formData.email}
									onChange={handleChange}
									className="flex-grow bg-transparent outline-none text-black text-sm"
									required
								/>
							</div>
						</div>

						{/* Mensaje */}
						<div className="col-span-full">
							<label
								htmlFor="message"
								className="text-black text-sm font-semibold"
							>
								Message
							</label>
							<textarea
								id="message"
								name="message"
								value={formData.message}
								onChange={handleChange}
								rows="4"
								className="w-full p-2 border border-gray-300 rounded-2xl text-secondary bg-white"
								required
							/>
						</div>

						{/* Botón */}
						<div className="col-span-full">
							<button
								type="submit"
								disabled={mutationLoading}
								className={`bg-primary text-gris font-extrabold py-2 px-4 rounded-4xl shadow-sm w-full italic ${
									mutationLoading
										? "opacity-50 cursor-not-allowed"
										: "hover:bg-secondary hover:text-white transition-colors duration-300"
								}`}
							>
								{mutationLoading ? "SENT..." : "SUBMIT"}
							</button>
						</div>
					</form>
					<div className="flex flex-col sm:flex-row items-center place-content-around text-sm py-5">
						<div className="flex items-center bg-white bg-opacity-80 rounded-full py-2 px-4 shadow-md">
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
						<div className="flex items-center bg-white bg-opacity-80 rounded-full py-2 px-4 shadow-md">
							<Mail className="feather feather-instagram text-secondary	 mr-2" />
							<span className="text-secondary font-semibold text-sm">
								viacarrental21@gmail.com
							</span>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
