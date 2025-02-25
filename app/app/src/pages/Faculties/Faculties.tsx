import { useState } from 'react'
import styles from './components/faculties.module.css'
import { List } from './components/list/List'
import { Slider } from './components/slider/Slider'

export const Faculties = () => {
	const [faculties, setFaculties] = useState<'slider' | 'list'>('list')
	return (
		<div className='py-4 px-24 w-full flex justify-between items-start flex-col gap-10 h-full'>
			<div className=' flex items-start justify-start flex-col gap-10'>
				<h2 className='text-4xl font-bold'>Уважаемые абитуриенты!</h2>
				<p className=''>
					{faculties == 'list' &&
						'Получить информацию об особенностях образовательного процесса на выбранной специальности, возможностях трудоустройства после получения высшего образования и задать интересующие вопросы руководителям факультетов аграрного университета теперь можно используя мессенджеры, социальные сети или просто позвонив по номеру телефона:'}
					{faculties == 'slider' &&
						'На данной странице вы можете ознакомиться с перечнем факультетов ФГБОУ ВО Воронежский ГАУ, а также с направлениями и направленностями'}
				</p>
			</div>
			<div className='flex items-start justify-start gap-6'>
				<button
					className={
						styles.button + ' ' + (faculties == 'list' ? styles.active : '')
					}
					onClick={() => setFaculties('list')}
				>
					Контакты факультетов
				</button>
				<button
					className={
						styles.button + ' ' + (faculties == 'slider' ? styles.active : '')
					}
					onClick={() => setFaculties('slider')}
				>
					О факультетах
				</button>
			</div>
			<div className='h-[80%] w-full'>
				{faculties == 'slider' && <Slider />}
				{faculties == 'list' && <List />}
			</div>
		</div>
	)
}
