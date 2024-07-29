import { FirebaseError } from "firebase/app";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { CustomLink } from "@barrel";
import { auth } from "@config/firebase.config";
import { Google } from "@mui/icons-material";
import { Button, Divider, Paper, Stack, TextField, Typography } from "@mui/material";

const errorMessages: Record<string, string> = {
	"auth/invalid-email": "Invalid email.",
	"auth/invalid-credential": "Invalid credentials.",
};

const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");

	const navigate = useNavigate();

	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault();

		if (!email || !password) {
			setError("Please fill in all fields");
			return;
		}

		try {
			await signInWithEmailAndPassword(auth, email, password);
			setError("");
			navigate("/cpu");
		} catch (e: unknown) {
			if (e instanceof FirebaseError) {
				console.error(e.code);
				setError(errorMessages[e.code] || "An error occurred");
			} else {
				console.error(e);
				setError("An error occurred");
			}
		}
	};

	return (
		<form onSubmit={handleSubmit}>
			<Paper
				elevation={6}
				sx={{
					display: "flex",
					padding: 5,
					width: 450,
					margin: "auto",
					marginTop: 5,
				}}>
				<Stack spacing={2} sx={{ flexGrow: 1 }}>
					<Typography sx={{ borderBottom: 2, borderColor: "divider" }} variant="h4" gutterBottom>
						Login
					</Typography>
					{error && (
						<Typography variant="body2" color="error">
							{error}
						</Typography>
					)}
					<TextField
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						type="email"
						variant="standard"
						label="Email"
						fullWidth
					/>
					<TextField
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						type="password"
						variant="standard"
						label="Password"
						fullWidth
					/>
					<Stack direction="row" justifyContent="space-between" spacing={1}>
						<CustomLink to="/forgot-password" variant="body2">
							Forgot password?
						</CustomLink>
					</Stack>
					<Stack
						sx={{
							pt: 2,
							justifyContent: "space-between",
							alignItems: "center",
						}}
						direction="row"
						spacing={1}
						useFlexGap>
						<Button variant="outlined" startIcon={<Google />}>
							<Typography sx={{ ml: 1 }} variant="caption">
								With Google
							</Typography>
						</Button>
						<Divider orientation="vertical" flexItem />
						<Button type="submit" variant="contained" sx={{ width: "50%", alignSelf: "flex-end" }}>
							Login
						</Button>
					</Stack>
				</Stack>
			</Paper>
		</form>
	);
};

export { Login };
