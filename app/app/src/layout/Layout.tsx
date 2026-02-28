import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Widget } from '../components/Widget'
import { MobileOpener } from './MobileOpener'
import { NavBar } from './NavBar'
import { Sidebar } from './sidebar/Sidebar'

export const Layout = ({ children }: { children: React.ReactNode }) => {
	const { pathname } = useLocation()
	const imgIsVisible = () => {
		switch (pathname) {
			case '/':
				return true
			case '/contacts':
				return true
			default:
				return false
		}
	}
	const [openSidebar, setOpenSidebar] = useState(true)

	useEffect(() => {
		const screen = window.innerWidth
		if (screen < 768) {
			setOpenSidebar(false)
		}
		const handleLinkClick = (e: MouseEvent) => {
			const target = e.target as HTMLElement
			const link = target.closest('a')

			if (!link) return

			const href = link.getAttribute('href')

			// Проверяем, ведет ли ссылка на внешний сайт
			if (
				href &&
				(href.startsWith('http') || href.startsWith('//')) &&
				!href.includes(window.location.hostname)
			) {
				e.preventDefault()
				window.open(href, '_blank')
			}
			// Если ссылка внутренняя - ничего не делаем, пусть работает как обычно
		}

		document.addEventListener('click', handleLinkClick)

		return () => {
			document.removeEventListener('click', handleLinkClick)
		}
	}, [])

	return (
		<div className='flex h-[100vh] w-[100vw] overflow-x-hidden '>
			{openSidebar && (
				<Sidebar openSidebar={() => setOpenSidebar(!openSidebar)} />
			)}
			<section className='min-h-screen flex w-full flex-col h-[100vh] max-h-[100vh] overflow-y-auto'>
				<MobileOpener openHandler={() => setOpenSidebar(!openSidebar)} />
				{imgIsVisible() && <Widget />}
				<NavBar />
				{children}
			</section>
		</div>
	)
}
