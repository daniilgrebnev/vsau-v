import { IconInterface } from './interface'

export const SliderArrow = ({ width, height, fill, rotate }: IconInterface) => {
	return (
		<svg
			width={width}
			height={height}
			viewBox='0 0 16 18'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
			style={{ transform: `rotate(${rotate}deg)`, transition: 'all 0.3s ease' }}
		>
			<path
				d='M14.125 7.26795C15.4583 8.03775 15.4583 9.96225 14.125 10.7321L3.625 16.7942C2.29167 17.564 0.625 16.6018 0.625 15.0622L0.625 2.93782C0.625 1.39822 2.29167 0.435971 3.625 1.20577L14.125 7.26795Z'
				fill={fill}
			/>
		</svg>
	)
}
