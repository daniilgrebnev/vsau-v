import { IconInterface } from './interface'

export const ArrowIcon = ({
	fill = 'white',
	width,
	height = '22',
	rotate = 0,
}: IconInterface) => {
	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			height={height}
			viewBox='0 -960 960 960'
			width={width}
			fill={fill}
			style={{ transform: `rotate(${rotate}deg)` }}
		>
			<path d='M547-480 269-758q-21-21-21-51t21-51q21-21 51.5-21t51.5 21l292 291q19 19 28 42t9 47q0 24-9 47t-28 42L372-99q-21 21-51 20.5T270-100q-21-21-21-51.5t21-51.5l277-277Z' />
		</svg>
	)
}
