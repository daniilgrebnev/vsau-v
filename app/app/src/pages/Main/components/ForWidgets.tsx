import eleven from '../../../images/main-page/11.svg'
import nine from '../../../images/main-page/9.svg'
import mag from '../../../images/main-page/MAG.svg'
import spo from '../../../images/main-page/SPO.svg'

export const ForWidgets = () => {
	const widgetImgs = [
		{
			img: eleven,
			href: 'https://abit.vsau.ru/wp-content/uploads/2025/01/%D0%91%D1%83%D0%BA%D0%BB%D0%B5%D1%82_%D0%B1%D0%B0%D0%BA%D0%B0%D0%BB%D0%B0%D0%B2%D1%80%D0%B8%D0%B0%D1%82-%D1%81%D0%BF%D0%B5%D1%86%D0%B8%D0%B0%D0%BB%D0%B8%D1%82%D0%B5%D1%82_%D0%92%D0%93%D0%90%D0%A3_2025.pdf',
		},
		{
			img: nine,
			href: 'https://abit.vsau.ru/wp-content/uploads/2025/01/%D0%91%D1%83%D0%BA%D0%BB%D0%B5%D1%82_%D0%A1%D0%9F%D0%9E_2025_%D0%904.pdf',
		},
		{
			img: spo,
			href: 'https://abit.vsau.ru/wp-content/uploads/2025/01/%D0%91%D1%83%D0%BA%D0%BB%D0%B5%D1%82_%D0%B1%D0%B0%D0%BA%D0%B0%D0%BB%D0%B0%D0%B2%D1%80%D0%B8%D0%B0%D1%82-%D1%81%D0%BF%D0%B5%D1%86%D0%B8%D0%B0%D0%BB%D0%B8%D1%82%D0%B5%D1%82_%D0%B4%D0%BB%D1%8F-%D0%A1%D0%9F%D0%9E_%D0%92%D0%93%D0%90%D0%A3_2025-1.pdf',
		},
		{
			img: mag,
			href: 'https://abit.vsau.ru/wp-content/uploads/2025/01/%D0%91%D1%83%D0%BA%D0%BB%D0%B5%D1%82_%D0%BC%D0%B0%D0%B3%D0%B8%D1%81%D1%82%D1%80%D0%B0%D1%82%D1%83%D1%80%D0%B0_%D0%92%D0%93%D0%90%D0%A3_2025.pdf',
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
