import React from "react";
import { MapPin, CalendarSearch, Clock9, ChevronDown } from "lucide-react";


const BookingForm = () => {
	return (
		<div className="relative bg-primary p-8 rounded-tl-4xl rounded-tr-4xl md:p-10">
			<div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg">
				<ChevronDown
					strokeWidth={5}
					className="w-10 h-10 text-secondary bg-gris rounded-full"
				/>
			</div>

			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 items-end">
				<div className="col-span-1">
					<label
						htmlFor="pickupLocation"
						className="text-black text-sm font-semibold mb-1 block"
					>
						Pickup Location
					</label>
					<div className="flex items-center bg-white  p-2 border rounded-4xl border-gray-200 ">
						<MapPin className="text-secondary mr-2" />
						<input
							type="text"
							id="pickupLocation"
							placeholder="City,airport" // Placeholder en inglés como en la imagen
							defaultValue="Doral, FL (US)" // Valor por defecto como en la imagen_e3cc38.png
							className="flex-grow outline-none text-negro text-sm " // text-negro para el texto de entrada
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
					<div className="flex items-center bg-white  p-2 border rounded-4xl border-gray-200">
						<CalendarSearch className="text-secondary mr-2" />
						<input
							type="text"
							id="pickupDate"
							defaultValue="Jun 21,2025" // Valor por defecto
							className="flex-grow bg-transparent outline-none text-negro text-sm"
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
					<div className="flex items-center bg-white  p-2 border rounded-4xl border-gray-200">
						<Clock9 className="text-secondary mr-2" />
						<input
							type="text"
							id="pickupTime"
							defaultValue="10:00 AM" // Valor por defecto
							className="flex-grow bg-transparent outline-none text-negro text-sm"
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
					<div className="flex items-center bg-white  p-2 border rounded-4xl border-gray-200">
						<CalendarSearch className="text-secondary mr-2" />
						<input
							type="text"
							id="dropoffDate"
							defaultValue="Jun 22,2025" // Valor por defecto (imagen_e3cc38.png muestra Jun 18, 2025, ajustado a tu fecha anterior)
							className="flex-grow bg-transparent outline-none text-negro text-sm"
						/>
					</div>
				</div>

				{/* Hora de Entrega */}
				<div className="col-span-1">
					<label
						htmlFor="dropoffTime"
						className="text-black text-sm font-semibold mb-1 block"
					>
						Dropoff Time
					</label>
					<div className="flex items-center bg-white  p-2 border rounded-4xl border-gray-200">
						<Clock9 className="text-secondary mr-2" />
						<input
							type="text"
							id="dropoffTime"
							defaultValue="10:00 AM" // Valor por defecto (imagen_e3cc38.png muestra 10:00 PM, ajustado a tu hora anterior)
							className="flex-grow bg-transparent outline-none text-negro text-sm"
						/>
					</div>
				</div>
				<div >
					<button className="bg-secondary  p-2 rounded-4xl  text-xl font-extrabold">
						GO!
					</button>
				</div>
			</div>
		</div>
	);
};

export default BookingForm;
