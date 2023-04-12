import { Navigate, useLocation } from "react-router-dom";
import { authProvider } from "./auth.provider";
import React from "react";

interface AuthContextType {
	user: any;
	signin: (
		username: string,
		password: string,
		callback: VoidFunction
	) => void;
	signout: (callback: VoidFunction) => void;
}

const AuthContext = React.createContext<AuthContextType>(null!);

function AuthProvider({ children }: { children: React.ReactNode }) {
	const [user, setUser] = React.useState<any>(null);

	const signin = (
		username: string,
		password: string,
		callback: VoidFunction
	) => {
		return authProvider.signin(username, password, () => {
			setUser(username);
			callback();
		});
	};

	const signout = (callback: VoidFunction) => {
		return authProvider.signout(() => {
			setUser(null);
			callback();
		});
	};

	const value = { user, signin, signout };

	return (
		<AuthContext.Provider value={value}>{children}</AuthContext.Provider>
	);
}

function useAuth() {
	return React.useContext(AuthContext);
}

function RequireAuth({ children }: { children: JSX.Element }) {
	const auth = useAuth();
	const location = useLocation();

	if (!auth.user) {
		// Redirect them to the /login page, but save the current location they were
		// trying to go to when they were redirected. This allows us to send them
		// along to that page after they login, which is a nicer user experience
		// than dropping them off on the home page.
		return <Navigate to="/login" state={{ from: location }} replace />;
	}

	return children;
}

export { AuthProvider, useAuth, RequireAuth };
