import React from "react";

import { Route, Routes, useNavigate, BrowserRouter } from "react-router-dom";
import LandingPage from "../pages/LandingPage";
import LoginPage from "../pages/LoginPage";
import HomePage from "../pages/HomePage";
import { RequireAuth, useAuth, AuthProvider } from "./auth";
import { Navbar } from "../components/Navbar";

const App = () => {
	return (
		<BrowserRouter>
			<Navbar />
			<Routes>
				<Route path="/" element={<LandingPage />} />
				<Route path="/login" element={<LoginPage />} />
				<Route
					path="/home"
					element={
						<RequireAuth>
							<HomePage />
						</RequireAuth>
					}
				/>
			</Routes>
		</BrowserRouter>
	);
};

export default App;
