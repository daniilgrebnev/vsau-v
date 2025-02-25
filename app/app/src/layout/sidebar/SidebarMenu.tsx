import { useEffect, useState } from 'react'
import { sidebarItems } from './api'
import { ISidebarMenuItem } from './interface'
import style from './sidebar.module.css'
import { SidebarMenuItem } from './SidebarMenuItem'

export const SidebarMenu = () => {
	const [items, setItems] = useState<ISidebarMenuItem[] | null>(null)

	useEffect(() => {
		sidebarItems().then(res => {
			setItems(res ?? null)
		})
	}, [])
	return (
		<div className='w-full h-full flex flex-col gap-2 gap-[5px] text-[16px] pb-4'>
			{items?.map((item, index) => (
				<SidebarMenuItem key={index} item={item} />
			))}
			<a
				href='https://www.vsau.ru/sveden/common'
				className={`w-full p-[2rem] rounded-[10px] bg-[#ffffff15] mt-10 flex items-center justify-start gap-3 hover:bg-[#ffffff30] transition-all ${style.menuItemWidget}`}
			>
				<img
					src='https://www.vsau.ru/wp-content/themes/vsau-v2-theme/assets/icons/sidebar/sveden.png'
					alt=''
					className='w-[25px] h-[25px] aspect-square rounded-full transition-all'
				/>

				<div className='text-white transition-all '>
					Сведения об образовательной организации
				</div>
			</a>
			<a
				href='https://next2.vsau.ru/личный-кабинет/'
				className={`w-full p-[2rem] rounded-[10px] bg-[#ffffff15] mt-5 mb-5 flex items-center justify-start gap-3 hover:bg-[#ffffff30] transition-all ${style.menuItemWidget}`}
			>
				<img
					src='https://www.vsau.ru/wp-content/themes/vsau-v2-theme/assets/icons/sidebar/loginAuth.png'
					alt=''
					className='w-[30px] h-[30px] aspect-square rounded-full transition-all'
				/>

				<div className='text-white transition-all'>
					Личный кабинет <br /> Студента/Преподавателя
				</div>
			</a>
			<div className='w-full  flex items-center justify-between pb-10 gap-2'>
				<div
					className={`w-1/5 aspect-square bg-[#ffffff15] ${style.menuItemWidgetBottom}`}
				>
					{' '}
					<img
						src='https://www.vsau.ru/wp-content/themes/vsau-v2-theme/assets/icons/sidebar/eyeversion.png'
						alt=''
					/>{' '}
				</div>
				<div
					className={`w-1/5 aspect-square bg-[#ffffff15] ${style.menuItemWidgetBottom}`}
				>
					{' '}
					<img
						src='https://www.vsau.ru/wp-content/themes/vsau-v2-theme/assets/icons/sidebar/lang.png'
						alt=''
					/>{' '}
				</div>
				<div
					className={`w-1/5 aspect-square bg-[#ffffff15] ${style.menuItemWidgetBottom}`}
				>
					{' '}
					<img
						src='https://www.vsau.ru/wp-content/themes/vsau-v2-theme/assets/icons/sidebar/any.png'
						alt=''
					/>{' '}
				</div>
				<div
					className={`w-2/5 aspect-2/1 bg-[#ffffff15] ${style.menuItemWidgetBottom}`}
				>
					{' '}
					<img
						src='https://www.vsau.ru/wp-content/themes/vsau-v2-theme/assets/icons/sidebar/search.png'
						alt=''
					/>{' '}
					<p className='text-[12px] text-white'>
						Поиск <br /> по сайту
					</p>
				</div>
			</div>
		</div>
	)
}
