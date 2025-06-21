"use client";

import { gql, useQuery } from "@apollo/client";
import { GET_CARS } from "@/lib/graphql/cars";

// const GET_CARS = gql`
// 	query GetCars {
// 		cars {
// 			available
// 			brand
// 			description
// 			plate
// 			name
// 			price_per_day
// 			slug
// 			type
// 		}
// 	}
// `;

export default function CarsPage() {
	const { data, loading, error } = useQuery(GET_CARS);

	if (loading) return <p>Cargando...</p>;
	if (error) return <p>Error: {error.message}</p>;

	console.log(data)

	return (
		<div className="p-6">
			<h1 className="text-2xl font-bold mb-4">Lista de Autos</h1>
			<ul className="space-y-4">
				{data.cars.map((car, index) => (
					<li key={index} className="border p-4 rounded">
						<h2 className="text-lg font-semibold">{car.name}</h2>
						<p>Marca: {car.brand}</p>
						<p>Tipo: {car.type}</p>
						<p>Precio por día: ${car.price_per_day}</p>
						<p>Placa: {car.plate}</p>
						<p>Disponible: {car.available ? "Sí" : "No"}</p>
						<p>Slug: {car.slug}</p>
					</li>
				))}
			</ul>
		</div>
	);
}
