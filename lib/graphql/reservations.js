"use client";

import { gql } from "@apollo/client";

export const CREATE_RESERVATION = gql`
	mutation CreateNewReservation($data: ReservationInput!) {
		createReservation(data: $data) {
			dropoff_date
			dropoff_time
			pickup_date
			pickup_time
			location
			total_price
			documentId
			customer {
				first_name
				last_name
			}
			type {
				documentId
				name
				price
			}
		}
	}
`;

