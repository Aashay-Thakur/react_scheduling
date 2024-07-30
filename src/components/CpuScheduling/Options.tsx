import { Dispatch, useState } from "react";

import {
	Checkbox,
	FormControl,
	FormControlLabel,
	FormGroup,
	InputLabel,
	MenuItem,
	Select,
	Stack,
	TextField,
} from "@mui/material";

interface OptionsProps {
	active: Algorithm;
	setActive: Dispatch<Algorithm>;
	canBePreemptive: boolean;
	isPreemptionActive: boolean;
	setIsPreemptionActive: Dispatch<boolean>;
	quantum: number;
	setQuantum: Dispatch<number>;
}

const Options = ({
	active,
	setActive,
	canBePreemptive,
	isPreemptionActive,
	setIsPreemptionActive,
	quantum,
	setQuantum,
}: OptionsProps) => {
	const [input, setInput] = useState<string>("2");

	function handleQuantumChange(e: React.ChangeEvent<HTMLInputElement>) {
		setInput(e.target.value);
		const newValue = parseInt(e.target.value);
		if (newValue > 0 && newValue <= 100) {
			setQuantum(newValue);
		}
	}

	return (
		<Stack spacing={2}>
			<FormControl fullWidth>
				<InputLabel id="algorithm-label">Algorithm</InputLabel>
				<Select
					labelId="algorithm-label"
					id="algorithm-select"
					value={active}
					label="Algorithm"
					onChange={(event) => setActive(event.target.value as Algorithm)}>
					<MenuItem value={"FCFS"}>First Come First Serve</MenuItem>
					<MenuItem value={"SJF"}>Shortest Job First</MenuItem>
					<MenuItem value={"Priority"}>Priority</MenuItem>
					<MenuItem value={"Round Robin"}>Round Robin</MenuItem>
				</Select>
			</FormControl>
			{canBePreemptive && (
				<FormGroup>
					<FormControlLabel
						control={
							<Checkbox
								checked={isPreemptionActive}
								onChange={(e) => setIsPreemptionActive(e.target.checked)}
							/>
						}
						label="Pre-Emption"
					/>
				</FormGroup>
			)}
			{isPreemptionActive && canBePreemptive && (
				<TextField
					inputMode="numeric"
					inputProps={{ min: 1, max: 100, maxLength: 3 }}
					variant="standard"
					onBlur={() => setInput(quantum.toString())}
					onChange={handleQuantumChange}
					value={input}
					type="number"
					id="quantum"
					label="Quantum"
				/>
			)}
		</Stack>
	);
};

export { Options };
