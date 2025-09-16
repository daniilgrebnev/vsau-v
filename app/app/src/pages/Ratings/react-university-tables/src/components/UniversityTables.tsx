import { FC, useMemo, useState } from 'react'
import './UniversityTables.css'

export interface TableData {
	name: string
	faculty: string
	file: string
}

export interface UniversityTablesProps {
	baseUrl?: string
	title?: string
	subtitle?: string
	customTables?: TableData[]
	onTableClick?: (table: TableData) => void
	className?: string
}

const UniversityTables: FC<UniversityTablesProps> = ({
	baseUrl = '/tables-in-package/',
	title = 'Списки поступающих ВГАУ',
	subtitle = '2025 год',
	customTables,
	onTableClick,
	className = '',
}) => {
	const [searchQuery, setSearchQuery] = useState<string>('')

	// Данные о всех таблицах
	const defaultTables: TableData[] = [
		// Высшее образование - Аграрный факультет
		{
			name: 'Агрохимия, агропочвоведение, защита и карантин растений',
			faculty: 'Аграрный факультет',
			file: 'ff1.html',
		},
		{
			name: 'Общее земледелие и растениеводство',
			faculty: 'Аграрный факультет',
			file: 'ff6.html',
		},
		{
			name: 'Садоводство, овощеводство, виноградарство и лекарственные культуры',
			faculty: 'Аграрный факультет',
			file: 'ff13.html',
		},
		{
			name: 'Селекция, семеноводство и биотехнология растений',
			faculty: 'Аграрный факультет',
			file: 'ff15.html',
		},
		{ name: 'Агрономия', faculty: 'Аграрный факультет', file: 'ff19.html' },
		{
			name: 'Агрохимия и агропочвоведение',
			faculty: 'Аграрный факультет',
			file: 'ff20.html',
		},
		{ name: 'Садоводство', faculty: 'Аграрный факультет', file: 'ff33.html' },
		{
			name: 'Технология производства и переработки сельскохозяйственной продукции',
			faculty: 'Аграрный факультет',
			file: 'ff34.html',
		},
		{ name: 'Агроинженерия', faculty: 'Аграрный факультет', file: 'ff40.html' },
		{
			name: 'Агрономия (магистратура)',
			faculty: 'Аграрный факультет',
			file: 'ff41.html',
		},
		{
			name: 'Садоводство (магистратура)',
			faculty: 'Аграрный факультет',
			file: 'ff48.html',
		},

		// Факультет ветеринарной медицины и технологии животноводства
		{
			name: 'Паразитология',
			faculty: 'Факультет ветеринарной медицины и технологии животноводства',
			file: 'ff8.html',
		},
		{
			name: 'Патология животных, морфология, физиология, фармакология и токсикология',
			faculty: 'Факультет ветеринарной медицины и технологии животноводства',
			file: 'ff9.html',
		},
		{
			name: 'Разведение, селекция, генетика и биотехнология животных',
			faculty: 'Факультет ветеринарной медицины и технологии животноводства',
			file: 'ff11.html',
		},
		{
			name: 'Частная зоотехния, кормление, технология приготовления кормов и производство продукции животноводства',
			faculty: 'Факультет ветеринарной медицины и технологии животноводства',
			file: 'ff17.html',
		},
		{
			name: 'Зоотехния',
			faculty: 'Факультет ветеринарной медицины и технологии животноводства',
			file: 'ff24.html',
		},
		{
			name: 'Ветеринарно-санитарная экспертиза',
			faculty: 'Факультет ветеринарной медицины и технологии животноводства',
			file: 'ff21.html',
		},
		{
			name: 'Ветеринария',
			faculty: 'Факультет ветеринарной медицины и технологии животноводства',
			file: 'ff49.html',
		},
		{
			name: 'Зоотехния (магистратура)',
			faculty: 'Факультет ветеринарной медицины и технологии животноводства',
			file: 'ff46.html',
		},

		// Технологический факультет
		{
			name: 'Аналитическая химия',
			faculty: 'Технологический факультет',
			file: 'ff2.html',
		},
		{
			name: 'Пищевые системы',
			faculty: 'Технологический факультет',
			file: 'ff10.html',
		},
		{
			name: 'Биотехнология',
			faculty: 'Технологический факультет',
			file: 'ff22.html',
		},
		{
			name: 'Продукты питания животного происхождения',
			faculty: 'Технологический факультет',
			file: 'ff29.html',
		},
		{
			name: 'Продукты питания из растительного сырья',
			faculty: 'Технологический факультет',
			file: 'ff30.html',
		},
		{
			name: 'Товароведение',
			faculty: 'Технологический факультет',
			file: 'ff35.html',
		},

		// Инженерный факультет
		{
			name: 'Технологии, машины и оборудование для агропромышленного комплекса',
			faculty: 'Инженерный факультет',
			file: 'ff16.html',
		},
		{
			name: 'Агроинженерия',
			faculty: 'Инженерный факультет',
			file: 'ff18.html',
		},
		{
			name: 'Эксплуатация транспортно-технологических машин и комплексов',
			faculty: 'Инженерный факультет',
			file: 'ff37.html',
		},
		{
			name: 'Наземные транспортно-технологические средства',
			faculty: 'Инженерный факультет',
			file: 'ff50.html',
		},

		// Экономический факультет
		{
			name: 'Региональная и отраслевая экономика',
			faculty: 'Экономический факультет',
			file: 'ff12.html',
		},
		{
			name: 'Менеджмент',
			faculty: 'Экономический факультет',
			file: 'ff27.html',
		},
		{
			name: 'Экономика',
			faculty: 'Экономический факультет',
			file: 'ff36.html',
		},
		{
			name: 'Государственное и муниципальное управление',
			faculty: 'Экономический факультет',
			file: 'ff23.html',
		},
		{
			name: 'Менеджмент (магистратура)',
			faculty: 'Экономический факультет',
			file: 'ff47.html',
		},
		{
			name: 'Экономика (магистратура)',
			faculty: 'Экономический факультет',
			file: 'ff49.html',
		},
		{
			name: 'Экономическая безопасность',
			faculty: 'Экономический факультет',
			file: 'ff51.html',
		},

		// Гуманитарно-правовой факультет
		{
			name: 'Отечественная история',
			faculty: 'Гуманитарно-правовой факультет',
			file: 'ff7.html',
		},
		{
			name: 'Юриспруденция',
			faculty: 'Гуманитарно-правовой факультет',
			file: 'ff38.html',
		},
		{
			name: 'Профессиональное обучение (по отраслям)',
			faculty: 'Гуманитарно-правовой факультет',
			file: 'ff31.html',
		},
		{
			name: 'Юриспруденция (магистратура)',
			faculty: 'Гуманитарно-правовой факультет',
			file: 'ff50.html',
		},

		// СПО - Аграрный факультет
		{
			name: 'Технология продуктов питания из растительного сырья (СПО 9 кл)',
			faculty: 'Аграрный факультет',
			file: 'spo_ff1.html',
		},
		{
			name: 'Технология продуктов питания животного происхождения (СПО 9 кл)',
			faculty: 'Аграрный факультет',
			file: 'spo_ff3.html',
		},
		{
			name: 'Технология продуктов питания животного происхождения (СПО 11 кл)',
			faculty: 'Аграрный факультет',
			file: 'spo_ff4.html',
		},
		{
			name: 'Прикладная геодезия (СПО 9 кл)',
			faculty: 'Аграрный факультет',
			file: 'spo_ff6.html',
		},
		{
			name: 'Прикладная геодезия (СПО 11 кл)',
			faculty: 'Аграрный факультет',
			file: 'spo_ff7.html',
		},
		{
			name: 'Эксплуатация беспилотных авиационных систем (СПО 9 кл)',
			faculty: 'Аграрный факультет',
			file: 'spo_ff9.html',
		},
		{
			name: 'Эксплуатация беспилотных авиационных систем (СПО 11 кл)',
			faculty: 'Аграрный факультет',
			file: 'spo_ff10.html',
		},
		{
			name: 'Мастер садово-паркового и ландшафтного строительства (СПО)',
			faculty: 'Аграрный факультет',
			file: 'spo_ff12.html',
		},
		{
			name: 'Агрономия (СПО 9 кл)',
			faculty: 'Аграрный факультет',
			file: 'spo_ff13.html',
		},
		{
			name: 'Агрономия (СПО 11 кл)',
			faculty: 'Аграрный факультет',
			file: 'spo_ff14.html',
		},
		{
			name: 'Кинология (СПО 9 кл)',
			faculty: 'Аграрный факультет',
			file: 'spo_ff15.html',
		},
		{
			name: 'Кинология (СПО 11 кл)',
			faculty: 'Аграрный факультет',
			file: 'spo_ff16.html',
		},
		{
			name: 'Ветеринария (СПО 9 кл)',
			faculty: 'Аграрный факультет',
			file: 'spo_ff17.html',
		},
		{
			name: 'Ветеринария (СПО 11 кл)',
			faculty: 'Аграрный факультет',
			file: 'spo_ff18.html',
		},
		{
			name: 'Экономика и бухгалтерский учет (СПО)',
			faculty: 'Аграрный факультет',
			file: 'spo_ff19.html',
		},

		// Конкурсные списки
		{
			name: 'Конкурсные списки высшего образования',
			faculty: 'Все факультеты',
			file: 'ff53.html',
		},
	]

	const allTables = customTables || defaultTables

	// Фильтрованные таблицы на основе поискового запроса
	const filteredTables = useMemo(() => {
		if (!searchQuery.trim()) return allTables

		const query = searchQuery.toLowerCase()
		return allTables.filter(
			table =>
				table.name.toLowerCase().includes(query) ||
				table.faculty.toLowerCase().includes(query)
		)
	}, [searchQuery, allTables])

	// Обработчик открытия таблицы
	const handleTableClick = (table: TableData) => {
		if (onTableClick) {
			onTableClick(table)
		} else {
			const url = `${baseUrl}${table.file}`
			window.open(url, '_blank')
		}
	}

	// Компонент карточки таблицы
	const TableCard: FC<{ table: TableData }> = ({ table }) => (
		<div
			className='university-table-card'
			onClick={() => handleTableClick(table)}
		>
			<div className='university-table-name'>{table.name}</div>
			<div className='university-table-faculty'>{table.faculty}</div>
			<div className='university-table-link'>Открыть список</div>
		</div>
	)

	return (
		<div className={`university-tables-container ${className}`}>
			{/* Заголовок */}
			<div className='university-tables-header'>
				<h1>{title}</h1>
				<p>{subtitle}</p>
			</div>

			{/* Поиск */}
			<div className='university-tables-search'>
				<input
					type='text'
					value={searchQuery}
					onChange={e => setSearchQuery(e.target.value)}
					placeholder='Поиск по направлениям или факультетам...'
					className='university-tables-search-input'
				/>
				<div className='university-tables-search-results'>
					{searchQuery
						? filteredTables.length === 0
							? `По запросу "${searchQuery}" ничего не найдено`
							: `По запросу "${searchQuery}" найдено: ${filteredTables.length} направлений`
						: `Показано: ${allTables.length} направлений`}
				</div>
			</div>

			{/* Сетка карточек */}
			<div className='university-tables-grid'>
				{filteredTables.map((table, index) => (
					<TableCard key={`${table.file}-${index}`} table={table} />
				))}
			</div>
		</div>
	)
}

export default UniversityTables
