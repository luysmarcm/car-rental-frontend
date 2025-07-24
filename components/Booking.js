"use client";
import { ChevronDown } from "lucide-react";
import FormBooking from "./Form/FormBooking";


const Booking = () => {
	
	return (
		<section
			className="relative bg-primary p-8 rounded-tl-4xl rounded-tr-4xl md:p-10 "
		>
			<div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg">
				<ChevronDown
					strokeWidth={5}
					className="w-10 h-10 text-secondary bg-gray-300 rounded-full"
				/>
			</div>
			<FormBooking/>
		</section>
	);
};

export default Booking;
