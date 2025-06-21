import { useEffect, useState } from 'react';

const CountdownTimer = ({ minutes = 2 }) => {
	const [secondsLeft, setSecondsLeft] = useState(minutes * 60);

	useEffect(() => {
		if (secondsLeft <= 0) return;

		const interval = setInterval(() => {
			setSecondsLeft((prev) => prev - 1);
		}, 1000);

		return () => clearInterval(interval);
	}, [secondsLeft]);

	const formatTime = (sec: number) => {
		const m = Math.floor(sec / 60);
		const s = sec % 60;
		return `${m}:${s < 10 ? '0' + s : s}`;
	};

	return {
		state: {
			time: secondsLeft > 0 ? formatTime(secondsLeft) : '',
		},
	};
};

export default CountdownTimer;
