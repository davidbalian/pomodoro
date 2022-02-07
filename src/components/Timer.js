import React, { useEffect, useState } from "react";

const Timer = () => {
	// time for pomodoro
	const [pomoTimeInput, setPomoTimeInput] = useState(25);
	const [pomodoroTime, setPomodoroTime] = useState(pomoTimeInput * 60);

	// time for break
	const [breakTimeInput, setBreakTimeInput] = useState(5);
	const [breakTime, setBreakTime] = useState(breakTimeInput * 60);

	// state to start pomodoro and break
	const [startPomo, setStartPomo] = useState(false);
	const [startBreak, setStartBreak] = useState(false);

	// break or pomo
	const [breakOrPomo, setBreakOrPomo] = useState("pomo");

	useEffect(() => {
		if (startPomo && breakOrPomo === "pomo") {
			setTimeout(() => {
				setPomodoroTime(pomodoroTime - 1);
			}, 1000);

			if (pomodoroTime === 0) {
				setBreakOrPomo("break");
			}
		} else if (startBreak && breakOrPomo === "break") {
			setTimeout(() => {
				setBreakTime(breakTime - 1);
			}, 1000);

			if (breakTime === 0) {
				setBreakOrPomo("pomo");
			}
		}
	}, [pomodoroTime, startPomo, breakTime, startBreak, breakOrPomo]);

	return (
		<div>
			<h1>Pomodoro Timer</h1>

			{/* Actual timer */}
			<h2>
				{Math.floor(
					(breakOrPomo === "pomo" ? pomodoroTime : breakTime) / 60
				)}
				:
				{Math.floor(
					(breakOrPomo === "pomo" ? pomodoroTime : breakTime) % 60
				)}
			</h2>

			{/* Button to start and stop timer */}
			{breakOrPomo == "pomo" ? (
				<button
					class='start-timer'
					onClick={() => {
						setStartPomo(!startPomo);
					}}
				>
					{startPomo ? "STOP" : "START"}
				</button>
			) : (
				<button
					class='start-timer'
					onClick={() => {
						setStartBreak(!startBreak);
					}}
				>
					{startBreak ? "STOP" : "START"}
				</button>
			)}

			{/* Form to change pomo tine and break time */}
			<form
				onSubmit={(e) => {
					e.preventDefault();

					setPomodoroTime(pomoTimeInput * 60);
					setBreakTime(breakTime);
				}}
			>
				<label htmlFor='pomo'>Pomodoro Time: </label>
				<input
					type='number'
					value={pomoTimeInput}
					onChange={(e) => {
						setPomoTimeInput(e.target.value);
					}}
				/>
				<br />
				<label htmlFor='break'>Break Time: </label>
				<input
					type='number'
					value={breakTimeInput}
					onChange={(e) => {
						setBreakTimeInput(e.target.value);
					}}
				/>
				<br />
				<button type='submit'>Set Times</button>
			</form>
		</div>
	);
};

export default Timer;
