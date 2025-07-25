// components/FormBooking.jsx (or wherever your component is located)
"use client";
import React from "react";
import { useMutation, useQuery } from "@apollo/client";
import { useState, useEffect } from "react";
import { GET_CAR_TYPES } from "@/lib/graphql/cars";
import { CREATE_RESERVATION } from "@/lib/graphql/reservations";
import { CREATE_CUSTOMER } from "@/lib/graphql/customers";
import { MapPin, CalendarSearch, Clock9, ChevronDown } from "lucide-react";
import { toast } from "react-toastify";

// Import your server actions
import {
	sendCustomerConfirmationEmail,
	sendAdminNotificationEmail,
} from "@/lib/actions";

const MS_PER_DAY = 1000 * 60 * 60 * 24;

const FormBooking = () => {
	const today = new Date().toISOString().slice(0, 10);
	const [reservationFormData, setReservationFormData] = useState({
		pickup_date: today,
		pickup_time: "10:00",
		dropoff_date: today,
		dropoff_time: "10:00",
		location: "",
		selectedTypeId: "",
		totalPrice: 0,
	});

	const [clientFormData, setClientFormData] = useState({
		first_name: "",
		last_name: "",
		email: "",
		phone: "",
		driver_age: "",
	});

	const [showClientModal, setShowClientModal] = useState(false);
	const [dateValidationError, setDateValidationError] = useState(null);
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

	useEffect(() => {
		const { pickup_date, dropoff_date, selectedTypeId } = reservationFormData;

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

		if (dropoffDateObj < pickupDateObj) {
			setDateValidationError(
				"La fecha de regreso no puede ser anterior a la fecha de inicio."
			);
			setReservationFormData((prev) => ({ ...prev, totalPrice: 0 }));
			return;
		} else {
			setDateValidationError(null);
		}

		const selectedCarType = carTypesData.types.find(
			(type) => type.documentId === selectedTypeId
		);

		if (!selectedCarType) {
			setReservationFormData((prev) => ({ ...prev, totalPrice: 0 }));
			return;
		}

		const pricePerDay = selectedCarType.price;

		const timeDiff = dropoffDateObj.getTime() - pickupDateObj.getTime();
		let numberOfDays = Math.round(timeDiff / MS_PER_DAY);

		if (numberOfDays === 0) {
			numberOfDays = 1;
		} else {
			numberOfDays += 1;
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

	const handleInitialSubmit = async (e) => {
		e.preventDefault();

		if (
			!reservationFormData.location ||
			!reservationFormData.pickup_date ||
			!reservationFormData.dropoff_date
		) {
			toast.error(
				"Por favor, completa la ubicación y las fechas de recogida/devolución."
			);
			return;
		}

		if (dateValidationError) {
			toast.error(dateValidationError);
			return;
		}

		setShowClientModal(true);
	};

	const handleClientSubmit = async (e) => {
		e.preventDefault();

		if (
			!clientFormData.first_name ||
			!clientFormData.last_name ||
			!clientFormData.email ||
			!clientFormData.driver_age
		) {
			toast.error(
				"Por favor, completa todos los campos requeridos del cliente (Nombre, Apellido, Email, Edad del Conductor)."
			);
			return;
		}

		if (!reservationFormData.selectedTypeId) {
			toast.error("Por favor, selecciona un tipo de vehículo.");
			return;
		}

		if (reservationFormData.totalPrice <= 0) {
			toast.error(
				"El precio total no se pudo calcular. Por favor, verifica las fechas y el tipo de carro seleccionado."
			);
			return;
		}

		try {
			console.log(
				"Datos del cliente que se enviarán a Strapi (CREATE_CUSTOMER):",
				clientFormData
			);
			const customerResponse = await createCustomer({
				variables: {
					data: clientFormData,
				},
			});

			// Extract the full customer object from the response
			const newCustomer = customerResponse.data.createCustomer;
			const customerDocumentId = newCustomer.documentId; // Use this for reservation

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

			const reservationInputData = {
				pickup_date: reservationFormData.pickup_date,
				pickup_time: formattedPickupTime,
				dropoff_date: reservationFormData.dropoff_date,
				dropoff_time: formattedDropoffTime,
				location: reservationFormData.location,
				type: reservationFormData.selectedTypeId,
				total_price: reservationFormData.totalPrice,
				customer: customerDocumentId,
			};

			console.log(
				"Datos de la reserva que se enviarán a Strapi (CREATE_RESERVATION):",
				reservationInputData
			);

			const reservationResponse = await createReservation({
				variables: {
					data: reservationInputData,
				},
			});

			// Extract the full reservation object from the response
			const newReservation = reservationResponse.data.createReservation;

			// Find the selected car type name for email details
			const selectedCarType = carTypesData.types.find(
				(car) => car.documentId === newReservation.type.documentId
			);
			const carTypeName = selectedCarType ? selectedCarType.name : "N/A";

			// Prepare email details
			const emailDetails = {
				customer: newCustomer, // Pass the full customer object
				reservation: newReservation, // Pass the full reservation object
				carTypeName: carTypeName,
				totalPrice: newReservation.total_price, // Use totalPrice from the confirmed reservation
			};

			// Send emails using the server actions
			await sendCustomerConfirmationEmail(emailDetails);
			await sendAdminNotificationEmail(emailDetails);

			toast.success("Great, you're booked! Check your email for confirmation.");

			setShowClientModal(false);
			setReservationFormData({
				pickup_date: today, // Reset to today or a default for next booking
				pickup_time: "10:00",
				dropoff_date: today, // Reset to today or a default for next booking
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
				driver_age: "",
			});
		} catch (err) {
			console.error("Error during booking process:", err);
			const errorMessage =
				customerError?.message || reservationError?.message || err.message;
			toast.error(`Error: ${errorMessage}`);
		}
	};

	const isFormLoading = reservationLoading || customerLoading;

	return (
		<>
			<form
				onSubmit={handleInitialSubmit}
				className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 items-end"
			>
				<div className="col-span-1">
					<label
						htmlFor="pickupLocation"
						className="text-black text-sm font-semibold mb-1 block"
					>
						Pickup Location
					</label>
					<div className="flex items-center bg-white p-2 border rounded-4xl border-gray-200">
						<MapPin className="text-secondary mr-2" />
						<input
							type="text"
							id="location"
							name="location"
							placeholder="City, airport, etc."
							value={reservationFormData.location}
							onChange={handleReservationChange}
							className="flex-grow bg-transparent outline-none text-negro text-sm leading-none"
							required
						/>
					</div>
				</div>

				<div className="col-span-1">
					<label
						htmlFor="pickupDate"
						className="text-black text-sm font-semibold mb-1 block"
					>
						Pickup Date
					</label>
					<div className="flex items-center bg-white p-2 border rounded-4xl border-gray-200 relative">
						<CalendarSearch className="text-secondary mr-2" />
						<input
							type="date"
							id="pickup_date"
							name="pickup_date"
							value={reservationFormData.pickup_date}
							onChange={handleReservationChange}
							className="flex-grow bg-transparent outline-none text-negro text-sm leading-none appearance-none"
							required
						/>
					</div>
				</div>

				<div className="col-span-1">
					<label
						htmlFor="pickupTime"
						className="text-black text-sm font-semibold mb-1 block"
					>
						Pickup Time
					</label>
					<div className="flex items-center bg-white p-2 border rounded-4xl border-gray-200 relative">
						<Clock9 className="text-secondary mr-2" />
						<input
							type="time"
							id="pickup_time"
							name="pickup_time"
							value={reservationFormData.pickup_time}
							onChange={handleReservationChange}
							className="flex-grow bg-transparent outline-none text-negro text-sm appearance-none"
							required
						/>
					</div>
				</div>

				<div className="col-span-1">
					<label
						htmlFor="dropoffDate"
						className="text-black text-sm font-semibold mb-1 block"
					>
						Dropoff Date
					</label>
					<div className="flex items-center bg-white p-2 border rounded-4xl border-gray-200 relative">
						<CalendarSearch className="text-secondary mr-2" />
						<input
							type="date"
							id="dropoff_date"
							name="dropoff_date"
							value={reservationFormData.dropoff_date}
							onChange={handleReservationChange}
							className="flex-grow bg-transparent outline-none text-negro text-sm appearance-none"
							required
						/>
					</div>
				</div>

				<div className="col-span-1">
					<label
						htmlFor="dropoffTime"
						className="text-black text-sm font-semibold mb-1 block"
					>
						Dropoff Time
					</label>
					<div className="flex items-center bg-white p-2 border rounded-4xl border-gray-200 relative">
						<Clock9 className="text-secondary mr-2" />
						<input
							type="time"
							id="dropoff_time"
							name="dropoff_time"
							value={reservationFormData.dropoff_time}
							onChange={handleReservationChange}
							className="flex-grow bg-transparent outline-none text-negro text-sm appearance-none"
							required
						/>
					</div>
				</div>

				{dateValidationError && (
					<p className="col-span-full text-red-600 text-sm mt-2">
						{dateValidationError}
					</p>
				)}

				<div className="col-span-1 sm:col-span-2 lg:col-span-1">
					<button
						type="submit" // Este botón ahora solo abre el modal
						disabled={isFormLoading || dateValidationError}
						className={`w-full bg-secondary text-white font-semibold py-3 px-2 rounded-4xl shadow-md transition-colors duration-300 uppercase tracking-wider text-lg ${
							isFormLoading || dateValidationError
								? "bg-gray-400 cursor-not-allowed"
								: "hover:bg-blue-700 hover:bg-gris hover:text-secondary"
						}`}
					>
						{isFormLoading ? "Loading..." : "GO"}
					</button>
				</div>
			</form>

			{showClientModal && (
				<div className="fixed inset-0 flex items-center justify-center bg-opacity-50 p-4 z-[999]">
					<div className="absolute bg-white rounded-lg p-6 md:p-8 lg:p-10 w-full max-w-sm sm:max-w-md md:max-w-xl lg:max-w-3xl shadow-lg space-y-4">
						<h3 className="text-xl md:text-2xl font-bold text-secondary mb-4 text-center">
							Enter Your Information
						</h3>
						<form
							onSubmit={handleClientSubmit}
							className="grid gap-4 sm:gap-6 grid-cols-1 md:grid-cols-2"
						>
							{/* Campos del cliente */}
							<div>
								<label
									htmlFor="first_name"
									className="block text-sm md:text-base font-bold text-gray-700"
								>
									First Name
								</label>
								<div className="flex items-center bg-white p-2 border rounded-4xl border-gray-200">
									<input
										type="text"
										id="first_name"
										name="first_name"
										value={clientFormData.first_name}
										onChange={handleClientChange}
										className="flex-grow bg-transparent outline-none text-black text-sm"
										required
									/>
								</div>
							</div>
							<div>
								<label
									htmlFor="last_name"
									className="block text-sm md:text-base font-bold text-gray-700"
								>
									Last Name
								</label>
								<div className="flex items-center bg-white p-2 border rounded-4xl border-gray-200">
									<input
										type="text"
										id="last_name"
										name="last_name"
										value={clientFormData.last_name}
										onChange={handleClientChange}
										className="flex-grow bg-transparent outline-none text-black text-sm"
										required
									/>
								</div>
							</div>
							<div>
								<label
									htmlFor="email"
									className="block text-sm md:text-base font-bold text-gray-700"
								>
									Email Address
								</label>
								<div className="flex items-center bg-white p-2 border rounded-4xl border-gray-200">
									<input
										type="email"
										id="email"
										name="email"
										value={clientFormData.email}
										onChange={handleClientChange}
										className="flex-grow bg-transparent outline-none text-black text-sm"
										required
									/>
								</div>
							</div>
							<div>
								<label
									htmlFor="phone"
									className="block text-sm md:text-base font-bold text-gray-700 "
								>
									Phone
								</label>
								<div className="flex items-center bg-white p-2 border rounded-4xl border-gray-200">
									<input
										type="text"
										id="phone"
										name="phone"
										value={clientFormData.phone}
										onChange={handleClientChange}
										className="flex-grow bg-transparent outline-none text-black text-sm"
									/>
								</div>
							</div>

							{/* Nuevo campo para driver_age */}
							<div className="col-span-full">
								<label
									htmlFor="driver_age"
									className="block text-sm md:text-base font-bold text-gray-700 mb-1"
								>
									Driver Age
								</label>
								<div className="flex items-center bg-white p-2 border rounded-4xl border-gray-200">
									<select
										id="driver_age"
										name="driver_age"
										value={clientFormData.driver_age}
										onChange={handleClientChange}
										className="flex-grow bg-transparent outline-none text-black text-sm"
										required
									>
										<option value="">Select age range</option>
										<option value="age_21_25">Age 21-25</option>
										<option value="age_26_85">Age 26-85</option>
										<option value="age_86_and_over">Age 86 and over</option>
									</select>
								</div>
							</div>

							{/* Vehicles Preferred */}
							<div className="col-span-full">
								<label
									htmlFor="selectedTypeId"
									className="block text-sm md:text-base font-bold text-gray-700 mb-1"
								>
									Vehicles Preferred
								</label>
								<div className="flex items-center bg-white p-2 border rounded-4xl border-gray-200">
									<select
										id="selectedTypeId"
										name="selectedTypeId"
										value={reservationFormData.selectedTypeId}
										onChange={handleReservationChange}
										className="flex-grow bg-transparent outline-none text-black text-sm"
										required
									>
										<option value="">All vehicles</option>
										{carTypesLoading && (
											<option disabled>Cargando tipos...</option>
										)}
										{carTypesError && (
											<option disabled>
												Error al cargar tipos: {carTypesError.message}
											</option>
										)}
										{carTypesData?.types?.map((carType) => (
											<option
												key={carType.documentId}
												value={carType.documentId}
											>
												{carType.name} (${carType.price}/día)
											</option>
										))}
									</select>
								</div>
							</div>

							{/* Botones de acción del modal */}
							<div className="col-span-full flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mt-4">
								<button
									type="submit"
									disabled={
										isFormLoading ||
										reservationFormData.totalPrice <= 0 ||
										!reservationFormData.selectedTypeId ||
										!clientFormData.driver_age
									}
									className={`flex-1 bg-primary text-gris font-semibold py-3 px-2 rounded-4xl shadow-md transition-colors duration-300 uppercase tracking-wider text-base md:text-lg ${
										isFormLoading ||
										reservationFormData.totalPrice <= 0 ||
										!reservationFormData.selectedTypeId ||
										!clientFormData.driver_age
											? "bg-gray-400 cursor-not-allowed"
											: "hover:bg-secondary"
									}`}
								>
									{isFormLoading ? "Processing..." : "Submit"}
								</button>
								<button
									type="button"
									onClick={() => {
										setShowClientModal(false);
									}}
									className="flex-1 bg-gray-300 text-gray-800 font-semibold py-3 px-2 rounded-4xl shadow-md transition-colors duration-300 uppercase tracking-wider text-base md:text-lg hover:bg-gray-400"
								>
									Cancel
								</button>
							</div>
						</form>
					</div>
				</div>
			)}
		</>
	);
};

export default FormBooking;
