import Image from "next/image";
import Link from "next/link";
export default function Navbar() {

    const links = [
			{
				name: "Home",
				href: "https://www.linkedin.com/in/luysmarcm",
				current: false,
			},
			{
				name: "Reserve",
				href: "https://github.com/luysmarcm",
				current: false,
			},
			{
				name: "About",
				href: "https://behance.net/luysmarcm",
				current: false,
			},
			{
				name: "Vehicles",
				href: "https://behance.net/luysmarcm",
				current: false,
			},
		];    

    return (
			<nav className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4">
				<div className="flex items-center w-full max-w-7xl px-6 py-2 rounded-full shadow-lg bg-primary">
					<div className="flex w-32 lg:w-1/2 md:justify-start  font-extrabold	">
						<Link href="/" passHref>
							<div style={{ width: "60px" }}>
								<Image
									src="/image/via.svg"
									alt="Logo"
									width="484"
									height="326"
								/>
							</div>
						</Link>
					</div>

					<div className="ml-auto flex items-center space-x-6 text-secondary">
						<div className="mr-3 flex items-center space-x-4">
							{links.map((link) => (
								<Link
									key={link.name}
									href={link.href}
									className="px-3 py-2 rounded-md text-sm lg:text-base uppercase font-extrabold text-secondary"
								>
									<span className="hidden lg:inline">{link.name}</span>
								</Link>
							))}
						</div>
						<button className="rounded-full font-light text-white bg-secondary  px-4 py-1 hover:bg-morado text-sm">
							Contact
						</button>
					</div>
				</div>
			</nav>
		);
}
