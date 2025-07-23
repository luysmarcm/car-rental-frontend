/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			// Patrón para imágenes de Strapi local (si aún lo usas para algo o desarrollo)
			{
				protocol: "http",
				hostname: "localhost",
				port: "1337",
				pathname: "/uploads/**/*",
			},
			// Patrón para imágenes de Cloudinary
			{
				protocol: "https", // Cloudinary siempre usa HTTPS
				hostname: "res.cloudinary.com", // Este es el hostname base de Cloudinary
				pathname: "/dnhptmamr/image/upload/**/*", // Incluye tu cloud_name y la ruta genérica de upload
			},
			// Si también sirves imágenes desde tu propio dominio en producción (ej. para íconos)
			// {
			//     protocol: "https",
			//     hostname: "tu-dominio-del-frontend.com",
			//     pathname: "/**/*",
			// }
		],
	},
};
export default nextConfig;
