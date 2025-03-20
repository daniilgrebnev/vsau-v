import { MobileLogo } from '@/icons/MobileLogo'

export const MobileOpener = ({ openHandler }: { openHandler: () => void }) => {
	return (
		<div className='hidden max-md:flex w-full items-center justify-between p-4'>
			<a href='https://www.vsau.ru/' className='h-full flex items-center'>
				<MobileLogo height={'100%'} />
			</a>
			<div
				className='bg-[#1495D9] px-8 py-2 rounded-[20px] text-[11px] text-white flex items-center justify-center'
				onClick={openHandler}
			>
				Главное меню
			</div>
		</div>
	)
}
