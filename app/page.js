
import BannerSection from "@/components/BannerSection";
import CarDisplaySection from "@/components/CarDisplaySection";
import CarouselBrand from "@/components/CarouselBrand";
import CarsPage from "@/components/Cars";
import ContactForm from "@/components/ContactForm";
import ContactSection from "@/components/ContactSection";
import GetQuote from "@/components/GetQuote";
import Hero from "@/components/Layout/Hero";

import ReservationForm from "@/components/ReservationForm";
import Testimonials from "@/components/Testimonials";
import WhyChooseUs from "@/components/WhyChooseUs";
import Image from "next/image";

export default function Home() {
  return (
		<div>
			{/* <CarsPage/> */}
			{/* <ReservationForm /> */}

			<Hero />

			<CarDisplaySection />
			<CarouselBrand />
			<WhyChooseUs/>
			<BannerSection />
			<Testimonials/>
			<ContactSection />
			{/* <ContactForm /> */}
		</div>
	);
}
