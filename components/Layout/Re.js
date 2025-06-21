import React from 'react'

export const Re = () => {
  return (
		<div className="bg-primary p-10">
			
			<div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg">
				{/* Icono de flecha aquí */}
			</div>
			<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 items-end">
				{/* Lugar de Recogida */}
				<div className="col-span-2 md:col-span-1">
					<label htmlFor="pickupLocation" className="text-gray-300 text-sm">
						Lugar de recogida
					</label>
					<div className="flex items-center bg-white rounded-md p-2 mt-1">
						{/* Icono de ubicación */}
						<span className="mr-2 text-gray-500">📍</span>
						<input
							type="text"
							id="pickupLocation"
							placeholder="Ciudad,aeropuerto"
							className="flex-grow bg-transparent outline-none text-blue-900"
						/>
					</div>
				</div>

				{/* Fecha de Recogida */}
				<div>
					<label htmlFor="pickupDate" className="text-gray-300 text-sm">
						Fecha de recogida
					</label>
					<div className="flex items-center bg-white rounded-md p-2 mt-1">
						{/* Icono de calendario */}
						<span className="mr-2 text-gray-500">📅</span>
						<input
							type="text"
							id="pickupDate"
							defaultValue="Jun 21,2025"
							className="flex-grow bg-transparent outline-none text-blue-900"
						/>
					</div>
				</div>

				{/* Hora de Recogida */}
				<div>
					<label htmlFor="pickupTime" className="text-gray-300 text-sm">
						Hora de recogida
					</label>
					<div className="flex items-center bg-white rounded-md p-2 mt-1">
						{/* Icono de reloj */}
						<span className="mr-2 text-gray-500">⏰</span>
						<input
							type="text"
							id="pickupTime"
							defaultValue="10:00 A.M"
							className="flex-grow bg-transparent outline-none text-blue-900"
						/>
					</div>
				</div>

				{/* Fecha de Entrega */}
				<div>
					<label htmlFor="dropoffDate" className="text-gray-300 text-sm">
						Fecha de entrega
					</label>
					<div className="flex items-center bg-white rounded-md p-2 mt-1">
						{/* Icono de calendario */}
						<span className="mr-2 text-gray-500">📅</span>
						<input
							type="text"
							id="dropoffDate"
							defaultValue="Jun 22,2025"
							className="flex-grow bg-transparent outline-none text-blue-900"
						/>
					</div>
				</div>

				{/* Hora de Entrega */}
				<div>
					<label htmlFor="dropoffTime" className="text-gray-300 text-sm">
						Hora de entrega
					</label>
					<div className="flex items-center bg-white rounded-md p-2 mt-1">
						{/* Icono de reloj */}
						<span className="mr-2 text-gray-500">⏰</span>
						<input
							type="text"
							id="dropoffTime"
							defaultValue="10:00 A.M"
							className="flex-grow bg-transparent outline-none text-blue-900"
						/>
					</div>
				</div>

				{/* Botón GO! */}
				<button className="col-span-2 md:col-span-1 lg:col-span-auto bg-yellow-400 text-blue-900 font-bold py-3 px-6 rounded-md text-2xl mt-4">
					¡IR!
				</button>
			</div>
		</div>
	);
}
