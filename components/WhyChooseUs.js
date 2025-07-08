import Image from "next/image";

export default function WhyChooseUs() {
	const features = [
		{
			imageSrc: "/image/iconos 1.svg",
			title: "Great variety",
			description: "We have a wide variety of models that adapt to your needs.",
		},
		{
			imageSrc: "/image/iconos 2.svg",
			title: "Profitability",
			description:
				"You will get affordable costs, which will allow you to save.",
		},
		{
			imageSrc: "/image/iconos 3.svg",
			title: "Reliability and security",
			description: "Reliable and safe vehicles that guarantee your well-being.",
		},
		{
			imageSrc: "/image/iconos 4.svg",
			title: "Reliability and security",
			description: "Reliable and safe vehicles that guarantee your well-being.",
		},
		{
			imageSrc: "/image/iconos 5.svg",
			title: "Reliability and security",
			description: "Reliable and safe vehicles that guarantee your well-being.",
		},
	];

	return (
		<section className="py-16 px-4 md:px-8 lg:px-20 bg-white text-center">
			<h2 className="text-4xl sm:text-4xl font-extrabold lg:text-7xl text-secondary text-center mb-10 sm:mb-12 lg:mb-16">
				Why choose us?
			</h2>

			<div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 mt-10">
				{features.map((feature, idx) => (
					<div
						key={idx}
						className="bg-gray-100 rounded-xl p-6 sm:p-8 text-center shadow-md flex flex-col items-center relative pt-16"
					>
						<div
							className="absolute -top-10
                            flex justify-center items-center h-20 w-20 sm:h-24 sm:w-24
                            rounded-full  z-10 border-4 border-white"
							style={{ left: "50%", transform: "translateX(-50%)" }} // Centrar horizontalmente
						>
							<Image
								src={feature.imageSrc}
								alt={feature.title}
								width={100}
								height={100}
								className=""
							/>
						</div>
						<h3 className="text-2xl sm:text-3xl font-extrabold text-gray-800 mb-4 lg:mt-10">
							{feature.title}
						</h3>
						<p className="text-gray-600 text-lg sm:text-xl italic">
							{feature.description}
						</p>
					</div>
				))}
			</div>
		</section>
	);
}
