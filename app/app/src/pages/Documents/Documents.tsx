import { CopyIcon } from '@/icons/CopyIcon'
import { ExplorerIcon } from '@/icons/ExplorerIcon'
import { MapMarkerIcon } from '@/icons/MapMarkerIcon'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { CommIcon } from '../../icons/CommIcon'
import { GosuslugiIcon } from '../../icons/GosuslugiIcon'
import { MailIcon } from '../../icons/MailIcon'
import styles from './documents.module.css'

export const Documents = () => {
	return (
		<div className='flex items-center justify-end px-[70px] pt-2 h-[100%] flex-col gap-3'>
			<h2 className='text-[#3F3F3F66] text-3xl text-left w-full'>
				Вы можете подать документы:
			</h2>
			<div className='h-[95%] flex items-center justify-start w-full min-gap-[10px] gap-[20px] pb-6 overflow-y-auto'>
				<CommItem />
				<MailItem />
				<GosuslugiItem />
			</div>
		</div>
	)
}

const CommItem = () => {
	return (
		<div
			style={{
				background: 'linear-gradient(343.62deg, #37AEED 0.5%, #73CEFE 98.89%)',
			}}
			className={styles.card}
		>
			<div className={styles.img}>
				<CommIcon fill='white' width={'50%'} />
			</div>
			<h3 className={styles.title}>Лично в приемную комиссию</h3>
			<div className={styles.description}>
				<h4 className={styles.subTitle}>г. Воронеж, ул. Мичурина, д. 1</h4>
				<p className={styles.subDescr}>
					Главный корпус агроуниверситета, ауд. 138 и 177
				</p>
			</div>

			<div className={styles.button}>
				<MapMarkerIcon height={15} fill='white' />
				<a href='https://yandex.ru/maps/-/CHRKeI~l'>Показать на карте</a>
			</div>
			<div className='h-full flex flex-col gap-2 justify-start items-start '>
				<b className='mb-10'>Пн - Пт, с 8:30 до 16:30</b>
				<p>График работы по выходным следует уточнять по телефонам:</p>
				<a className='hover:underline' href='tel:+7-(473)-253-78-74'>
					+7-(473)-253-78-74
				</a>
				<a className='hover:underline' href='tel:+7-(473)-253-78-67'>
					+7-(473)-253-78-67
				</a>
			</div>
		</div>
	)
}

const MailItem = () => {
	const [copied, setCopied] = useState(false)
	const handleCopy = () => {
		navigator.clipboard.writeText('entrance@36.vsau.ru')
		setCopied(true)
		setTimeout(() => setCopied(false), 1000)
	}
	return (
		<div
			style={{
				background: 'linear-gradient(343.62deg, #37AEED 0.5%, #73CEFE 98.89%)',
			}}
			className={styles.card}
		>
			<div className={styles.img}>
				<MailIcon fill='white' width={'50%'} />
			</div>
			<h3 className={styles.title}>На электронную почту</h3>
			<div className={styles.description}>
				<h4 className={styles.subTitle}>
					Отправьте заявление и документы на адрес:
				</h4>
				<p className={styles.subDescr}>entrance@36.vsau.ru</p>
			</div>

			<div className={styles.button + ' ' + (copied ? styles.copied : '')}>
				<div className='flex items-center justify-center h-full'>
					<CopyIcon height={15} fill={copied ? '#37AEED' : '#fff'} />
				</div>
				<p className='link' onClick={handleCopy}>
					{copied ? 'Скопировано!' : 'Скопировать адрес эл. почты'}
				</p>
			</div>
			<div className='h-full flex flex-col gap-1 justify-start items-start '>
				<b className='text-md'>
					Инструкции для подготовки и направления документов:
				</b>
				<Link className='underline font-light' to='/post/42546'>
					Среднее профессиональное образование (СПО)
				</Link>
				<Link className='underline font-light' to='/post/42544'>
					Бакалавриат / специалитет
				</Link>
				<Link className='underline font-light' to='/post/42542'>
					Магистратура
				</Link>
			</div>
		</div>
	)
}

const GosuslugiItem = () => {
	return (
		<div
			style={{
				background: 'linear-gradient(162.45deg, #0066B3 0%, #EE2F53 100%)',
			}}
			className={styles.card}
		>
			<div className={styles.img}>
				<GosuslugiIcon fill='white' width={'50%'} />
			</div>
			<h3 className={styles.title}>Через портал Госуслуги</h3>
			<div className={styles.description}>
				<h4 className={styles.subTitle}>Посредством ЕПГУ</h4>
				<p className={styles.subDescr}>
					Суперсервис "Поступление в вуз онлайн"
				</p>
			</div>
			<div className={styles.button}>
				<ExplorerIcon height={15} fill='#fff' />
				<a href='https://www.gosuslugi.ru/vuzonline'>Открыть в Госуслугах</a>
			</div>
			<div className='h-full'></div>
		</div>
	)
}
