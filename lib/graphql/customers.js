"use client";

import { gql } from "@apollo/client";

export const CREATE_CUSTOMER = gql`
	mutation CreateCustomer($data: CustomerInput!) {
		createCustomer(data: $data) {
			documentId
			first_name
			last_name
			email
			phone
			driver_age
		}
	}
`;