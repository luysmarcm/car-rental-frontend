// CarouselBrand.jsx
"use client"; // Keep this for Next.js client component

import Image from "next/image";
import Slider from "react-slick"; 
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const originalImages = [
	{ src: "/image/toyota.png", alt: "Logo de Toyota" },
	{ src: "/image/mazda.png", alt: "Logo de Mazda" },
	{ src: "/image/nissan.png", alt: "Logo de Nissan" },
	{ src: "/image/jeep.png", alt: "Logo de Jeep" },
	{ src: "/image/honda.png", alt: "Logo de Honda" },
	{ src: "/image/GMC.png", alt: "Logo de GMC" },
	{ src: "/image/hyundai.png", alt: "Logo de Hyundai" },
	{ src: "/image/Volkswagen.png", alt: "Logo de Volkswagen" },
];

const CarouselBrand = () => {
	

	const settings = {
		dots: false, 
		infinite: true, 
		slidesToShow: 6, 
		slidesToScroll: 1, 
		autoplay: true, 
		autoplaySpeed: 0, 
		speed: 5000, 
		cssEase: "linear", 
		arrows: false, 
		pauseOnHover: true, 
		rtl: false, 
		responsive: [
			{
				breakpoint: 1024, // Tailwind's 'lg' breakpoint
				settings: {
					slidesToShow: 5,
					slidesToScroll: 1,
				},
			},
			{
				breakpoint: 768, // Tailwind's 'md' breakpoint
				settings: {
					slidesToShow: 4,
					slidesToScroll: 1,
				},
			},
			{
				breakpoint: 640, // Tailwind's 'sm' breakpoint
				settings: {
					slidesToShow: 3,
					slidesToScroll: 1,
				},
			},
			{
				breakpoint: 480, // Custom breakpoint for smaller screens
				settings: {
					slidesToShow: 2,
					slidesToScroll: 1,
				},
			},
		],
	};

	return (
		<div className="relative w-full overflow-hidden py-8">
			{/* The outer div handles padding and overall container */}
			<Slider {...settings}>
				{originalImages.map((image, index) => (
					<div
						key={index}
						className="flex justify-center items-center px-4" // Removed fixed width, let slick handle it
					>
						<Image
							src={image.src}
							alt={image.alt}
							width={650}
							height={358}
							className="object-contain w-30 h-30 flex items-center justify-center p-4 lg:p-0"
							priority={index < 8} // Prioritize loading for the first few images
						/>
					</div>
				))}
			</Slider>
		</div>
	);
};

export default CarouselBrand;
