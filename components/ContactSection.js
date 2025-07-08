// ContactSection.jsx
"use client";

import { useState } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_CONTACT_MUTATION } from "@/lib/graphql/contact";
import Image from "next/image";
import { toast } from "react-toastify";

export default function ContactSection() {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
        phone:"",
		message: "",
	});

	const [createContact, { loading: mutationLoading, error: mutationError }] =
		useMutation(CREATE_CONTACT_MUTATION, {
			onCompleted: (data) => {
				console.log("Contacto creado exitosamente:", data.createContact);
				
				toast.success("¡Gracias! Tu mensaje ha sido enviado.", {
					
					theme: "colored", 
				});
				setFormData({ name: "", email: "", message: "", phone:"" });
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
		});

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
			className="flex flex-col md:flex-row items-center justify-center min-h-screen bg-white"
		>
			<div className="md:w-1/2 w-full flex justify-center">
				<Image
					src="/image/contacto.svg"
					alt="Office Image"
					width={1000}
					height={750}
					className=" inset-0 w-full h-full z-0 opacity-80 object-cover"
				/>
			</div>
			<div className="md:w-1/2 w-full mt-10 md:mt-0 md:pl-12 p-6">
				<h2 className="text-4xl sm:text-4xl font-extrabold lg:text-7xl text-secondary text-center mb-10 sm:mb-12 lg:mb-16">
					CONTACT US
				</h2>
				<form onSubmit={handleSubmit} className="flex flex-col">
					<div className="col-span-1">
						<label
							htmlFor="name"
							className="text-black text-sm font-semibold mb-1 block"
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
								className="flex-grow bg-transparent outline-none text-negro text-sm leading-none"
								required
							/>
						</div>
					</div>
					<div className="col-span-1">
						<label
							htmlFor="name"
							className="text-black text-sm font-semibold mb-1 block"
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
								className="flex-grow bg-transparent outline-none text-negro text-sm leading-none"
								required
							/>
						</div>
					</div>

					<div className="col-span-1">
						<label
							htmlFor="email"
							className="text-black text-sm font-semibold mb-1 block"
						>
							Email
						</label>
						<div className="flex items-center bg-white p-2 border rounded-4xl border-gray-200 relative">
							<input
								type="email"
								id="email"
								name="email"
								value={formData.email}
								onChange={handleChange}
								className="flex-grow bg-transparent outline-none text-negro text-sm appearance-none"
								required
							/>
						</div>
					</div>
					<div>
						<label
							htmlFor="message"
							className="text-black text-sm font-semibold mb-1 block"
						>
							Message
						</label>
						<textarea
							id="message"
							name="message"
							value={formData.message}
							onChange={handleChange}
							rows="4"
							className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm text-secondary"
							required
						></textarea>
					</div>

					<div className="col-span-1 sm:col-span-2 lg:col-span-1 place-content-center py-5">
						<button
							type="submit"
							disabled={mutationLoading}
							className={` bg-primary text-secondary font-semibold py-2 px-4 rounded-4xl shadow-sm ${
								mutationLoading
									? "opacity-50 cursor-not-allowed"
									: "hover:bg-primary-dark transition-colors duration-300"
							}`}
						>
							{mutationLoading ? "Enviando..." : "Submit"}
						</button>
					</div>
				</form>
				<div className="flex items-center gap-4 mt-6 text-blue-900">
					<div className="flex items-center gap-2">
						{/* <MdEmail className="text-xl" /> */}
						<span>viacarrental21@gmail.com</span>
					</div>
					<div className="flex items-center gap-2">
						{/* <FaInstagram className="text-xl" /> */}
						<span>@viacarrentaltpa</span>
					</div>
				</div>
			</div>
		</section>
	);
}
