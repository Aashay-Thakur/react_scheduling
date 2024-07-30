import { AddCircleOutlineRounded, RemoveCircleOutlineRounded } from "@mui/icons-material";
import {
	Box,
	IconButton,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	TextField,
} from "@mui/material";
import { removeLeadingZeros } from "@utils/helper";

type HandleOnChangePropsFunction = (id: number, key: "arrivalTime" | "burstTime" | "priority", value: string) => void;
interface InputTableProps {
	processes: Process[];
	setProcesses: React.Dispatch<React.SetStateAction<Process[]>>;
	editNumberOfRows: (target: number) => void;
	showPriority: boolean;
}

const InputTable = ({ editNumberOfRows, processes, setProcesses, showPriority }: InputTableProps) => {
	const handleOnChange: HandleOnChangePropsFunction = (id, key, value) => {
		const newValue: number = parseInt(value) || 0;
		const lowerBound = newValue >= 0;
		const upperBound = newValue <= (key === "priority" ? 10 : 999);
		const isNumber = !isNaN(newValue);
		const isInteger = Number.isInteger(newValue);
		const isValid = lowerBound && upperBound && isNumber && isInteger;

		if (!isValid) {
			return;
		}

		const newProcesses = processes.map((process) => {
			if (process.id === id) {
				return {
					...process,
					[key]: newValue,
				};
			}
			return process;
		});
		setProcesses(newProcesses);
	};

	return (
		<TableContainer sx={{ width: { xs: "100%", md: "max-content" } }} component={Paper}>
			<Table aria-label="simple table">
				<TableHead>
					<TableRow>
						<TableCell>Process</TableCell>
						<TableCell>Arrival</TableCell>
						<TableCell>Burst</TableCell>
						{showPriority && <TableCell>Priority</TableCell>}
					</TableRow>
				</TableHead>
				<TableBody>
					{processes.map((process) => (
						<TableRow key={process.id}>
							<TableCell component="th" scope="row">
								{process.name}
							</TableCell>
							<TableCell>
								<TextField
									inputMode="numeric"
									inputProps={{ min: 0, max: 999, maxLength: 3 }}
									variant="standard"
									onChange={(e) => handleOnChange(process.id, "arrivalTime", e.target.value)}
									value={removeLeadingZeros(process.arrivalTime)}
									type="number"
								/>
							</TableCell>
							<TableCell>
								<TextField
									inputMode="numeric"
									inputProps={{ min: 0, max: 999, maxLength: 3 }}
									variant="standard"
									onChange={(e) => handleOnChange(process.id, "burstTime", e.target.value)}
									value={process.burstTime}
									type="number"
								/>
							</TableCell>
							{showPriority && (
								<TableCell>
									<TextField
										inputMode="numeric"
										inputProps={{ min: 0, max: 10, maxLength: 2 }}
										variant="standard"
										onChange={(e) => handleOnChange(process.id, "priority", e.target.value)}
										value={process.priority}
										type="number"
									/>
								</TableCell>
							)}
						</TableRow>
					))}
				</TableBody>
			</Table>
			<Box
				sx={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					flexDirection: "column",
					padding: 2,
					position: "relative",
					cursor: "pointer",
					"&::before": {
						content: '""',
						width: "90%",
						height: "1px",
						backgroundColor: "divider",
						position: "absolute",
						top: "50%",
						transition: "background-color 0.3s",
					},
					"& svg": {
						color: "text.disabled",
						transition: "color 0.3s ease-out, transform 0.3s ease-out",
					},
					"&:hover": {
						"&::before": {
							backgroundColor: "primary.main",
						},
						"& svg": {
							color: "primary.main",
							transform: "scale(1.1)",
						},
					},
				}}>
				{processes.length < 10 && (
					<IconButton onClick={() => editNumberOfRows(processes.length + 1)}>
						<AddCircleOutlineRounded />
					</IconButton>
				)}
				{processes.length > 1 && (
					<IconButton onClick={() => editNumberOfRows(processes.length - 1)}>
						<RemoveCircleOutlineRounded />
					</IconButton>
				)}
			</Box>
		</TableContainer>
	);
};

export { InputTable };
