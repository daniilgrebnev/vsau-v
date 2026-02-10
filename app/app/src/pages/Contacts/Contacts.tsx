import { List } from '../Faculties/components/list/List'

export const Contacts = () => {
	return (
		<div className='px-24 py-6 h-[100%] w-full flex flex-col justify-start items-start gap-10 max-md:px-4 max-md:py-2'>
			<h2 className='text-[#3F3F3F66] text-3xl '>Контактная информация</h2>
			<div className='p-8 bg-white '>
				<h3 className='text-xl mb-10 font-normal text-[#0F91D6]'>
					Телефоны приёмной комиссии: <br />
					<a className='hover:underline hover:text-[#1495d9] text-[#1494d9bc]' href='tel:+7-(473)-253-78-74'>
						+7-(473)-253-78-74
					</a>
					,<br />
					<a className='hover:underline hover:text-[#1495d9] text-[#1494d9bc]' href='tel:+7-(473)-253-78-67'>
						+7-(473)-253-78-67
					</a>
					<br /> Email:{' '}
					<a className='hover:underline' href='mailto:entrance@vsau.ru'>
						entrance@vsau.ru
					</a>
					<br /> Адрес:{' '}
					<a
						className='hover:underline'
						href='https://yandex.ru/maps/-/CHRKeI~l'
					>
						г. Воронеж, ул. Мичурина, 1, ауд. 177 и 178
					</a>
				</h3>
				<div className='flex items-start justify-start gap-10 max-md:flex-col max-md:text-center max-md:items-center'>
					<div className='w-1/2 max-md:w-full'>
						<div className=' text-[#000000] mb-10'>
							<span className=' font-semibold text-[#000000]'>
								Демидов Павел Валерьевич
							</span>{' '}
							<br />
							ответственный секретарь приемной комиссии – по всем вопросам, в
							том числе для консультаций поступающих из приграничных районов,
							ДНР, ЛНР, Запорожской и Херсонской области, участников специальной
							военной операции и их детей
						</div>
						<div className=''>
							Телефон:{' '}
							<a className='hover:underline hover:text-[#1495d9] text-[#1494d9bc]' href='tel:+7-(473)-253-78-67'>
								+7-(473)-253-78-67
							</a>
							,{' '}
							<a className='hover:underline hover:text-[#1495d9] text-[#1494d9bc]' href='tel:+7-960-129-74-24'>+7-960-129-74-24</a> (WhatsApp,
							Telegram) <br /> E-mail:{' '}
							<a
								className={
									'hover:underline hover:text-[#1495d9] text-[#1494d9bc]'
								}
								href='mailto:pre@emd.vsau.ru'
							>
								pre@emd.vsau.ru
							</a>
							<br /> Адрес:{' '}
							<a
								className='hover:underline hover:text-[#1495d9] text-[#1494d9bc]'
								href='https://yandex.ru/maps/-/CHRKeI~l'
							>
								г. Воронеж, ул. Мичурина, 1, ауд. 178
							</a>
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
							Телефон:{' '}
							<a
								className='hover:underline hover:text-[#1495d9] text-[#1494d9bc]'
								href='tel:+7-(473)-253-78-67'
							>
								+7-(473)-253-78-67
							</a>{' '}
							<br /> E-mail:{' '}
							<a
								className='hover:underline hover:text-[#1495d9] text-[#1494d9bc]'
								href='mailto:celevoe@emd.vsau.ru'
							>
								celevoe@emd.vsau.ru
							</a>
						</div>
						<div className=''>
							<span className=' font-semibold text-[#000000]'>
								Алынина Дарья Николаевна <br /> Новикова Валентина Анатольевна{' '}
								<br />
								Чевычалов Кирилл Юрьевич
							</span>
							<br /> специалисты центра по работе с абитуриентами
						</div>
						<div className=''>
							Телефон:{' '}
							<a
								className='hover:underline hover:text-[#1495d9] text-[#1494d9bc]'
								href='tel:+7-(473)-253-78-74'
							>
								+7-(473)-253-78-74
							</a>{' '}
							<br /> E-mail:{' '}
							<a
								className='hover:underline hover:text-[#1495d9] text-[#1494d9bc]'
								href='mailto:entrance@vsau.ru'
							>
								entrance@vsau.ru
							</a>
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
