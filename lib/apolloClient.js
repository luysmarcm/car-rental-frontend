// lib/apolloClient.js
"use client";

import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

const client = new ApolloClient({
	link: new HttpLink({
		uri: "http://localhost:1337/graphql", // Cambia por tu URL de Strapi
		headers: {
			// Authorization: `Bearer ${token}`, // si usas auth
		},
	}),
	cache: new InMemoryCache(),
});

export default client;
