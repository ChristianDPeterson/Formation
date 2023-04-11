const getLocalRefreshToken = () => {
	const refresh_token = JSON.parse(localStorage.getItem("refresh_token"));
	return refresh_token;
};

const getLocalAccessToken = () => {
	const token = JSON.parse(localStorage.getItem("token"));
	return token;
};

const updateLocalAccessToken = (token) => {
	localStorage.setItem("token", token);
};

const updateLocalRefreshToken = (token) => {
	localStorage.setItem("refresh_token", token);
};

const getUser = () => {
	return JSON.parse(localStorage.getItem("user"));
};

const setUser = (user) => {
	localStorage.setItem("user", JSON.stringify(user));
};

const removeUser = () => {
	localStorage.removeItem("user");
};

const TokenService = {
	getLocalRefreshToken,
	getLocalAccessToken,
	updateLocalAccessToken,
	updateLocalRefreshToken,
	getUser,
	setUser,
	removeUser,
};

export default TokenService;
