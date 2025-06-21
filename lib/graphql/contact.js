"use client";

import { gql } from "@apollo/client";

export const CREATE_CONTACT_MUTATION = gql`
	mutation CreateContact($data: ContactInput!) {
		createContact(data: $data) {
			email
			message
			name
			documentId # Incluimos documentId en la respuesta si lo necesitas para algo
		}
	}
`;
