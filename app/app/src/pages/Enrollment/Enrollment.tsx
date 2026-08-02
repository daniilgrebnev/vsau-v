import { getPage } from '@/api/api'
import { useEffect, useState } from 'react'

const ENROLLMENT_PAGE_ID = '82036'

export const Enrollment = () => {
	const [content, setContent] = useState<string | null>(null)
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		getPage({ id: ENROLLMENT_PAGE_ID })
			.then(res => {
				setContent(res?.html?.trim() || null)
			})
			.finally(() => {
				setIsLoading(false)
			})
	}, [])

	return (
		<div className='px-24 py-6 h-[100%] w-full flex flex-col justify-start items-start gap-10 max-md:px-4 max-md:py-2'>
			<h2 className='text-[#3F3F3F66] text-3xl'>Сведения о зачислении</h2>
			<div className='wp-block-page p-8 bg-white w-full rounded-[10px]'>
				{isLoading ? (
					<p className='text-[#3F3F3F] text-lg'>Загрузка...</p>
				) : content ? (
					<div dangerouslySetInnerHTML={{ __html: content }} />
				) : (
					<p className='text-[#3F3F3F] text-lg'>
						Приказы о зачислении будут опубликованы в этом разделе по мере их
						издания.
					</p>
				)}
			</div>
		</div>
	)
}
