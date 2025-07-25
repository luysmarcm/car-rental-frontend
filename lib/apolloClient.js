// lib/apolloClient.js
"use client";

import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

const client = new ApolloClient({
	link: new HttpLink({
		uri: "https://backend-strapi-3zh0.onrender.com/graphql", // Cambia por tu URL de Strapi
		headers: {
			// Authorization: `Bearer ${token}`, // si usas auth
		},
	}),
	cache: new InMemoryCache(),
});

export default client;
