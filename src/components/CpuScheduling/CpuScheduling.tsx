import { useEffect, useState } from "react";

import { Box, Button, Divider, Stack, TextField, Typography } from "@mui/material";

import data from "./default.json";
import { InputTable } from "./InputTable";
import { Options } from "./Options";

const CpuScheduling = () => {
	const defaultData = data as Process[];

	const [processes, setProcesses] = useState<Process[]>([]);
	const [input, setInput] = useState<string>("0");

	const [activeAlgorithm, setActiveAlgorithm] = useState<Algorithm>("FCFS" as unknown as Algorithm);
	const [canBePreemptive, setCanBePreemptive] = useState<boolean>(false);
	const [isPreemptionActive, setIsPreemptionActive] = useState<boolean>(false);
	const [quantum, setQuantum] = useState<number>(2);

	const editNumberOfRows = (target: number) => {
		if (target < 1 || target > 10) {
			return;
		}

		let newProcesses = [...processes];

		if (target < processes.length) {
			newProcesses = newProcesses.slice(0, target);
		} else if (target > processes.length) {
			for (let i = processes.length; i < target; i++) {
				if (i < defaultData.length) {
					newProcesses.push(defaultData[i]);
				} else {
					newProcesses.push({
						id: i + 1,
						name: `P${i + 1}`,
						arrivalTime: 0,
						burstTime: 0,
						priority: 0,
					});
				}
			}
		}

		setProcesses(newProcesses);
	};

	const handleNOPInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setInput(e.target.value);

		const value = parseInt(e.target.value);
		if (value > 0 && value <= 10) {
			editNumberOfRows(value);
		}
	};

	useEffect(() => {
		// initial processes
		setProcesses(defaultData.slice(0, 5));
	}, [defaultData]);

	useEffect(() => {
		setInput(processes.length.toString());
	}, [processes]);

	useEffect(() => {
		setCanBePreemptive((["Priority", "SJF", "Round Robin"] as unknown as Algorithm[]).includes(activeAlgorithm));
	}, [activeAlgorithm]);

	return (
		<Stack
			spacing={2}
			useFlexGap
			sx={{
				width: "min-content",
			}}>
			<Typography variant="h3">CPU Scheduling</Typography>
			<Divider />
			<Box>
				<TextField
					inputMode="numeric"
					inputProps={{ min: 0, max: 10, maxLength: 2 }}
					onBlur={() => setInput(processes.length.toString())}
					onChange={handleNOPInputChange}
					variant="standard"
					label="Number of Processes"
					value={input}
					type="number"
					fullWidth
				/>
			</Box>
			<Options
				active={activeAlgorithm}
				setActive={setActiveAlgorithm}
				canBePreemptive={canBePreemptive}
				isPreemptionActive={isPreemptionActive}
				setIsPreemptionActive={setIsPreemptionActive}
				quantum={quantum}
				setQuantum={setQuantum}
			/>
			<InputTable
				processes={processes}
				editNumberOfRows={editNumberOfRows}
				setProcesses={setProcesses}
				showPriority={activeAlgorithm === ("Priority" as unknown as Algorithm)}
			/>
			<Stack
				direction="row"
				sx={{
					justifyContent: "space-evenly",
				}}>
				<Button variant="contained">Randomize</Button>
				<Button>Log To History</Button>
			</Stack>
		</Stack>
	);
};

export { CpuScheduling };
