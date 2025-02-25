import { IconInterface } from './interface'

export const CommIcon = ({ width, height, fill }: IconInterface) => {
	return (
		<svg
			width={width}
			height={height}
			viewBox='0 0 44 45'
			fill={fill}
			xmlns='http://www.w3.org/2000/svg'
		>
			<path
				d='M38.5 20.625H29.3333C26.301 20.625 23.8333 23.1488 23.8333 26.25V39.375C23.8333 42.4762 26.301 45 29.3333 45H38.5C41.5323 45 44 42.4762 44 39.375V26.25C44 23.1488 41.5323 20.625 38.5 20.625ZM36.6667 37.5H31.1667C30.1528 37.5 29.3333 36.66 29.3333 35.625C29.3333 34.59 30.1528 33.75 31.1667 33.75H36.6667C37.6805 33.75 38.5 34.59 38.5 35.625C38.5 36.66 37.6805 37.5 36.6667 37.5ZM36.6667 29.9944H31.1667C30.1528 29.9944 29.3333 29.1544 29.3333 28.1194C29.3333 27.0844 30.1528 26.2444 31.1667 26.2444H36.6667C37.6805 26.2444 38.5 27.0844 38.5 28.1194C38.5 29.1544 37.6805 29.9944 36.6667 29.9944ZM5.5 11.25C5.5 5.04562 10.4335 0 16.5 0C22.5665 0 27.5 5.04562 27.5 11.25C27.5 17.4544 22.5665 22.5 16.5 22.5C10.4335 22.5 5.5 17.4544 5.5 11.25ZM22.0477 45H1.83334C0.81217 45 -0.00183024 44.1375 3.09075e-06 43.0931C0.0165031 33.8025 7.41217 26.25 16.5 26.25C17.7613 26.25 18.986 26.4094 20.1667 26.685V39.375C20.1667 41.4938 20.8835 43.4287 22.0477 45Z'
				fill={fill}
			/>
		</svg>
	)
}
