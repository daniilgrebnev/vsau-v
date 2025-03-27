import { useEffect, useState } from 'react'
import { getFaculties } from '../../../../api/api'

interface IFaculty {
	id: number
	faculty: string
	teacher: string
	teacher_position: string
	vk_link: string
	tel1: string
	tel2: string
	tel3: string
	order: number
}

export const List = () => {
	const [faculties, setFaculties] = useState<IFaculty[]>([])

	useEffect(() => {
		getFaculties().then(res => {
			setFaculties(res as IFaculty[])
		})
	}, [])
	return (
		<div className='grid grid-cols-2 auto-rows-auto gap-4 w-full pb-[20px] max-md:grid-cols-1'>
			{faculties?.map((item, index) => (
				<div
					style={{
						gridTemplateRows: '30% 10% 10% 10% 25%',
					}}
					className='bg-white w-full h-full p-[42px] overflow-hidden rounded-[5px]  grid gap-2 max-md:p-[10px] max-md:gap-1 max-md:flex flex-col'
					key={index}
				>
					<div className='text-[#1495D9] max-md:text-lg text-2xl font-semibold'>
						{item.faculty}
					</div>
					<div className='text-xl font-bold max-md:text-base'>
						{item.teacher}
					</div>
					<div className='max-md:text-xs'>{item.teacher_position}</div>
					<a
						href={`https://${item.vk_link}`}
						className='block text-[#1495D9] cursor-pointer hover:underline max-md:text-xs'
					>
						{item.vk_link}
					</a>
					<div className='max-md:text-xs'>
						<div className='' key={index}>
							{item.tel1}
						</div>
						<div className='' key={index}>
							{item.tel2}
						</div>
						<div className='' key={index}>
							{item.tel3}
						</div>
					</div>
				</div>
			))}
		</div>
	)
}
