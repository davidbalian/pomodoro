import React, { useEffect, useState } from "react";
import "./Timer.css";

const Timer = () => {
	const [start, setStart] = useState(0);
	const [timeInput, setTimeInput] = useState(25);
	const [time, setTime] = useState(timeInput * 60);

	const [startRest, setStartRest] = useState(0);
	const [restInput, setRestInput] = useState(5);
	const [rest, setRest] = useState(restInput * 60);

	const [bop, setBop] = useState(1);

	useEffect(() => {
		if (start && time > 0) {
			setTimeout(() => {
				setTime(time - 1);
				console.log(time);
			}, 1000);

			if (time < 2) {
				setBop(0);
				setRest(restInput * 60);
				setStart(!start);
			}
		}
		if (startRest && rest > 0) {
			setTimeout(() => {
				setRest(rest - 1);
				console.log(rest);
			}, 1000);

			if (rest < 2) {
				setBop(1);
				setTime(timeInput * 60);
				setStartRest(!startRest);
			}
		}
	}, [time, start, startRest, rest, bop, restInput, timeInput]);

	return (
		<div className='timer-component'>
			<div className='timer-and-button'>
				{bop ? (
					<h2>
						{Math.floor(time / 60)} : {Math.floor(time % 60)}
					</h2>
				) : (
					<h2>
						{Math.floor(rest / 60)} : {Math.floor(rest % 60)}
					</h2>
				)}

				{bop ? (
					<button onClick={() => setStart(!start)}>
						{start ? "STOP" : "START"}
					</button>
				) : (
					<button onClick={() => setStartRest(!startRest)}>
						{startRest ? "STOP" : "START"}
					</button>
				)}
			</div>

			{/*bop ? <p>Pomodoro</p> : <p>Break</p>*/}

			<form
				className='timer-inputs'
				onSubmit={(e) => {
					e.preventDefault();
					setTime(timeInput * 60);
					setRest(restInput * 60);
				}}
			>
				<div className='input'>
					<label htmlFor='time'>Time: </label>
					<input
						type='number'
						name='time'
						value={timeInput}
						onChange={(e) => setTimeInput(e.target.value)}
					/>
				</div>
				<div className='input'>
					<label htmlFor='rest'>Break: </label>
					<input
						type='number'
						value={restInput}
						onChange={(e) => setRestInput(e.target.value)}
					/>
				</div>

				<button type='submit'>Set Time</button>
			</form>
		</div>
	);
};

export default Timer;
