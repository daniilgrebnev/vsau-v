import eleven from '../../../images/main-page/11.svg'
import nine from '../../../images/main-page/9.svg'
import mag from '../../../images/main-page/MAG.svg'
import spo from '../../../images/main-page/SPO.svg'

export const ForWidgets = () => {
	const widgetImgs = [
		{
			img: eleven,
			href: '',
		},
		{
			img: nine,
			href: '',
		},
		{
			img: spo,
			href: '',
		},
		{
			img: mag,
			href: '',
		},
	]
	return (
		<div className='w-full flex  gap-[10px] justify-between'>
			{widgetImgs.map(w => (
				<a
					href={w.href}
					className='flex items-center justify-center  aspect-[1/1] overflow-hidden rounded-[10px] hover:opacity-80 active:opacity-50 w-1/4 transition-all cursor-pointer '
				>
					<img src={w.img} alt='' className='w-full' />
				</a>
			))}
		</div>
	)
}
