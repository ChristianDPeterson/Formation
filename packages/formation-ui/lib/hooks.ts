import { useEffect } from "react";
import Router from "next/router";
import useSWR from "swr";

// const fetcher = (url) =>
// 	fetch(url)
// 		.then((r) => r.json())
// 		.then((data) => {
// 			return { user: data?.user || null };
// 		});

const fetcher = (url) => {
	return fetch(url, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
		credentials: "include",
	}).then((r) => r.json());
};

export default function useUser() {
	const { data, mutate, error } = useSWR(
		"http://localhost:3000/api/login",
		fetcher
	);

	const loading = !data && !error;
	const loggedOut = error && error.status === 403;

	return {
		loading,
		loggedOut,
		user: data,
		mutate,
	};
}
