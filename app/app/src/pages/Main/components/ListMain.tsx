import { useEffect, useState } from 'react'
import { QuestIcon } from '../../../icons/QuestIcon'

import { Link, useLocation } from 'react-router-dom'
import { getByCategory } from '../../../api/api'
import styles from './list.module.css'

export interface IListMain {
	title: string
	id: string
}

export const ListMain = () => {
	const [list, setList] = useState<IListMain[] | null>(null)
	const { pathname } = useLocation()

	const isActiveHandle = (id: string) => {
		const postId = pathname.split('/')[pathname.split('/').length - 1]
		console.log(postId, id)
		return postId == id
	}

	useEffect(() => {
		getByCategory('abit_list')
			.then(res => {
				setList(res ?? null)
			})
			.catch(err => {
				setList(null)
				console.log(err)
			})
	}, [])

	return (
		<div className='w-full flex flex-col gap-[10px]'>
			{list?.map(i => (
				<Link
					className={
						styles.card + ' ' + (isActiveHandle(i.id) ? styles.active : '')
					}
					key={i.id}
					to={`/post/${i.id}`}
					id={i.id}
				>
					<div className='flex items-baseline justify-center  w-full gap-20 '>
						<div
							className={`${
								!isActiveHandle(i.id) ? 'bg-[#1495D9]' : 'bg-white'
							} h-[30px] aspect-square  rounded-full flex items-center justify-center`}
						>
							<QuestIcon
								fill={!isActiveHandle(i.id) ? 'white' : '#1495D9'}
								width={15}
							/>
						</div>
					</div>
					<p>{i.title}</p>
				</Link>
			))}
		</div>
	)
}
