import "./index.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, redirect, RouterProvider } from "react-router-dom";

import { CpuScheduling, DiskScheduling, ErrorPage, Login } from "@barrel";
import { checkAuthStatus, logoutUser } from "@utils/auth.ts";

import { App } from "./App.tsx";

const protectPath = async () => {
	if (!(await checkAuthStatus())) {
		return redirect("/login");
	}
	return null;
};

const needsAuth = async () => {
	if (await checkAuthStatus()) {
		return redirect("/cpu");
	}
	return null;
};

const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		errorElement: <ErrorPage />,
		children: [
			{
				index: true,
				loader: () => redirect("/login"),
			},
			{
				path: "login",
				loader: needsAuth,
				element: <Login />,
			},
			{
				path: "logout",
				loader: async () => {
					await logoutUser();
					return redirect("/login");
				},
			},
			// {
			// 	path: "signup",
			// 	loader: needsAuth,
			// 	element: <Signup />,
			// },
			{
				path: "cpu",
				loader: protectPath,
				element: <CpuScheduling />,
			},
			{
				path: "disk",
				loader: protectPath,
				element: <DiskScheduling />,
			},
		],
	},
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
);

