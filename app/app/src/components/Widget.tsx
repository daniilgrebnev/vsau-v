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
		<div className='w-full max-md:min-h-[auto]   bg-blue-200 relative'>
			<img
				className='w-full  inset-0 z-10 object-cover'
				src={imgGenerator()}
				alt='CORP'
			/>
		</div>
	)
}
