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
			title: "Pick-up service",
			description: "We offer airport pick-up service.",
		},
		{
			imageSrc: "/image/iconos 5.svg",
			title: "Business hours",
			description: "We work 7 days a week.",
		},
	];

	return (
		<section
			id="about"
			className="py-16 px-4 md:px-8 lg:px-20 bg-white text-center"
		>
			<h2 className="text-4xl sm:text-4xl font-extrabold lg:text-7xl text-secondary text-center mb-10 sm:mb-12 lg:mb-16">
				Why choose us?
			</h2>

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-12 w-full items-stretch justify-items-center">
				{features.map((feature, idx) => {
					// Centrar las dos últimas tarjetas si hay 5
					const isLastRow =
						features.length % 3 === 2 && idx >= features.length - 2;

					return (
						<div
							key={idx}
							className={`bg-gray-100 rounded-xl p-6 sm:p-8 shadow-md flex flex-col items-center relative pt-16 h-full w-full  lg:min-h-[100px] ${
								isLastRow ? "lg:col-span-1" : ""
							}`}
						>
							<div
								className="absolute -top-10 flex justify-center items-center h-20 w-20 sm:h-24 sm:w-24 rounded-full z-10 border-4 border-white"
								style={{ left: "50%", transform: "translateX(-50%)" }}
							>
								<Image
									src={feature.imageSrc}
									alt={feature.title}
									width={100}
									height={100}
								/>
							</div>
							<h3 className="text-2xl sm:text-3xl font-extrabold text-gray-800 mb-4 lg:mt-10">
								{feature.title}
							</h3>
							<p className="text-gray-600 text-lg sm:text-xl italic grow text-center">
								{feature.description}
							</p>
						</div>
					);
				})}
			</div>
		</section>
	);
}
