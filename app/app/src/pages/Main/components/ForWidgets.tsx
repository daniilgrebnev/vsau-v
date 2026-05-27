import eleven from '../../../images/main-page/11.svg'
import nine from '../../../images/main-page/9.svg'
import mag from '../../../images/main-page/MAG.svg'
import spo from '../../../images/main-page/SPO.svg'
import bookletBak from '../../../images/Буклет_бакалавриат (специалитет)_ВГАУ_2026_ДОД.pdf'
import bookletSpo from '../../../images/Буклет_СПО_2026_А4.pdf'
import bookletBakForSpo from '../../../images/Буклет_бакалавриат (специалитет)_для СПО_ВГАУ_2026.pdf'
import bookletMag from '../../../images/Буклет_магистратура_ВГАУ_2026.pdf'

export const ForWidgets = () => {
	const widgetImgs = [
		{
			img: eleven,
			href: bookletBak,
		},
		{
			img: nine,
			href: bookletSpo,
		},
		{
			img: spo,
			href: bookletBakForSpo,
		},
		{
			img: mag,
			href: bookletMag,
		},
	]
	return (
		<div className='w-full flex  gap-[10px] justify-between'>
			{widgetImgs.map(w => (
				<a
					key={w.href}
					href={w.href}
					target='_blank'
					rel='noopener noreferrer'
					className='flex items-center justify-center  aspect-[1/1] overflow-hidden rounded-[10px] hover:opacity-80 active:opacity-50 w-1/4 transition-all cursor-pointer '
				>
					<img src={w.img} alt='' className='w-full' />
				</a>
			))}
		</div>
	)
}
