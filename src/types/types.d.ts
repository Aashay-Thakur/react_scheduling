interface Process {
	id: number;
	name: `P${number}`;
	arrivalTime: number;
	burstTime: number;
	priority: number;
}

type Algorithm = "FCFS" | "SJF" | "Priority" | "Round Robin";
