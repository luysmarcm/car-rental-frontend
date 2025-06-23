"use client"
import { gql } from "@apollo/client";

export const GET_CARS = gql`
	query GetCars($filters: CarFiltersInput) {
		# Añadimos el argumento $filters
		cars(filters: $filters) {
			air_conditioning
			available
			bags
			brand
			documentId
			name
			passengers
			price_per_day
			type
			gear_shift
			image {
				url
			}
		}
	}
`;

export const GET_CAR_TYPES = gql`
	query Types {
		types {
			# Asegúrate de que el nombre de tu colección en Strapi sea 'types' o ajusta aquí
			documentId
			name
			price
		}
	}
`;