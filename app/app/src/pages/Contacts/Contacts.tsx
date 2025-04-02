import { List } from '../Faculties/components/list/List'

export const Contacts = () => {
	return (
		<div className='px-24 py-6 h-[100%] w-full flex flex-col justify-start items-start gap-10 max-md:px-4 max-md:py-2'>
			<h2 className='text-[#3F3F3F66] text-3xl '>Контактная информация</h2>
			<div className='p-8 bg-white '>
				<h3 className='text-xl mb-10 font-semibold text-[#0F91D6]'>
					Телефоны приёмной комиссии: <br />
					<a className='hover:underline' href='tel:+7-(473)-253-78-74'>
						+7-(473)-253-78-74
					</a>
					,<br />
					<a className='hover:underline' href='tel:+7-(473)-253-78-67'>
						+7-(473)-253-78-67
					</a>
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
							<span className='font-semibold text-[#000000]'>
								Калмыкова Валерия Алексеевна
							</span>
							<br /> ведущий специалист отдела сопровождения целевого приема и
							обучения – по вопросам приема на целевое обучение
						</div>
						<div className=''>
							Телефон: (473) 253 78 74 <br /> E-mail: celevoe@emd.vsau.ru
						</div>
						<div className=''>
							<span className=' font-semibold text-[#000000]'>
								Чевычалов Кирилл Юрьевич
							</span>
							<br /> специалист центра по работе с абитуриентами
						</div>
						<div className=''>
							Телефон:{' '}
							<a className='hover:underline' href='tel:+7-(473)-253-78-74'>
								+7-(473)-253-78-74
							</a>{' '}
							<br /> E-mail: entrance@vsau.ru
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
