import { useLocation } from 'react-router-dom'
import { Widget } from '../components/Widget'
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
	return (
		<div className='flex h-[100vh] w-[100vw] '>
			<Sidebar />
			<section className='min-h-screen flex w-full flex-col h-[100vh] max-h-[100vh] overflow-y-auto'>
				{imgIsVisible() && <Widget />}

				<NavBar />
				{children}
			</section>
		</div>
	)
}
