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
