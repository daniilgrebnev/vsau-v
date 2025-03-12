import { getMenu, IMenuItem } from '@/api/api'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export const MainWidgets = () => {
	// const widgets: IMainWidget[] = [
	// 	{
	// 		icon: <GraphIcon fill='white' height={24} width={24} />,
	// 		label: 'Рейтинг поступающих',
	// 		href: '',
	// 	},
	// 	{
	// 		icon: <CupIcon fill='white' height={24} width={24} />,
	// 		label: 'Олимпиады и конкурсы 2025',
	// 		href: '',
	// 	},
	// 	{
	// 		icon: <DocIcon fill='white' height={24} width={24} />,
	// 		label: 'Приказы о зачислении',
	// 		href: '',
	// 	},
	// ]

	const [widgets, setWidgets] = useState<IMenuItem[]>([])
	useEffect(() => {
		getMenu({ menuName: 'abitMiddle' }).then(res => {
			setWidgets(res ?? [])
		})
	}, [])
	return (
		<div className='w-full flex gap-[10px] justify-between flex-wrap'>
			{widgets?.map(w => (
				<Link
					to={`/page/${w.id}`}
					style={{ gridTemplateColumns: '20% 80%' }}
					className='grid gap-[10px] bg-white py-4 px-2 rounded-[15px] w-[32%] hover:opacity-80 active:opacity-50 transition-all'
				>
					<div className='flex items-center justify-end'>
						<div className='bg-[#1495D9] w-[40px] aspect-square flex items-center justify-center  rounded-[10px]'>
							<img src={w.image} alt='' />
						</div>
					</div>
					<p className='flex text-[14px] items-center justify-start w-full'>
						{w.name}
					</p>
				</Link>
			))}
		</div>
	)
}
