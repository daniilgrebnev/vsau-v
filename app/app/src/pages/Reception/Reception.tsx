import { useEffect, useState } from 'react'
import { getAdmissions } from '../../api/api'
import { QuestIcon } from '../../icons/QuestIcon'
import './rec.css'

interface IAdmission {
	id: number
	name: string
	link: string
}

export const Reception = () => {
	const [admissions, setAdmissions] = useState<IAdmission[]>([])

	useEffect(() => {
		getAdmissions().then((res: IAdmission[]) => {
			setAdmissions(res as IAdmission[])
		})
	}, [])
	return (
		<div className='px-24 py-6 flex flex-col gap-10 a'>
			<h2 className='text-[#3F3F3F66] text-3xl '>Информация о приеме</h2>
			<div className='container_admission flex items-center justify-between gap-4 flex-col w-full  '>
				{admissions?.map(item => (
					<a
						href={item.link}
						className='bg-white p-4 w-full rounded-[5px] flex items-center justify-start gap-10 hover:opacity-50 active:opacity-30 transition-all'
					>
						<div className='w-10% h-full flex items-center justify-center '>
							<div className='bg-[#1495D9] w-[30px] aspect-square flex items-center justify-center  rounded-full quest'>
								<QuestIcon fill='currentColor' width={'50%'} />
							</div>
						</div>
						<p>{item.name}</p>
					</a>
				))}
			</div>
		</div>
	)
}
