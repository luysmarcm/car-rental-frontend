import Image from "next/image";
import { CalendarDays, Clock, MapPin } from "lucide-react";

export default function HeroSection() {
	return (
		<section className="grid grid-cols-1 md:grid-cols-2 min-h-screen bg-rosado">
			{/* Left - Image */}
			<div className="relative flex items-center justify-center bg-gradient-to-br from-blue-100 to-orange-100">
				<Image
					src="/image/hero.png" // Asegúrate de tener esta imagen en /public
					alt="Car"
					width={600}
					height={400}
					className="object-contain"
					priority
				/>
			</div>

			{/* Right - Content */}
			<div className="flex flex-col justify-between px-8 py-32">
				<div>
					{/* <div className="text-right">
						<span className="text-sm text-gray-500">@viacarrentaltpa</span>
					</div> */}

					<h1 className="text-2xl md:text-5xl font-semibold leading-tight mt-6">
						<span className="text-gray-700">Rent </span>
						<span className="text-blue-700 font-bold">Your Ride, </span>
						<span className="text-blue-900 font-bold">Own the Road</span>
					</h1>
					<p className="text-gray-500 mt-2 mb-6 text-lg">
						Fast booking flexible options
					</p>
				</div>

			
			</div>
		</section>
	);
}
