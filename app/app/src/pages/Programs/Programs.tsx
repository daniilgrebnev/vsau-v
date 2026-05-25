import { getProgramsTable } from '@/api/api'
import { useEffect, useState } from 'react'
import './programs.css'

export const Programs = () => {
	const [table, setTable] = useState<HTMLTableElement | undefined>()

	useEffect(() => {
		getProgramsTable().then(res => {
			if (res) {
				setTable(res.html ?? null)
			}
		})
	}, [])

	return (
		<div className='flex h-full w-full flex-col gap-6 px-24 py-6 max-md:gap-4 max-md:px-4 max-md:py-2'>
			<h3 className='shrink-0 text-3xl text-[#3F3F3F66]'>Программы обучения</h3>
			{table ? (
				<div className='programs-table-scroll min-h-0 flex-1'>
					<div
						className='w-full'
						dangerouslySetInnerHTML={{ __html: table }}
					/>
				</div>
			) : (
				<div className='flex flex-1 items-center justify-center rounded-[10px] bg-white text-[#3F3F3F99] shadow-sm'>
					Загрузка таблицы…
				</div>
			)}
		</div>
	)
}
