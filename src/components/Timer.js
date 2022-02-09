import React, { useEffect, useState } from "react";
import "./Timer.css";

const Timer = () => {
	const [bg, setBg] = useState({ backgroundColor: "#ff5a5f" });

	const [start, setStart] = useState(0);
	const [timeInput, setTimeInput] = useState(25);
	const [time, setTime] = useState(timeInput * 60);

	const [startRest, setStartRest] = useState(0);
	const [restInput, setRestInput] = useState(5);
	const [rest, setRest] = useState(restInput * 60);

	const [bop, setBop] = useState(1);

	useEffect(() => {
		if (start && time > -1) {
			setTimeout(() => {
				setTime(time - 1);
			}, 1000);

			if (time < 1) {
				setBop(0);
				setBg({ backgroundColor: "#087e8b" });
				setRest(restInput * 60);
				setStart(!start);
			}

			if (time === 3) {
				setBg({ backgroundColor: "#ff2b32" });
				setTimeout(() => {
					setBg({ backgroundColor: "#ff5a5f" });
				}, 500);
			}

			if (time === 2) {
				setBg({ backgroundColor: "#ff2b32" });
				setTimeout(() => {
					setBg({ backgroundColor: "#ff5a5f" });
				}, 500);
			}

			if (time === 1) {
				setBg({ backgroundColor: "#ff2b32" });
				setTimeout(() => {
					setBg({ backgroundColor: "#ff5a5f" });
				}, 500);
			}
		}
		if (startRest && rest > -1) {
			setTimeout(() => {
				setRest(rest - 1);
			}, 1000);

			if (rest < 1) {
				setBop(1);
				setBg({ backgroundColor: "#ff5a5f" });
				setTime(timeInput * 60);
				setStartRest(!startRest);
			}
		}
	}, [time, start, startRest, rest, bop, restInput, timeInput]);

	return (
		<div className='timer-component' style={bg}>
			<div className='timer'>
				{bop ? (
					<h2 className='timer-h2'>
						{Math.floor(time / 60)} : {Math.floor(time % 60)}
					</h2>
				) : (
					<h2 className='timer-h2'>
						{Math.floor(rest / 60)} : {Math.floor(rest % 60)}
					</h2>
				)}
			</div>
			{bop ? (
				<button
					className='timer-button'
					onClick={() => setStart(!start)}
				>
					{start ? "STOP" : "START"}
				</button>
			) : (
				<button
					className='timer-button'
					onClick={() => setStartRest(!startRest)}
				>
					{startRest ? "STOP" : "START"}
				</button>
			)}

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
					<br />
					<input
						step='0.01'
						type='number'
						name='time'
						className='input-1'
						value={timeInput}
						onChange={(e) => setTimeInput(e.target.value)}
					/>
				</div>
				<div className='input'>
					<label htmlFor='rest'>Break: </label>
					<br />
					<input
						step='0.01'
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
