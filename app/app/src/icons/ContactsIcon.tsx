import { IconInterface } from './interface'

export const ContactsIcon = ({ width, height, fill }: IconInterface) => {
	return (
		<svg
			width={width}
			height={height}
			viewBox='0 0 27 25'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
		>
			<path
				d='M22.3773 15.8581C21.0828 14.7164 19.0309 14.7174 17.7385 15.8651L15.6748 17.4708C12.2102 16.1141 9.74458 13.8336 8.16508 10.5254L9.8995 8.62881C11.141 7.43709 11.1421 5.54453 9.906 4.3488C9.906 4.3488 7.89967 1.94236 7.86608 1.91137C6.55958 0.703653 4.42975 0.704652 3.1785 1.86438L1.93375 2.86715C0.686833 4.01688 0 5.56952 0 7.24213C0 14.8764 10.9698 25 19.2422 25C21.0546 25 22.7381 24.3671 24.0316 23.1674L25.0196 22.1177C26.325 20.911 26.325 18.9484 25.0196 17.7427C24.9871 17.7117 22.3784 15.8601 22.3784 15.8601L22.3773 15.8581Z'
				fill={fill}
			/>
			<path
				d='M20.5 2V10.5'
				stroke={fill}
				stroke-width='3'
				stroke-linecap='round'
			/>
			<path
				d='M24.75 6.25L16.25 6.25'
				stroke={fill}
				stroke-width='3'
				stroke-linecap='round'
			/>
		</svg>
	)
}
