import React, { useEffect, useState } from "react";
import "./Timer.css";
import { Button, TextField } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@emotion/react";

const Timer = () => {
	const [bg, setBg] = useState({ backgroundColor: "#92140c" });

	const [start, setStart] = useState(0);
	const [timeInput, setTimeInput] = useState(25);
	const [time, setTime] = useState(timeInput * 60);

	const [startRest, setStartRest] = useState(0);
	const [restInput, setRestInput] = useState(5);
	const [rest, setRest] = useState(restInput * 60);

	const [bop, setBop] = useState(1);

	const [showForm, setShowForm] = useState(0);

	const theme = createTheme({
		status: {
			danger: "#e53e3e"
		},
		palette: {
			primary: {
				main: "#1e1e24",
				darker: "#141418"
			},
			neutral: {
				main: "#64748B",
				contrastText: "#fff"
			}
		}
	});

	useEffect(() => {
		if (start && time > -1) {
			setTimeout(() => {
				setTime(time - 1);
			}, 1000);

			if (time < 1) {
				setBop(0);
				setBg({ backgroundColor: "#2274a5" });
				setRest(restInput * 60);
				setStart(!start);
			}
		}
		if (startRest && rest > -1) {
			setTimeout(() => {
				setRest(rest - 1);
			}, 1000);

			if (rest < 1) {
				setBop(1);
				setBg({ backgroundColor: "#92140c" });
				setTime(timeInput * 60);
				setStartRest(!startRest);
			}
		}
	}, [time, start, startRest, rest, bop, restInput, timeInput]);

	return (
		<div className='timer-component'>
			<ThemeProvider theme={theme}>
				<div className='timer' style={bg}>
					{bop ? (
						<h2 className='timer-h2'>
							{Math.floor(time / 60) >= 10
								? Math.floor(time / 60)
								: `0${Math.floor(time / 60)}`}{" "}
							:{" "}
							{Math.floor(time % 60) === 0
								? `${Math.floor(time % 60)}0`
								: Math.floor(time % 60) < 10
								? `0${Math.floor(time % 60)}`
								: Math.floor(time % 60)}
						</h2>
					) : (
						<h2 className='timer-h2'>
							{Math.floor(rest / 60) >= 10
								? Math.floor(rest / 60)
								: `0${Math.floor(rest / 60)}`}{" "}
							:{" "}
							{Math.floor(rest % 60) === 0
								? `${Math.floor(rest % 60)}0`
								: Math.floor(rest % 60) < 10
								? `0${Math.floor(rest % 60)}`
								: Math.floor(rest % 60)}
						</h2>
					)}
				</div>
				{bop ? (
					<Button
						size='large'
						variant='contained'
						className='timer-button'
						onClick={() => setStart(!start)}
					>
						{start ? "STOP" : "START"}
					</Button>
				) : (
					<Button
						size='large'
						variant='contained'
						className='timer-button'
						onClick={() => setStartRest(!startRest)}
					>
						{startRest ? "STOP" : "START"}
					</Button>
				)}

				{/*bop ? <p>Pomodoro</p> : <p>Break</p>*/}

				{showForm ? (
					<form
						className='timer-inputs'
						onSubmit={(e) => {
							e.preventDefault();
							setTime(timeInput * 60);
							setRest(restInput * 60);
							setShowForm(0);
							setStart(0);
							setStartRest(0);
						}}
					>
						<div className='input'>
							<TextField
								className='input'
								label='Time: '
								variant='outlined'
								type='number'
								name='time'
								value={timeInput}
								onChange={(e) => setTimeInput(e.target.value)}
							/>
						</div>
						<div className='input'>
							<TextField
								className='input'
								label='Break: '
								variant='outlined'
								type='number'
								value={restInput}
								onChange={(e) => setRestInput(e.target.value)}
							/>
						</div>

						<Button size='large' variant='contained' type='submit'>
							Set Time
						</Button>
					</form>
				) : (
					<Button
						size='large'
						variant='contained'
						onClick={() => {
							setShowForm(1);
						}}
					>
						Time Menu
					</Button>
				)}
			</ThemeProvider>
		</div>
	);
};

export default Timer;
