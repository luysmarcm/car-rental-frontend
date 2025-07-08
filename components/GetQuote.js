"use client";
import { useState } from "react";
import Modal from "./Modal/Modal";

const GetQuote = () => {
	const [isModalOpen, setIsModalOpen] = useState(false);

	return (
		<div className="flex flex-col space-y-4">
			<button
				className="rounded-full text-white font-bold bg-primary py-3 p-3 hover:bg-secundary"
				onClick={() => setIsModalOpen(true)} // This will open the modal
			>
				Abrir Modal {/* You can change this text as needed */}
			</button>
			<Modal
				isOpen={isModalOpen}
				onClose={() => setIsModalOpen(false)}
			/>
		</div>
	);
};

export default GetQuote;
