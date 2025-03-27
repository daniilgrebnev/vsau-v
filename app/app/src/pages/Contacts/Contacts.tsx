import { List } from '../Faculties/components/list/List'

export const Contacts = () => {
	return (
		<div className='px-24 py-6 h-[100%] w-full flex flex-col justify-start items-start gap-10 max-md:px-4 max-md:py-2'>
			<h2 className='text-[#3F3F3F66] text-3xl '>Контактная информация</h2>
			<div className='p-8 bg-white '>
				<h3 className='text-xl mb-10 font-semibold text-[#0F91D6]'>
					Телефон приёмной комиссии: <br /> +7 (473) 253 78 74
				</h3>
				<div className='flex items-start justify-start gap-10 max-md:flex-col max-md:text-center max-md:items-center'>
					<div className='w-1/2 max-md:w-full'>
						<div className=' text-[#000000] mb-10'>
							<span className=' font-semibold text-[#000000]'>
								Демидов Павел Валерьевич
							</span>{' '}
							<br />
							ответственный секретарь приемной комиссии
						</div>
						<div className=''>
							Телефон: (473) 253 78 67, +7-960-129-74-24 (WhatsApp, Telegram), в
							том числе для консультирования поступающих из Белгородской области
							и участников специальной военной операции на территориях Украины,
							Донецкой Народной Республики, Луганской Народной Республики,
							Запорожской области и Херсонской области и их детей <br /> E-mail:
							pre@emd.vsau.ru <br /> Адрес: г. Воронеж, ул. Мичурина, 1, ауд.
							178
						</div>
					</div>
					<div className='flex flex-col justify-between items-start gap-5 h-full'>
						<div className=''>
							<span className=' font-semibold text-[#000000]'>
								Коротких Татьяна Васильевна
							</span>
							<br /> секретарь приемной комиссии
						</div>
						<div className=''>
							Телефон: (473) 253 78 74 E-mail: entrance@vsau.ru Адрес: г. <br />
							Воронеж, ул. Мичурина, 1, ауд. 177
						</div>
						<div className=''>
							<span className=' font-semibold text-[#000000]'>
								Агибалов Александр Владимирович
							</span>
							<br /> ректор Воронежского ГАУ
						</div>
						<div className=''>
							Телефон: (473) 253 86 51 <br /> E-mail: main@vsau.ru <br />
							Адрес: ул. Мичурина, 1, ауд.101
						</div>
					</div>
				</div>
			</div>
			<h2 className='text-[#3F3F3F66] text-3xl '>Контакты факультетов</h2>
			<div className=''>
				<List />
			</div>
		</div>
	)
}
