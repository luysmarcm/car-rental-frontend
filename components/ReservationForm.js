// src/app/components/ReservationForm.js

"use client";

import { useMutation, useQuery } from "@apollo/client";
import { useState, useEffect } from "react";

import { GET_CAR_TYPES } from "@/lib/graphql/cars"; // Asegúrate de que la ruta sea correcta y que apunte a carTypes.js
import { CREATE_RESERVATION } from "@/lib/graphql/reservations";
import { CREATE_CUSTOMER } from "@/lib/graphql/customers"; // Asegúrate de que esta ruta sea correcta

const MS_PER_DAY = 1000 * 60 * 60 * 24;

export default function ReservationForm() {
	const [reservationFormData, setReservationFormData] = useState({
		pickup_date: "",
		pickup_time: "10:00",
		dropoff_date: "",
		dropoff_time: "10:00",
		location: "",
		selectedTypeId: "", // Almacena solo el documentId del tipo de carro
		totalPrice: 0,
	});

	const [clientFormData, setClientFormData] = useState({
		first_name: "",
		last_name: "",
		email: "",
		phone: "",
		license_id: "",
	});

	const [showClientModal, setShowClientModal] = useState(false);
	const [dateValidationError, setDateValidationError] = useState(null);
	const [formSubmissionMessage, setFormSubmissionMessage] = useState("");
	const [isSubmissionError, setIsSubmissionError] = useState(false);

	// Consulta para obtener los tipos de carro disponibles
	const {
		data: carTypesData,
		loading: carTypesLoading,
		error: carTypesError,
	} = useQuery(GET_CAR_TYPES);

	const [
		createReservation,
		{ loading: reservationLoading, error: reservationError },
	] = useMutation(CREATE_RESERVATION);

	const [createCustomer, { loading: customerLoading, error: customerError }] =
		useMutation(CREATE_CUSTOMER);

	const handleReservationChange = (e) => {
		const { name, value } = e.target;
		setReservationFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleClientChange = (e) => {
		const { name, value } = e.target;
		setClientFormData((prev) => ({ ...prev, [name]: value }));
	};

	const formatTimeToMilliseconds = (timeStr) => {
		if (!timeStr) {
			return null;
		}
		const parts = timeStr.split(":");
		if (parts.length === 2 && parts[0].length === 2 && parts[1].length === 2) {
			return `${timeStr}:00.000`;
		}
		return timeStr;
	};

	// Efecto para calcular el precio total cuando cambian las fechas o el tipo de carro
	useEffect(() => {
		const { pickup_date, dropoff_date, selectedTypeId } = reservationFormData;

		// Solo calcular si tenemos fechas, un tipo de carro seleccionado y los datos de tipos cargados
		if (
			!pickup_date ||
			!dropoff_date ||
			!selectedTypeId ||
			!carTypesData ||
			carTypesLoading
		) {
			setReservationFormData((prev) => ({ ...prev, totalPrice: 0 }));
			setDateValidationError(null);
			return;
		}

		const pickupDateObj = new Date(pickup_date);
		const dropoffDateObj = new Date(dropoff_date);

		// Validar que la fecha de regreso no sea anterior a la de inicio
		if (dropoffDateObj < pickupDateObj) {
			setDateValidationError(
				"La fecha de regreso no puede ser anterior a la fecha de inicio."
			);
			setReservationFormData((prev) => ({ ...prev, totalPrice: 0 }));
			return;
		} else {
			setDateValidationError(null);
		}

		// Buscar el precio del tipo de carro seleccionado
		// Asegúrate de que carTypesData.types es el camino correcto a tu array de tipos de carro
		const selectedCarType = carTypesData.types.find(
			(type) => type.documentId === selectedTypeId
		);

		if (!selectedCarType) {
			setReservationFormData((prev) => ({ ...prev, totalPrice: 0 }));
			return;
		}

		const pricePerDay = selectedCarType.price; // Usar el precio del tipo de carro

		const timeDiff = dropoffDateObj.getTime() - pickupDateObj.getTime();
		let numberOfDays = Math.round(timeDiff / MS_PER_DAY);

		// Si la diferencia es 0 días, significa que es por al menos 1 día
		if (numberOfDays === 0) {
			numberOfDays = 1;
		} else {
			numberOfDays += 1; // Sumar 1 para incluir el día de retorno completo
		}

		const calculatedTotalPrice = numberOfDays * pricePerDay;
		setReservationFormData((prev) => ({
			...prev,
			totalPrice: calculatedTotalPrice,
		}));
	}, [
		reservationFormData.pickup_date,
		reservationFormData.dropoff_date,
		reservationFormData.selectedTypeId,
		carTypesData,
		carTypesLoading,
	]);

	// Función para manejar el envío del formulario de RESERVA (primera etapa)
	const handleInitialSubmit = async (e) => {
		e.preventDefault();

		setFormSubmissionMessage("");
		setIsSubmissionError(false);

		if (dateValidationError) {
			setFormSubmissionMessage(dateValidationError);
			setIsSubmissionError(true);
			return;
		}

		if (reservationFormData.totalPrice <= 0) {
			setFormSubmissionMessage(
				"El precio total no se pudo calcular. Por favor, verifica las fechas y el tipo de carro seleccionado."
			);
			setIsSubmissionError(true);
			return;
		}

		// Si la reserva es válida, abre el modal para los datos del cliente
		setShowClientModal(true);
	};

	// Función para manejar el envío del formulario del CLIENTE (segunda etapa, dentro del modal)
	const handleClientSubmit = async (e) => {
		e.preventDefault();

		setFormSubmissionMessage("");
		setIsSubmissionError(false);

		// Validaciones de campos del cliente
		if (
			!clientFormData.first_name ||
			!clientFormData.last_name ||
			!clientFormData.email
		) {
			setFormSubmissionMessage(
				"Por favor, completa los campos requeridos del cliente (Nombre, Apellido, Email)."
			);
			setIsSubmissionError(true);
			return;
		}

		try {
			// 1. Crear el Cliente en Strapi
			console.log(
				"Datos del cliente que se enviarán a Strapi (CREATE_CUSTOMER):",
				clientFormData
			);
			const customerResponse = await createCustomer({
				variables: {
					data: clientFormData,
				},
			});

			const customerDocumentId =
				customerResponse.data.createCustomer.documentId;
			console.log(
				"documentId del cliente creado (obtenido de la respuesta de Strapi):",
				customerDocumentId
			);

			const formattedPickupTime = formatTimeToMilliseconds(
				reservationFormData.pickup_time
			);
			const formattedDropoffTime = formatTimeToMilliseconds(
				reservationFormData.dropoff_time
			);

			// 2. Crear la Reserva en Strapi
			// *** CAMBIO CLAVE AQUÍ: 'type' ahora solo envía el documentId ***
			const reservationInputData = {
				pickup_date: reservationFormData.pickup_date,
				pickup_time: formattedPickupTime,
				dropoff_date: reservationFormData.dropoff_date,
				dropoff_time: formattedDropoffTime,
				location: reservationFormData.location,
				type: reservationFormData.selectedTypeId, // ¡SOLO EL DOCUMENTID!
				total_price: reservationFormData.totalPrice,
				customer: customerDocumentId,
			};

			console.log(
				"Datos de la reserva que se enviarán a Strapi (CREATE_RESERVATION):",
				reservationInputData
			);

			await createReservation({
				variables: {
					data: reservationInputData,
				},
			});

			setFormSubmissionMessage("¡Reservación creada con éxito!");
			setIsSubmissionError(false);

			// Cerrar el modal y resetear ambos formularios
			setShowClientModal(false);
			setReservationFormData({
				pickup_date: "",
				pickup_time: "10:00",
				dropoff_date: "",
				dropoff_time: "10:00",
				location: "",
				selectedTypeId: "",
				totalPrice: 0,
			});
			setClientFormData({
				first_name: "",
				last_name: "",
				email: "",
				phone: "",
				license_id: "",
			});
		} catch (err) {
			console.error("Error al finalizar la reserva:", err);
			const errorMessage =
				customerError?.message || reservationError?.message || err.message;
			setFormSubmissionMessage(
				`Hubo un error al crear la reserva: ${errorMessage}`
			);
			setIsSubmissionError(true);
		}
	};

	const isFormLoading = reservationLoading || customerLoading;

	return (
		<div className="max-w-md mx-auto p-6 bg-white rounded-2xl shadow space-y-4">
			<h2 className="text-xl font-bold text-gray-800">Crear Reservación</h2>

			{/* Formulario de la Reserva */}
			<form onSubmit={handleInitialSubmit} className="space-y-4">
				<h3 className="text-lg font-semibold text-gray-700 mt-6 mb-2">
					Detalles de la Reserva
				</h3>
				<div>
					<label
						htmlFor="pickup_date"
						className="block text-sm font-medium text-gray-700"
					>
						Fecha de Inicio
					</label>
					<input
						type="date"
						id="pickup_date"
						name="pickup_date"
						value={reservationFormData.pickup_date}
						onChange={handleReservationChange}
						className="w-full p-2 border rounded text-black"
						required
					/>
				</div>
				<div>
					<label
						htmlFor="pickup_time"
						className="block text-sm font-medium text-gray-700"
					>
						Hora de Inicio
					</label>
					<input
						type="time"
						id="pickup_time"
						name="pickup_time"
						value={reservationFormData.pickup_time}
						onChange={handleReservationChange}
						className="w-full p-2 border rounded text-black"
						required
					/>
				</div>

				<div>
					<label
						htmlFor="dropoff_date"
						className="block text-sm font-medium text-gray-700"
					>
						Fecha de Regreso
					</label>
					<input
						type="date"
						id="dropoff_date"
						name="dropoff_date"
						value={reservationFormData.dropoff_date}
						onChange={handleReservationChange}
						className="w-full p-2 border rounded text-black"
						required
					/>
				</div>
				<div>
					<label
						htmlFor="dropoff_time"
						className="block text-sm font-medium text-gray-700"
					>
						Hora de Regreso
					</label>
					<input
						type="time"
						id="dropoff_time"
						name="dropoff_time"
						value={reservationFormData.dropoff_time}
						onChange={handleReservationChange}
						className="w-full p-2 border rounded text-black"
						required
					/>
				</div>

				{dateValidationError && (
					<p className="text-red-600 text-sm">{dateValidationError}</p>
				)}

				{/* Campo de selección para el Tipo de Carro */}
				<div>
					<label
						htmlFor="selectedTypeId"
						className="block text-sm font-medium text-gray-700"
					>
						Selecciona un Tipo de Carro
					</label>
					<select
						id="selectedTypeId"
						name="selectedTypeId"
						value={reservationFormData.selectedTypeId}
						onChange={handleReservationChange}
						className="w-full p-2 border rounded text-black"
						required
					>
						<option value="">Selecciona un tipo de carro</option>
						{carTypesLoading && <option disabled>Cargando tipos...</option>}
						{carTypesError && (
							<option disabled>
								Error al cargar tipos: {carTypesError.message}
							</option>
						)}
						{carTypesData?.types?.map((carType) => (
							<option key={carType.documentId} value={carType.documentId}>
								{carType.name} (${carType.price}/día)
							</option>
						))}
					</select>
				</div>

				<div>
					<label
						htmlFor="location"
						className="block text-sm font-medium text-gray-700"
					>
						Ubicación
					</label>
					<input
						type="text"
						id="location"
						name="location"
						placeholder="Escribe la ubicación"
						value={reservationFormData.location}
						onChange={handleReservationChange}
						className="w-full p-2 border rounded text-black"
						required
					/>
				</div>

				{reservationFormData.totalPrice > 0 && (
					<div className="text-lg font-bold text-gray-800">
						Precio Total Estimado: ${reservationFormData.totalPrice.toFixed(2)}
					</div>
				)}

				<button
					type="submit"
					disabled={
						reservationLoading ||
						dateValidationError ||
						reservationFormData.totalPrice <= 0 ||
						!reservationFormData.selectedTypeId
					}
					className={`w-full bg-blue-600 text-white font-semibold py-2 rounded ${
						reservationLoading ||
						dateValidationError ||
						reservationFormData.totalPrice <= 0 ||
						!reservationFormData.selectedTypeId
							? "bg-gray-400 cursor-not-allowed"
							: "hover:bg-blue-700"
					}`}
				>
					{reservationLoading
						? "Calculando..."
						: "Proceder a Datos del Cliente"}
				</button>

				{formSubmissionMessage && !showClientModal && (
					<p
						className={`mt-3 text-sm ${
							isSubmissionError ? "text-red-600" : "text-green-600"
						}`}
					>
						{formSubmissionMessage}
					</p>
				)}
			</form>

			{/* Modal para los Datos del Cliente */}
			{showClientModal && (
				<div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center p-4">
					<div className="bg-white rounded-lg p-6 max-w-sm w-full shadow-lg space-y-4">
						<h3 className="text-xl font-bold text-gray-800 mb-4">
							Ingresa tus Datos Personales
						</h3>
						<form onSubmit={handleClientSubmit} className="space-y-4">
							<div>
								<label
									htmlFor="first_name"
									className="block text-sm font-medium text-gray-700"
								>
									Nombre
								</label>
								<input
									type="text"
									id="first_name"
									name="first_name"
									value={clientFormData.first_name}
									onChange={handleClientChange}
									className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm text-black"
									required
								/>
							</div>
							<div>
								<label
									htmlFor="last_name"
									className="block text-sm font-medium text-gray-700"
								>
									Apellido
								</label>
								<input
									type="text"
									id="last_name"
									name="last_name"
									value={clientFormData.last_name}
									onChange={handleClientChange}
									className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm text-black"
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
									value={clientFormData.email}
									onChange={handleClientChange}
									className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm text-black"
									required
								/>
							</div>
							<div>
								<label
									htmlFor="phone"
									className="block text-sm font-medium text-gray-700"
								>
									Teléfono (Opcional)
								</label>
								<input
									type="text"
									id="phone"
									name="phone"
									value={clientFormData.phone}
									onChange={handleClientChange}
									className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm text-black"
								/>
							</div>
							<div>
								<label
									htmlFor="license_id"
									className="block text-sm font-medium text-gray-700"
								>
									Número de Licencia (Opcional)
								</label>
								<input
									type="text"
									id="license_id"
									name="license_id"
									value={clientFormData.license_id}
									onChange={handleClientChange}
									className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm text-black"
								/>
							</div>

							<button
								type="submit"
								disabled={customerLoading || reservationLoading}
								className={`w-full bg-blue-600 text-white font-semibold py-2 rounded ${
									customerLoading || reservationLoading
										? "bg-gray-400 cursor-not-allowed"
										: "hover:bg-blue-700"
								}`}
							>
								{customerLoading || reservationLoading
									? "Procesando..."
									: "Confirmar Reserva"}
							</button>
							<button
								type="button"
								onClick={() => {
									setShowClientModal(false);
									setFormSubmissionMessage("");
									setIsSubmissionError(false);
								}}
								className="w-full bg-gray-300 text-gray-800 font-semibold py-2 rounded mt-2 hover:bg-gray-400"
							>
								Cancelar
							</button>

							{formSubmissionMessage && showClientModal && (
								<p
									className={`mt-3 text-sm ${
										isSubmissionError ? "text-red-600" : "text-green-600"
									}`}
								>
									{formSubmissionMessage}
								</p>
							)}
						</form>
					</div>
				</div>
			)}
		</div>
	);
}
