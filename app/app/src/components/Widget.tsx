import Image from '../images/CORP.png'
import Map from '../images/MAP.png'

export const Widget = () => {
	const imgGenerator = () => {
		switch (window.location.pathname) {
			case '/':
				return Image
			case '/contacts':
				return Map
		}
	}
	return (
		<div className='w-full min-h-[45dvh] aspect-[3.2/1] bg-blue-200 relative'>
			<img
				className='w-full absolute inset-0 z-10 h-full'
				src={imgGenerator()}
				alt='CORP'
			/>
		</div>
	)
}
