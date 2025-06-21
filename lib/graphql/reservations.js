"use client";

import { gql } from "@apollo/client";

export const CREATE_RESERVATION = gql`
	mutation CreateReservation($data: ReservationInput!) {
		createReservation(data: $data) {
			dropoff_date
			dropoff_time
			pickup_date
			pickup_time
			location
			total_price
			customer {
				first_name
				last_name
			}
			car {
				brand
				name
			}
		}
	}
`;

