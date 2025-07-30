"use client";
import { gql } from "@apollo/client";
export const GET_LOCATIONS = gql`
	query Locations {
		locations {
			name
			documentId
		}
	}
`;
