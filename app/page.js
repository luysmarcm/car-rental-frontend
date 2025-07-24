
import BannerSection from "@/components/BannerSection";
import CarDisplaySection from "@/components/CarDisplaySection";
import CarouselBrand from "@/components/CarouselBrand";
import ContactSection from "@/components/ContactSection";
import HeroSection from "@/components/HeroSection";
import Testimonials from "@/components/Testimonials";
import WhyChooseUs from "@/components/WhyChooseUs";

export default function Home() {
  return (
		<div>
			<HeroSection />
			<CarDisplaySection />
			<CarouselBrand />
			<WhyChooseUs/>
			<BannerSection />
			<Testimonials/>
			<ContactSection />
		</div>
	);
}
