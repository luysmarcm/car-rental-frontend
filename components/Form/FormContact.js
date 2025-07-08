"use client";
import React, { useState, useRef } from "react";


const FormContact = () => {
	
	return (
		<form  className="w-full max-w-lg pt-4 px-4">
			<div className="flex flex-wrap -mx-3 mb-6 ">
				<div className="w-full px-3">
					<label
						className="block tracking-wide text-gray-700 text-xs lg:text-xl font-bold mb-2"
						htmlFor="nombre"
					>
						{/* {t("services")} */}
					</label>
					<input
						readOnly
						className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded-full  mb-3  px-5 py-1 leading-tight focus:outline-none focus:bg-white"
						id="servicio"
						type="text"
						placeholder="Juan Pérez"
						name="servicio"
						
					/>
				</div>
				<div className="w-full px-3">
					<label
						className="block tracking-wide text-gray-700 text-xs lg:text-xl font-bold mb-2"
						htmlFor="nombre"
					>
						{/* {t("name")} */}
					</label>
					<input
						className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded-full  mb-3  px-5 py-1 leading-tight focus:outline-none focus:bg-white"
						id="nombre"
						type="text"
						placeholder="Juan Pérez"
						name="nombre"
						
					/>
				</div>
				<div className="w-full px-3">
					<label
						className="block  tracking-wide text-gray-700 text-xs font-bold mb-2 lg:text-xl"
						htmlFor="telefono"
					>
						{/* {t("phone")} */}
					</label>
					<input
						className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded-full  mb-3  px-5 py-1 leading-tight focus:outline-none focus:bg-white"
						id="text"
						type="text"
						// value={formData.telefono}
					
					/>
				</div>
				
			</div>

			<div className="flex flex-wrap -mx-3 mb-6">
				<div className="w-full h-full px-3">
					<button
						className="rounded-full font-semibold text-white bg-primary px-5 py-1 hover:bg-secundary w-full h-full "
						type="submit"
					>
						wwww
					</button>
				</div>
			</div>
		</form>
	);
};

export default FormContact;
