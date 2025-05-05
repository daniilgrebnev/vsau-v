import { useEffect, useState } from 'react'
import { AspectIcon } from '../icons/AspectIcon'
import { ContactsIcon } from '../icons/ContactsIcon'
import { MenuDocOkIcon } from '../icons/MenuDocOkIcon'
import { StudIcon } from '../icons/StudIcon'

import styles from './layout.module.css'

import { CupIcon } from '@/icons/CupIcon'
import { Link, useLocation } from 'react-router-dom'
import { getPostContent } from '../api/api'

interface INvItem {
	name: string
	link: string
	icon: React.ReactNode
}

export const NavBar = ({}) => {
	const items: INvItem[] = [
		{
			name: 'Правила приема',
			link: `/reception`,
			icon: <MenuDocOkIcon fill='#0F91D6' height={25} />,
		},
		{
			name: 'Факультеты',
			link: `/faculties`,
			icon: <StudIcon fill='#0F91D6' height={25} />,
		},

		{
			name: 'Олимпиады и конкурсы',
			link: `/page/42396`,
			icon: <CupIcon fill='#0F91D6' height={25} />,
		},
		{
			name: 'Программы обучения',
			link: `/programs`,
			icon: <AspectIcon fill='#0F91D6' height={25} />,
		},
		{
			name: 'Контакты',
			link: `/contacts`,
			icon: <ContactsIcon fill='#0F91D6' height={25} />,
		},
	]
	const [postName, setPostName] = useState<string | null>(null)
	const { pathname } = useLocation()

	const getPostName = (id: string) => {
		getPostContent(Number(id)).then(res => {
			return setPostName(res.title ?? null)
		})
	}

	useEffect(() => {
		if (pathname.includes('post')) {
			getPostName(pathname.split('/')[pathname.split('/').length - 1])
		}
	}, [pathname])

	return (
		<>
			<div className='flex sticky top-0 z-50 items-center justify-between gap-2 py-4 px-12 w-full overflow-x-auto bg-white flex-nowrap max-w-full  no-scroll-class min-h-[90px] max-w-[100dvw] max-md:px-4 py-0.5'>
				{items.map(item => (
					<Link
						key={item.name}
						style={{ width: 100 / items.length + '%' }}
						to={`${item.link}`}
						className={`flex items-center transition-all justify-center gap-3 py-2 text-sm rounded-[30px] hover:bg-[#0F91D6] hover:text-white hover:justify-center min-w-[250px] max-md:text-[13px] max-md:min-w-[170px]  ${styles.item}`}
					>
						{item.icon}

						<p className='h-[25px] text-nowrap  flex items-end'>{item.name}</p>
					</Link>
				))}
			</div>
			{window.location.pathname !== '/' && (
				<div className='flex items-center justify-start text-sm text-[#00000050]  gap-4 py-4 px-24 w-full bg-[#F3F3F3] flex-nowrap max-w-full no-scroll-class'>
					<Link className='hover:underline' to={'/'}>
						Абитуриенту
					</Link>
					<div className=''>{'>'}</div>
					<div className='hover:underline cursor-pointer'>
						{pathname.includes('post')
							? postName
							: items.find(item => item.link === pathname)?.name}
					</div>
				</div>
			)}
		</>
	)
}
