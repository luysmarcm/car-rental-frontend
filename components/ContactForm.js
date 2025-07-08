// components/ContactForm.jsx
"use client";

import { useState } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_CONTACT_MUTATION } from "@/lib/graphql/contact"; // Importa la mutación que acabamos de definir

export default function ContactForm() {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		message: "",
	});

	const [submissionMessage, setSubmissionMessage] = useState("");
	const [isError, setIsError] = useState(false);

	const [createContact, { loading: mutationLoading, error: mutationError }] =
		useMutation(CREATE_CONTACT_MUTATION, {
			// Opcional: Refetch queries si necesitas que otros componentes se actualicen con el nuevo contacto
			// refetchQueries: [
			//   'GetContacts' // Si tuvieras una query para listar contactos
			// ],
			onCompleted: (data) => {
				console.log("Contacto creado exitosamente:", data.createContact);
				setSubmissionMessage("¡Gracias! Tu mensaje ha sido enviado.");
				setIsError(false);
				// Opcional: Resetear el formulario después de un envío exitoso
				setFormData({ name: "", email: "", message: "" });
			},
			onError: (error) => {
				console.error("Error al crear el contacto:", error);
				setSubmissionMessage(
					"Hubo un error al enviar tu mensaje. Por favor, inténtalo de nuevo."
				);
				setIsError(true);
			},
		});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		setSubmissionMessage(""); // Limpiar mensajes anteriores
		setIsError(false);

		// Validaciones básicas del lado del cliente
		if (!formData.name || !formData.email || !formData.message) {
			setSubmissionMessage("Por favor, completa todos los campos requeridos.");
			setIsError(true);
			return;
		}

		// Validación de formato de email (simple)
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(formData.email)) {
			setSubmissionMessage(
				"Por favor, introduce un correo electrónico válido."
			);
			setIsError(true);
			return;
		}

		try {
			await createContact({
				variables: {
					data: {
						name: formData.name,
						email: formData.email,
						message: formData.message,
					},
				},
			});
			// Los mensajes de éxito/error se manejan en `onCompleted` y `onError` de useMutation
		} catch (err) {
			// Este catch atrapará errores de red o errores antes de que Apollo los maneje.
			// Los errores de GraphQL (ej. validaciones de Strapi) se manejan en `onError` de useMutation.
			console.error("Error general de envío:", err);
			// No es estrictamente necesario ya que `onError` de useMutation ya lo maneja
		}
	};

	return (
		<div className="max-w-md mx-auto p-6 bg-white rounded-2xl shadow space-y-4 text-black">
			<h2 className="text-xl font-bold text-gray-800">Contáctanos</h2>
			<form onSubmit={handleSubmit} className="space-y-4">
				<div>
					<label
						htmlFor="name"
						className="block text-sm font-medium text-gray-700"
					>
						Nombre
					</label>
					<input
						type="text"
						id="name"
						name="name"
						value={formData.name}
						onChange={handleChange}
						className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
						required
					/>
				</div>
				<div>
					<label
						htmlFor="email"
						className="block text-sm font-medium text-gray-700"
					>
						Email
					</label>
					<input
						type="email"
						id="email"
						name="email"
						value={formData.email}
						onChange={handleChange}
						className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
						required
					/>
				</div>
				<div>
					<label
						htmlFor="message"
						className="block text-sm font-medium text-gray-700"
					>
						Message
					</label>
					<textarea
						id="message"
						name="message"
						value={formData.message}
						onChange={handleChange}
						rows="4"
						className="mt-1 block w-full p-2 border border-gray-300 rounded-4xl shadow-sm"
						required
					></textarea>
				</div>

				<button
					type="submit"
					disabled={mutationLoading}
					className={`w-full bg-green-600 text-white font-semibold py-2 px-4 rounded-md shadow-sm ${
						mutationLoading
							? "opacity-50 cursor-not-allowed"
							: "hover:bg-green-700"
					}`}
				>
					{mutationLoading ? "Enviando..." : "Enviar Mensaje"}
				</button>

				{submissionMessage && (
					<p
						className={`mt-3 text-sm ${
							isError ? "text-red-600" : "text-green-600"
						}`}
					>
						{submissionMessage}
					</p>
				)}
				{mutationError && ( // Mostrar errores específicos de GraphQL si ocurren
					<p className="mt-3 text-sm text-red-600">
						Error: {mutationError.message}
					</p>
				)}
			</form>
		</div>
	);
}
