import { getPage } from '@/api/api'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export const Page = () => {
	const { id } = useParams()
	const [content, setContent] = useState<HTMLCollection | null>(null)

	useEffect(() => {
		if (!id) return
		getPage({ id }).then((res: any) => {
			setContent(res.html ?? null)
		})
	}, [id])

	return (
		<div className=' pl-24 pr-16 py-6 h-full w-full '>
			{!id && '404'}
			<div className='wp-block-page min-h-full p-4 w-full rounded-[10px]'>
				{content && (
					<div
						dangerouslySetInnerHTML={{ __html: content?.toString() ?? '' }}
					/>
				)}
			</div>
		</div>
	)
}
