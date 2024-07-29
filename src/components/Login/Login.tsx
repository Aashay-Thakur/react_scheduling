import { useState } from "react";

import { CustomLink } from "@barrel";
import { Google } from "@mui/icons-material";
import { Button, Divider, Paper, Stack, TextField, Typography } from "@mui/material";

const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	return (
		<Paper
			elevation={6}
			sx={{
				display: "flex",
				padding: 5,
				width: 450,
				margin: "auto",
				marginTop: 5,
			}}>
			<Stack
				spacing={2}
				sx={{
					flexGrow: 1,
				}}>
				<Typography
					sx={{
						borderBottom: 2,
						borderColor: "divider",
					}}
					variant="h4"
					gutterBottom>
					Login
				</Typography>
				<TextField value={email} onChange={(e) => setEmail(e.target.value)} variant="standard" label="Email" />
				<TextField
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					type="password"
					variant="standard"
					label="Password"
				/>
				<Stack direction="row" justifyContent="space-between" spacing={1}>
					<CustomLink to="/signup" variant="body2">
						Sign Up
					</CustomLink>
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
					<Button variant="outlined">
						<Google />
						<Typography sx={{ ml: 1 }} variant="caption">
							With Google
						</Typography>
					</Button>
					<Divider orientation="vertical" flexItem />
					<Button
						variant="contained"
						sx={{
							width: "50%",
							alignSelf: "flex-end",
						}}>
						Login
					</Button>
				</Stack>
			</Stack>
		</Paper>
	);
};

export { Login };
