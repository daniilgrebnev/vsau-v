import { SidebarMenu } from './SidebarMenu'

export const Sidebar = () => {
	return (
		<div
			style={{ gridTemplateRows: '15% 78% 7%' }}
			className='w-[27rem] overflow-hidden grid min-w-[27rem] max-w-[27rem] min-h-screen bg-[#0f91d6] pt-7'
		>
			<div className='flex justify-center items-end h-full'>
				<a
					href='https://www.vsau.ru'
					className='flex justify-center items-center px-[15px] pt-[60px] text-white gap-4'
				>
					<img
						src='https://www.vsau.ru/wp-content/themes/vsau-v2-theme/assets/icons/svg/logo.svg'
						alt=''
						width={110}
						height={110}
						className='h-[110px] w-[110px] min-h-[110px] min-w-[110px] max-h-[110px] max-w-[110px]'
					/>
					<div className='flex flex-col justify-between items-center gap-2'>
						<p className='text-[10px]'>
							Федеральное государственное бюджетное образовательное учреждение
							высшего образования
						</p>
						<p className='text-[16px] leading-[1.2rem]'>
							<b>
								Воронежский государственный аграрный университет имени
								императора Петра I
							</b>
						</p>
					</div>
				</a>
			</div>
			<div className='p-10 h-full overflow-y-auto overflow-x-hidden'>
				<SidebarMenu />
			</div>
			<div className='w-full h-full bg-white'></div>
		</div>
	)
}
