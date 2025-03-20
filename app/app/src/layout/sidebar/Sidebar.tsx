import { DzenIcon } from '@/icons/DzenIcon'
import { OKIcon } from '@/icons/OKIcon'
import { TelegramIcon } from '@/icons/TelegramIcon'
import { VKIcon } from '@/icons/VKIcon'
import { YoutubeIcon } from '@/icons/YoutubeIcon'
import { SidebarMenu } from './SidebarMenu'

export const Sidebar = ({ openSidebar }: { openSidebar: () => void }) => {
	return (
		<div
			style={{ gridTemplateRows: '15% 78% 7%' }}
			className='w-[27rem] overflow-hidden grid min-w-[27rem] max-w-[27rem] max-md:min-w-[100dvw] min-h-screen bg-[#0f91d6] pt-7'
		>
			<div
				className='max-md:block w-[20px] m-1 flex items-center justify-center aspect-square rounded-[5px]  text-red-300 text-lg  hidden absolute top-0 right-0 z-100 text-center font-bold'
				onClick={openSidebar}
			>
				X
			</div>
			<div className='flex justify-center items-end h-full'>
				<a
					href='https://www.vsau.ru'
					className='flex justify-center items-center max-md:px-[5px] px-[15px] pt-[60px] text-white gap-4'
				>
					<img
						src='https://www.vsau.ru/wp-content/themes/vsau-v2-theme/assets/icons/svg/logo.svg'
						alt=''
						width={110}
						height={110}
						className='h-[110px] w-[110px] min-h-[110px] min-w-[110px] max-h-[110px] max-w-[110px]'
					/>
					<div className='flex flex-col justify-between items-center gap-2'>
						<p className='text-[10px] max-md:text-[8px]'>
							Федеральное государственное бюджетное образовательное учреждение
							высшего образования
						</p>
						<p className='text-[16px] leading-[1.2rem] max-md:text-[14px]'>
							<b>
								Воронежский государственный аграрный университет имени
								императора Петра I
							</b>
						</p>
					</div>
				</a>
			</div>
			<div className='p-10 max-md:px-[15px] h-full overflow-y-auto overflow-x-hidden'>
				<SidebarMenu />
			</div>
			<div className='w-full h-full bg-white gap-6 flex items-center justify-center '>
				<a className='hover:opacity-75 active:opacity-30 transition-all cursor-pointer'>
					<VKIcon fill='#0F91D6' height={15} />
				</a>
				<a className='hover:opacity-75 active:opacity-30 transition-all cursor-pointer'>
					<OKIcon fill='#0F91D6' height={20} />
				</a>
				<a className='hover:opacity-75 active:opacity-30 transition-all cursor-pointer'>
					<TelegramIcon fill='#0F91D6' height={15} />
				</a>
				<a className='hover:opacity-75 active:opacity-30 transition-all cursor-pointer'>
					<YoutubeIcon fill='#0F91D6' height={15} />
				</a>
				<a className='hover:opacity-75 active:opacity-30 transition-all cursor-pointer'>
					<DzenIcon fill='#0F91D6' height={15} />
				</a>
			</div>
		</div>
	)
}
