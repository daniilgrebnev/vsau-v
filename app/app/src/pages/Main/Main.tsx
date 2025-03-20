import { News } from '../../components/news/News'
import { ForWidgets } from './components/ForWidgets'
import { ListMain } from './components/ListMain'
import { MainWidgets } from './components/MainWidgets'

export const Main = () => {
	return (
		<div
			className='p-[40px] max-w-screen overflow-x-hidden grid max-md:block max-md:p-[10px]'
			style={{ gridTemplateColumns: '65% 35%' }}
		>
			<div className='flex items-start justify-start flex-col gap-6'>
				<ForWidgets />
				<MainWidgets />
				<ListMain />
			</div>
			<News />
		</div>
	)
}
