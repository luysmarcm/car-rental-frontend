import { Montserrat } from "next/font/google";
import "./globals.css";
import ApolloWrapper from "@/lib/ApolloWrapper";
import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const montserrat = Montserrat({
	subsets: ["latin"],
	display: "swap",
	variable: "--font-montserrat",
	weight: ["400", "700", "800"],
});
export const metadata = {
	title: "Via Car Rental",
	description:
		"Looking for car rentals in Tampa, FL? Find great rates and a wide selection of vehicles for your Florida trip or local needs. Easy online booking available now!",
	icons: {
		icon: "/favicon.ico",
	},
};

export default function RootLayout({ children }) {
	return (
		<html lang="en" className={montserrat.className}>
			<body>
				<Header />
				<ApolloWrapper>{children}</ApolloWrapper>
				<ToastContainer
					position="bottom-center"
					autoClose={5000}
					hideProgressBar={false}
					newestOnTop={false}
					closeOnClick={false}
					rtl={false}
					pauseOnFocusLoss
					draggable
					pauseOnHover
					theme="light"
					// transition={Bounce}
				/>
				<Footer />
			</body>
		</html>
	);
}
