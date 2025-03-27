import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getPostContent } from '../../api/api'
import { ListMain } from '../Main/components/ListMain'
import './single.css'

export const Single = () => {
	const { id } = useParams()
	const [content, setContent] = useState<string | null>(null)

	useEffect(() => {
		getPostContent(Number(id)).then(res => {
			setContent(res.content ?? null)
		})
	}, [id])

	return (
		<div className=' pl-24 pr-16 py-6 h-full w-full flex items-start gap-4 max-md:pl-4 max-md:pr-4 max-md:py-2'>
			<div className='wp-block-page min-h-full p-4 w-[65%] max-md:w-full  rounded-[10px] bg-white'>
				{content && <div dangerouslySetInnerHTML={{ __html: content }} />}
			</div>
			<div className='min-h-full w-[35%]  rounded-[10px] max-md:hidden max-md:w-0'>
				<ListMain />
			</div>
		</div>
	)
}
