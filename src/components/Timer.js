import React, { useEffect, useState } from "react";

const Timer = () => {
	const [start, setStart] = useState(false);
	const [timerAmount, setTimerAmount] = useState(25);
	const [time, setTime] = useState(timerAmount * 60);

	useEffect(() => {
		start && setTimeout(() => setTime(time - 1), 1000);
	}, [time, start]);

	return (
		<div>
			<p>
				Time left: {Math.floor(time / 60)} : {Math.floor(time % 60)}
			</p>
			<button
				onClick={() => {
					setStart(!start);
				}}
			>
				{start ? "Stop" : "Start"}
			</button>
			<form
				onSubmit={(e) => {
					e.preventDefault();
					setTime(timerAmount * 60);
				}}
			>
				<label htmlFor='time-amount'>Enter timer duration: </label>
				<input
					type='number'
					value={timerAmount}
					onChange={(e) => {
						setTimerAmount(e.target.value);
					}}
				/>
				<button type='submit'>Set Time</button>
			</form>
		</div>
	);
};

export default Timer;
