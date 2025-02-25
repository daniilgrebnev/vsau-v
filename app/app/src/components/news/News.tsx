import { useEffect, useState } from 'react'

import { getNews } from '../../api/api'

interface IPost {
	id: number
	title: string
	image: string
	link: string
}

export const News = () => {
	const [news, setNews] = useState<IPost[]>([])
	useEffect(() => {
		getNews().then(res => {
			setNews(res)
		})
	}, [])
	return (
		<div className='px-4 w-full'>
			<h3 className='text-xl mb-5 text-[#3F3F3F66]'>
				Новости приемной комиссии
			</h3>
			<div className='flex flex-col items-center justify-center gap-4 w-full'>
				{news?.map(item => (
					<a
						href={item.link}
						className='w-full aspect-[3.2/1] bg-white overflow-hidden rounded-lg flex items-center justify-between  hover:opacity-50 active:opacity-30 transition-all'
						key={item.id}
					>
						<div className='h-full w-1/3 h-full'>
							<img
								src={item.image}
								alt=''
								className='w-full h-full object-cover'
							/>
						</div>
						<div className='w-2/3 p-4 h-full flex items-start justify-start'>
							<p className='text-[#3F3F3F]  font-bold'>{item.title}</p>
						</div>
					</a>
				))}
			</div>
		</div>
	)
}
