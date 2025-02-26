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
		<div className='px-24 py-6 flex h-full w-full flex-col gap-10'>
			<h3 className='text-3xl h-[5%] text-[#3F3F3F66]'>Программы обучения</h3>
			{table && (
				<div className='max-h-[calc(95% - 10rem)] overflow-y-auto rounded-[10px] w-full overflow-hidden bg-white'>
					<div
						className='w-full'
						dangerouslySetInnerHTML={{ __html: table }}
					></div>
				</div>
			)}
		</div>
	)
}
