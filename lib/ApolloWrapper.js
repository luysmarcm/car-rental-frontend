"use client";

import { ApolloProvider } from "@apollo/client";
import client from "./apolloClient";

export default function ApolloWrapper({ children }) {
	return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
