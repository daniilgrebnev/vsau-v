import { useState } from 'react'
import { SliderArrow } from '../../icons/SliderArrow'
import { ISidebarMenuItem } from './interface'
import style from './sidebar.module.css'

export const SidebarMenuItem = ({ item }: { item: ISidebarMenuItem }) => {
	const [isOpen, setIsOpen] = useState(false)

	const handleClick = () => {
		if (item.children.length != 0) {
			setIsOpen(!isOpen)
		} else {
			window.location.href = item.url
		}
	}
	return (
		<>
			<div
				onClick={handleClick}
				className={`grid select-none items-center text-white py-1 relative ${style.menuItem} `}
			>
				{item.children.length != 0 && (
					<div className='absolute flex items-center justify-center -left-[10px] w-[2px]  w-[10px] h-full'>
						<SliderArrow
							fill='#ffffff79'
							width={10}
							height={10}
							rotate={isOpen ? 90 : 0}
						/>
					</div>
				)}

				<div className='w-full h-full flex items-center justify-center'>
					<img src={item.icon} alt='' className='w-[30px] h-[30px]' />
				</div>
				<div
					className={`h-full w-full flex items-center justify-start ${style.menuItemTitle}`}
				>
					{item.title}
				</div>
			</div>

			{item.children.length != 0 && isOpen && (
				<div style={{ gridTemplateColumns: '20% 80%' }} className='grid'>
					<div className=''></div>
					<div
						className={`bg-[#ffffff1a] p-4 rounded-[10px] ${style.menuItemChildren}`}
					>
						<div className='text-white text-[12px] flex flex-col gap-2 '>
							{item.children.map((itemx, index) => (
								<a
									key={index}
									className='opacity-50 cursor-pointer hover:opacity-100 transition-all hover:scale-105 duration-300 '
									href={itemx.url}
								>
									{itemx.title}
								</a>
							))}
						</div>
					</div>
				</div>
			)}
		</>
	)
}
