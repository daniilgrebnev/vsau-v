import React from 'react'
import { CupIcon } from '../../../icons/CupIcon'
import { DocIcon } from '../../../icons/DocIcon'
import { GraphIcon } from '../../../icons/GraphIcon'

interface IMainWidget {
	icon: React.ReactNode
	label: string
	href: string
}

export const MainWidgets = () => {
	const widgets: IMainWidget[] = [
		{
			icon: <GraphIcon fill='white' height={24} width={24} />,
			label: 'Рейтинг поступающих',
			href: '',
		},
		{
			icon: <CupIcon fill='white' height={24} width={24} />,
			label: 'Олимпиады и конкурсы 2025',
			href: '',
		},
		{
			icon: <DocIcon fill='white' height={24} width={24} />,
			label: 'Приказы о зачислении',
			href: '',
		},
	]
	return (
		<div className='w-full flex gap-[10px] justify-between flex-wrap'>
			{widgets.map(w => (
				<a
					href={w.href}
					style={{ gridTemplateColumns: '20% 80%' }}
					className='grid gap-[10px] bg-white py-4 px-2 rounded-[15px] w-[32%] hover:opacity-80 active:opacity-50 transition-all'
				>
					<div className='flex items-center justify-end'>
						<div className='bg-[#1495D9] w-[40px] aspect-square flex items-center justify-center  rounded-[10px]'>
							{w.icon}
						</div>
					</div>
					<p className='flex text-[14px] items-center justify-start w-full'>
						{w.label}
					</p>
				</a>
			))}
		</div>
	)
}
