import React from "react";

import {
	useGetCurrentUserFormsQuery,
	useGetCurrentUserQuery,
} from "@formation/data-access";
import FormInput from "../components/FormInput";
import { Link, Outlet, Route, Routes, useNavigate } from "react-router-dom";
import { fakeAuthProvider } from "./auth.provider";
import LandingPage from "../pages/LandingPage";
import LoginPage from "../pages/LoginPage";
import HomePage from "../pages/HomePage";
import { RequireAuth, useAuth, AuthProvider } from "./auth";

const App = () => {
	return (
		<Routes>
			<Route element={<Layout />}>
				<Route index element={<LandingPage />} />
				<Route path="/login" element={<LoginPage />} />
				<Route
					path="/home"
					element={
						<RequireAuth>
							<HomePage />
						</RequireAuth>
					}
				/>
			</Route>
		</Routes>
	);
};

function Layout() {
	return (
		<div>
			<AuthStatus />

			<ul>
				<li>
					<Link to="/">Public Page</Link>
				</li>
				<li>
					<Link to="/home">Home</Link>
				</li>
				<li>
					<Link to="/login">Login</Link>
				</li>
			</ul>

			<Outlet />
		</div>
	);
}

function AuthStatus() {
	const auth = useAuth();
	const navigate = useNavigate();

	if (!auth.user) {
		return <p>You are not logged in.</p>;
	}

	return (
		<p>
			Welcome {auth.user}!{" "}
			<button
				onClick={() => {
					auth.signout(() => navigate("/"));
				}}
			>
				Sign out
			</button>
		</p>
	);
}

export default App;
