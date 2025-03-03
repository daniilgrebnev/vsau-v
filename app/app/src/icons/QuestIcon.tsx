import { IconInterface } from './interface'

export const QuestIcon = ({ width, height, fill }: IconInterface) => {
	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			height={height}
			viewBox='0 -960 960 960'
			width={width}
			fill={fill}
		>
			<path d='M568-662q0-33-22-54t-57-21q-23 0-42.5 8T412-704q-29 32-69.5 36T276-689q-20-20-20-51.5t21-57.5q38-48 92-73t120-25q109 0 176 64t67 167q0 51-27 102.5T621-451q-14 15-25.5 31T575-387q-16 30-38 46t-47 16q-32 0-55-21t-23-51q0-47 22-88.5t64-71.5q39-28 54.5-51.5T568-662ZM489-42q-46 0-78-32t-32-78q0-46 32-78.5t78-32.5q46 0 78.5 32.5T600-152q0 46-32.5 78T489-42Z' />
		</svg>
	)
}
