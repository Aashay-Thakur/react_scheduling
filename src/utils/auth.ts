import { onAuthStateChanged, signOut } from "firebase/auth";

import { auth } from "@config/firebase.config";

const checkAuthStatus = () => {
	return new Promise((resolve) => {
		const unsubscribe = onAuthStateChanged(
			auth,
			(user) => {
				unsubscribe();
				resolve(!!user);
			},
			() => {
				unsubscribe();
				resolve(false);
			}
		);
	});
};

const logoutUser = async () => {
	return await signOut(auth);
};

export { checkAuthStatus, logoutUser };
