import { FC, useMemo, useState } from 'react'
import './UniversityTables.css'

export interface TableData {
	name: string
	faculty: string
	file: string
	educationLevel?: string
	code?: string
	planBudget?: number
	factBudget?: number
	planPaid?: number
	factPaid?: number
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
	const [selectedLevel, setSelectedLevel] = useState<string>('')
	const [selectedQualification, setSelectedQualification] = useState<string>('')
	const [selectedFaculty, setSelectedFaculty] = useState<string>('')
	const [selectedDirection, setSelectedDirection] = useState<string>('')

	// Данные о всех таблицах
	const defaultTables: TableData[] = [
		// АСПИРАНТУРА
		{
			name: 'Агрохимия, агропочвоведение, защита и карантин растений',
			faculty: 'Факультет агрономии, агрохимии и экологии',
			file: 'ff1.html',
			educationLevel: 'Аспирантура',
			code: '4.1.3.',
			planBudget: 1,
			factBudget: 2,
		},
		{
			name: 'Аналитическая химия',
			faculty: 'Факультет технологии и товароведения',
			file: 'ff2.html',
			educationLevel: 'Аспирантура',
			code: '1.4.2.',
			planBudget: 1,
			factBudget: 1,
		},
		{
			name: 'Биологические ресурсы',
			faculty: 'Факультет агрономии, агрохимии и экологии',
			file: 'ff3.html',
			educationLevel: 'Аспирантура',
			code: '1.5.20.',
			planBudget: 1,
			factBudget: 1,
		},
		{
			name: 'Ботаника',
			faculty: 'Факультет агрономии, агрохимии и экологии',
			file: 'ff4.html',
			educationLevel: 'Аспирантура',
			code: '1.5.9.',
			planBudget: 1,
			factBudget: 1,
		},
		{
			name: 'Землеустройство, кадастр и мониторинг земель',
			faculty: 'Факультет землеустройства и кадастров',
			file: 'ff5.html',
			educationLevel: 'Аспирантура',
			code: '1.6.15.',
			planBudget: 1,
			factBudget: 1,
		},
		{
			name: 'Общее земледелие и растениеводство',
			faculty: 'Факультет агрономии, агрохимии и экологии',
			file: 'ff6.html',
			educationLevel: 'Аспирантура',
			code: '4.1.1.',
			planBudget: 1,
			factBudget: 4,
		},
		{
			name: 'Отечественная история',
			faculty: 'Гуманитарно-правовой факультет',
			file: 'ff7.html',
			educationLevel: 'Аспирантура',
			code: '5.6.1.',
			planBudget: 1,
			factBudget: 3,
		},
		{
			name: 'Паразитология',
			faculty: 'Факультет ветеринарной медицины и технологии животноводства',
			file: 'ff8.html',
			educationLevel: 'Аспирантура',
			code: '1.5.17.',
			planBudget: 1,
			factBudget: 2,
		},
		{
			name: 'Патология животных, морфология, физиология, фармакология и токсикология',
			faculty: 'Факультет ветеринарной медицины и технологии животноводства',
			file: 'ff9.html',
			educationLevel: 'Аспирантура',
			code: '4.2.1.',
			planBudget: 1,
			factBudget: 2,
		},
		{
			name: 'Пищевые системы',
			faculty: 'Факультет технологии и товароведения',
			file: 'ff10.html',
			educationLevel: 'Аспирантура',
			code: '4.3.3.',
			planBudget: 1,
			factBudget: 1,
		},
		{
			name: 'Разведение, селекция, генетика и биотехнология животных',
			faculty: 'Факультет ветеринарной медицины и технологии животноводства',
			file: 'ff11.html',
			educationLevel: 'Аспирантура',
			code: '4.2.5.',
			planBudget: 2,
			factBudget: 2,
		},
		{
			name: 'Региональная и отраслевая экономика',
			faculty: 'Экономический факультет',
			file: 'ff12.html',
			educationLevel: 'Аспирантура',
			code: '5.2.3.',
			planBudget: 3,
			factBudget: 10,
		},
		{
			name: 'Садоводство, овощеводство, виноградарство и лекарственные культуры',
			faculty: 'Факультет агрономии, агрохимии и экологии',
			file: 'ff13.html',
			educationLevel: 'Аспирантура',
			code: '4.1.4.',
			planBudget: 1,
			factBudget: 1,
		},
		{
			name: 'Санитария, гигиена, экология, ветеринарно-санитарная экспертиза и биобезопасность',
			faculty: 'Факультет ветеринарной медицины и технологии животноводства',
			file: 'ff14.html',
			educationLevel: 'Аспирантура',
			code: '4.2.2.',
			planBudget: 1,
			factBudget: 3,
		},
		{
			name: 'Селекция, семеноводство и биотехнология растений',
			faculty: 'Факультет агрономии, агрохимии и экологии',
			file: 'ff15.html',
			educationLevel: 'Аспирантура',
			code: '4.1.2.',
			planBudget: 2,
			factBudget: 2,
		},
		{
			name: 'Технологии, машины и оборудование для агропромышленного комплекса',
			faculty: 'Агроинженерный факультет',
			file: 'ff16.html',
			educationLevel: 'Аспирантура',
			code: '4.3.1.',
			planBudget: 2,
			factBudget: 5,
		},
		{
			name: 'Частная зоотехния, кормление, технология приготовления кормов и производство продукции животноводства',
			faculty: 'Факультет ветеринарной медицины и технологии животноводства',
			file: 'ff17.html',
			educationLevel: 'Аспирантура',
			code: '4.2.4.',
			planBudget: 1,
			factBudget: 4,
		},

		// БАКАЛАВРИАТ
		{
			name: 'Агроинженерия',
			faculty: 'Агроинженерный факультет',
			file: 'ff18.html',
			educationLevel: 'Бакалавр',
			code: '35.03.06',
			planBudget: 72,
			factBudget: 681,
			planPaid: 400,
			factPaid: 197,
		},
		{
			name: 'Агрономия',
			faculty: 'Факультет агрономии, агрохимии и экологии',
			file: 'ff19.html',
			educationLevel: 'Бакалавр',
			code: '35.03.04',
			planBudget: 60,
			factBudget: 462,
			planPaid: 100,
			factPaid: 104,
		},
		{
			name: 'Агрохимия и агропочвоведение',
			faculty: 'Факультет агрономии, агрохимии и экологии',
			file: 'ff20.html',
			educationLevel: 'Бакалавр',
			code: '35.03.03',
			planBudget: 20,
			factBudget: 295,
			planPaid: 25,
			factPaid: 26,
		},
		{
			name: 'Биотехнология',
			faculty: 'Факультет технологии и товароведения',
			file: 'ff21.html',
			educationLevel: 'Бакалавр',
			code: '19.03.01',
			planBudget: 14,
			factBudget: 422,
			planPaid: 25,
			factPaid: 25,
		},
		{
			name: 'Ветеринарно-санитарная экспертиза',
			faculty: 'Факультет ветеринарной медицины и технологии животноводства',
			file: 'ff22.html',
			educationLevel: 'Бакалавр',
			code: '36.03.01',
			planBudget: 33,
			factBudget: 303,
			planPaid: 25,
			factPaid: 49,
		},
		{
			name: 'Государственное и муниципальное управление',
			faculty: 'Экономический факультет',
			file: 'ff23.html',
			educationLevel: 'Бакалавр',
			code: '38.03.04',
			planPaid: 75,
			factPaid: 280,
		},
		{
			name: 'Землеустройство и кадастры',
			faculty: 'Факультет землеустройства и кадастров',
			file: 'ff24.html',
			educationLevel: 'Бакалавр',
			code: '21.03.02',
			planBudget: 39,
			factBudget: 600,
			planPaid: 50,
			factPaid: 186,
		},
		{
			name: 'Зоотехния',
			faculty: 'Факультет ветеринарной медицины и технологии животноводства',
			file: 'ff25.html',
			educationLevel: 'Бакалавр',
			code: '36.03.02',
			planBudget: 28,
			factBudget: 193,
			planPaid: 25,
			factPaid: 34,
		},
		{
			name: 'Ландшафтная архитектура',
			faculty: 'Факультет землеустройства и кадастров',
			file: 'ff26.html',
			educationLevel: 'Бакалавр',
			code: '35.03.10',
			planBudget: 22,
			factBudget: 520,
			planPaid: 25,
			factPaid: 91,
		},
		{
			name: 'Менеджмент',
			faculty: 'Экономический факультет',
			file: 'ff27.html',
			educationLevel: 'Бакалавр',
			code: '38.03.02',
			planPaid: 60,
			factPaid: 196,
		},
		{
			name: 'Прикладная информатика',
			faculty: 'Экономический факультет',
			file: 'ff28.html',
			educationLevel: 'Бакалавр',
			code: '09.03.03',
			planBudget: 6,
			factBudget: 250,
			planPaid: 75,
			factPaid: 161,
		},
		{
			name: 'Природообустройство и водопользование',
			faculty: 'Факультет землеустройства и кадастров',
			file: 'ff29.html',
			educationLevel: 'Бакалавр',
			code: '20.03.02',
			planPaid: 25,
			factPaid: 29,
		},
		{
			name: 'Продукты питания животного происхождения',
			faculty: 'Факультет технологии и товароведения',
			file: 'ff30.html',
			educationLevel: 'Бакалавр',
			code: '19.03.03',
			planBudget: 1,
			factBudget: 1,
			planPaid: 25,
			factPaid: 32,
		},
		{
			name: 'Продукты питания из растительного сырья',
			faculty: 'Факультет технологии и товароведения',
			file: 'ff31.html',
			educationLevel: 'Бакалавр',
			code: '19.03.02',
			planBudget: 16,
			factBudget: 183,
			planPaid: 15,
			factPaid: 31,
		},
		{
			name: 'Профессиональное обучение (по отраслям)',
			faculty: 'Гуманитарно-правовой факультет',
			file: 'ff32.html',
			educationLevel: 'Бакалавр',
			code: '44.03.04',
			planPaid: 90,
			factPaid: 66,
		},
		{
			name: 'Садоводство',
			faculty: 'Факультет агрономии, агрохимии и экологии',
			file: 'ff33.html',
			educationLevel: 'Бакалавр',
			code: '35.03.05',
			planBudget: 21,
			factBudget: 198,
			planPaid: 15,
			factPaid: 30,
		},
		{
			name: 'Технология производства и переработки сельскохозяйственной продукции',
			faculty: 'Факультет технологии и товароведения',
			file: 'ff34.html',
			educationLevel: 'Бакалавр',
			code: '35.03.07',
			planBudget: 58,
			factBudget: 328,
			planPaid: 20,
			factPaid: 67,
		},
		{
			name: 'Товароведение',
			faculty: 'Факультет технологии и товароведения',
			file: 'ff35.html',
			educationLevel: 'Бакалавр',
			code: '38.03.07',
			planPaid: 30,
			factPaid: 50,
		},
		{
			name: 'Экономика',
			faculty: 'Экономический факультет',
			file: 'ff36.html',
			educationLevel: 'Бакалавр',
			code: '38.03.01',
			planPaid: 125,
			factPaid: 263,
		},
		{
			name: 'Эксплуатация транспортно-технологических машин и комплексов',
			faculty: 'Агроинженерный факультет',
			file: 'ff37.html',
			educationLevel: 'Бакалавр',
			code: '23.03.03',
			planBudget: 13,
			factBudget: 363,
			planPaid: 15,
			factPaid: 85,
		},
		{
			name: 'Юриспруденция',
			faculty: 'Гуманитарно-правовой факультет',
			file: 'ff38.html',
			educationLevel: 'Бакалавр',
			code: '40.03.01',
			planBudget: 1,
			factBudget: 1,
			planPaid: 125,
			factPaid: 429,
		},

		// МАГИСТРАТУРА
		{
			name: 'Агроинженерия',
			faculty: 'Агроинженерный факультет',
			file: 'ff39.html',
			educationLevel: 'Магистр',
			code: '35.04.06',
			planBudget: 36,
			factBudget: 72,
			planPaid: 25,
			factPaid: 4,
		},
		{
			name: 'Агрономия',
			faculty: 'Передовая инженерная школа «Агроген»',
			file: 'ff40.html',
			educationLevel: 'Магистр',
			code: '35.04.04',
			planBudget: 25,
			factBudget: 68,
			planPaid: 30,
			factPaid: 7,
		},
		{
			name: 'Агрохимия и агропочвоведение',
			faculty: 'Факультет агрономии, агрохимии и экологии',
			file: 'ff41.html',
			educationLevel: 'Магистр',
			code: '35.04.03',
			planBudget: 8,
			factBudget: 25,
			planPaid: 15,
			factPaid: 2,
		},
		{
			name: 'Ветеринарно-санитарная экспертиза',
			faculty: 'Факультет ветеринарной медицины и технологии животноводства',
			file: 'ff42.html',
			educationLevel: 'Магистр',
			code: '36.04.01',
			planBudget: 12,
			factBudget: 31,
			planPaid: 15,
			factPaid: 1,
		},
		{
			name: 'Высокотехнологичные производства пищевых продуктов функционального и специализированного назначения',
			faculty: 'Факультет технологии и товароведения',
			file: 'ff43.html',
			educationLevel: 'Магистр',
			code: '19.04.05',
			planBudget: 20,
			factBudget: 49,
			planPaid: 15,
			factPaid: 11,
		},
		{
			name: 'Землеустройство и кадастры',
			faculty: 'Факультет землеустройства и кадастров',
			file: 'ff44.html',
			educationLevel: 'Магистр',
			code: '21.04.02',
			planBudget: 6,
			factBudget: 35,
			planPaid: 20,
			factPaid: 26,
		},
		{
			name: 'Зоотехния',
			faculty: 'Факультет ветеринарной медицины и технологии животноводства',
			file: 'ff45.html',
			educationLevel: 'Магистр',
			code: '36.04.02',
			planBudget: 24,
			factBudget: 53,
			planPaid: 30,
			factPaid: 30,
		},
		{
			name: 'Менеджмент',
			faculty: 'Экономический факультет',
			file: 'ff46.html',
			educationLevel: 'Магистр',
			code: '38.04.02',
			planPaid: 15,
			factPaid: 22,
		},
		{
			name: 'Садоводство',
			faculty: 'Факультет агрономии, агрохимии и экологии',
			file: 'ff47.html',
			educationLevel: 'Магистр',
			code: '35.04.05',
			planBudget: 8,
			factBudget: 20,
			planPaid: 15,
			factPaid: 15,
		},
		{
			name: 'Экономика',
			faculty: 'Экономический факультет',
			file: 'ff48.html',
			educationLevel: 'Магистр',
			code: '38.04.01',
			planPaid: 75,
			factPaid: 25,
		},
		{
			name: 'Юриспруденция',
			faculty: 'Гуманитарно-правовой факультет',
			file: 'ff49.html',
			educationLevel: 'Магистр',
			code: '40.04.01',
			planPaid: 15,
			factPaid: 13,
		},

		// СПЕЦИАЛИТЕТ
		{
			name: 'Ветеринария',
			faculty: 'Факультет ветеринарной медицины и технологии животноводства',
			file: 'ff50.html',
			educationLevel: 'Специалист',
			code: '36.05.01',
			planBudget: 80,
			factBudget: 517,
			planPaid: 50,
			factPaid: 214,
		},
		{
			name: 'Наземные транспортно-технологические средства',
			faculty: 'Инженерный факультет',
			file: 'ff51.html',
			educationLevel: 'Специалист',
			code: '23.05.01',
			planBudget: 24,
			factBudget: 367,
			planPaid: 15,
			factPaid: 77,
		},
		{
			name: 'Экономическая безопасность',
			faculty: 'Экономический факультет',
			file: 'ff52.html',
			educationLevel: 'Специалист',
			code: '38.05.01',
			planPaid: 90,
			factPaid: 210,
		},

		// СПО (Среднее профессиональное образование)
		{
			name: 'Технология продуктов питания из растительного сырья (на базе 9 классов)',
			faculty: 'Факультет технологии и товароведения',
			file: 'spo_ff1.html',
			educationLevel: 'СПО',
			code: '19.02.11',
			planPaid: 25,
			factPaid: 16,
		},
		{
			name: 'Технология продуктов питания животного происхождения (на базе 9 классов)',
			faculty: 'Факультет технологии и товароведения',
			file: 'spo_ff3.html',
			educationLevel: 'СПО',
			code: '19.02.12',
			planBudget: 35,
			factBudget: 140,
			planPaid: 25,
			factPaid: 58,
		},
		{
			name: 'Технология продуктов питания животного происхождения (на базе 11 классов)',
			faculty: 'Факультет технологии и товароведения',
			file: 'spo_ff4.html',
			educationLevel: 'СПО',
			code: '19.02.12',
			planPaid: 25,
			factPaid: 17,
		},
		{
			name: 'Прикладная геодезия (на базе 9 классов)',
			faculty: 'Факультет агрономии, агрохимии и экологии',
			file: 'spo_ff6.html',
			educationLevel: 'СПО',
			code: '21.02.20',
			planBudget: 10,
			factBudget: 154,
			planPaid: 80,
			factPaid: 151,
		},
		{
			name: 'Прикладная геодезия (на базе 11 классов)',
			faculty: 'Факультет агрономии, агрохимии и экологии',
			file: 'spo_ff7.html',
			educationLevel: 'СПО',
			code: '21.02.20',
			planPaid: 25,
			factPaid: 50,
		},
		{
			name: 'Эксплуатация беспилотных авиационных систем (на базе 9 классов)',
			faculty: 'Факультет агрономии, агрохимии и экологии',
			file: 'spo_ff9.html',
			educationLevel: 'СПО',
			code: '25.02.08',
			planBudget: 25,
			factBudget: 162,
			planPaid: 65,
			factPaid: 122,
		},
		{
			name: 'Мастер садово-паркового и ландшафтного строительства (на базе 11 классов)',
			faculty: 'Факультет агрономии, агрохимии и экологии',
			file: 'spo_ff10.html',
			educationLevel: 'СПО',
			code: '35.01.19',
			planPaid: 100,
			factPaid: 88,
		},
		{
			name: 'Агрономия (на базе 9 классов)',
			faculty: 'Факультет агрономии, агрохимии и экологии',
			file: 'spo_ff12.html',
			educationLevel: 'СПО',
			code: '35.02.05',
			planBudget: 15,
			factBudget: 140,
			planPaid: 85,
			factPaid: 131,
		},
		{
			name: 'Кинология (на базе 9 классов)',
			faculty: 'Факультет ветеринарной медицины и технологии животноводства',
			file: 'spo_ff13.html',
			educationLevel: 'СПО',
			code: '35.02.15',
			planPaid: 75,
			factPaid: 98,
		},
		{
			name: 'Кинология (на базе 11 классов)',
			faculty: 'Факультет ветеринарной медицины и технологии животноводства',
			file: 'spo_ff14.html',
			educationLevel: 'СПО',
			code: '35.02.15',
			planPaid: 25,
			factPaid: 27,
		},
		{
			name: 'Ветеринария (на базе 9 классов)',
			faculty: 'Факультет ветеринарной медицины и технологии животноводства',
			file: 'spo_ff16.html',
			educationLevel: 'СПО',
			code: '36.02.01',
			planBudget: 30,
			factBudget: 195,
			planPaid: 145,
			factPaid: 255,
		},
		{
			name: 'Ветеринария (на базе 11 классов)',
			faculty: 'Факультет ветеринарной медицины и технологии животноводства',
			file: 'spo_ff17.html',
			educationLevel: 'СПО',
			code: '36.02.01',
			planPaid: 25,
			factPaid: 53,
		},
		{
			name: 'Экономика и бухгалтерский учет (по отраслям) (на базе 9 классов)',
			faculty: 'Экономический факультет',
			file: 'spo_ff18.html',
			educationLevel: 'СПО',
			code: '38.02.01',
			planPaid: 60,
			factPaid: 90,
		},
		{
			name: 'Экономика и бухгалтерский учет (по отраслям) (на базе 11 классов)',
			faculty: 'Экономический факультет',
			file: 'spo_ff19.html',
			educationLevel: 'СПО',
			code: '38.02.01',
			planPaid: 25,
			factPaid: 28,
		},

		// Конкурсные списки
		{
			name: 'Конкурсные списки высшего образования',
			faculty: 'Все факультеты',
			file: 'ff53.html',
			educationLevel: 'Общий список',
		},
	]

	const allTables = customTables || defaultTables

	// Получаем уникальные уровни образования
	const educationLevels = useMemo(() => {
		const levels = allTables
			.map(table => table.educationLevel)
			.filter((level, index, arr) => level && arr.indexOf(level) === index)
		return levels
	}, [allTables])

	// Получаем уникальные степени квалификации
	const qualifications = useMemo(() => {
		const quals = allTables
			.map(table => table.educationLevel)
			.filter((level, index, arr) => level && arr.indexOf(level) === index)
		return quals
	}, [allTables])

	// Получаем факультеты в зависимости от выбранной степени квалификации
	const availableFaculties = useMemo(() => {
		let filtered = allTables

		if (selectedQualification) {
			filtered = filtered.filter(
				table => table.educationLevel === selectedQualification
			)
		}

		const faculties = filtered
			.map(table => table.faculty)
			.filter(
				(faculty, index, arr) => faculty && arr.indexOf(faculty) === index
			)
		return faculties
	}, [allTables, selectedQualification])

	// Получаем направления в зависимости от выбранного факультета
	const availableDirections = useMemo(() => {
		let filtered = allTables

		if (selectedQualification) {
			filtered = filtered.filter(
				table => table.educationLevel === selectedQualification
			)
		}

		if (selectedFaculty) {
			filtered = filtered.filter(table => table.faculty === selectedFaculty)
		}

		const directions = filtered
			.map(table => table.name)
			.filter((name, index, arr) => name && arr.indexOf(name) === index)
		return directions
	}, [allTables, selectedQualification, selectedFaculty])

	// Фильтрованные таблицы на основе всех фильтров
	const filteredTables = useMemo(() => {
		let filtered = allTables

		// Фильтр по уровню образования
		if (selectedLevel) {
			filtered = filtered.filter(
				table => table.educationLevel === selectedLevel
			)
		}

		// Фильтр по степени квалификации
		if (selectedQualification) {
			filtered = filtered.filter(
				table => table.educationLevel === selectedQualification
			)
		}

		// Фильтр по факультету
		if (selectedFaculty) {
			filtered = filtered.filter(table => table.faculty === selectedFaculty)
		}

		// Фильтр по направлению
		if (selectedDirection) {
			filtered = filtered.filter(table => table.name === selectedDirection)
		}

		return filtered
	}, [
		selectedLevel,
		selectedQualification,
		selectedFaculty,
		selectedDirection,
		allTables,
	])

	// Проверяем, выбраны ли все необходимые фильтры
	const areAllFiltersSelected =
		selectedQualification && selectedFaculty && selectedDirection

	// Обработчики изменения фильтров
	const handleQualificationChange = (value: string) => {
		setSelectedQualification(value)
		setSelectedFaculty('')
		setSelectedDirection('')
	}

	const handleFacultyChange = (value: string) => {
		setSelectedFaculty(value)
		setSelectedDirection('')
	}

	const handleDirectionChange = (value: string) => {
		setSelectedDirection(value)
	}

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
			{table.educationLevel && (
				<div className='university-table-level'>{table.educationLevel}</div>
			)}

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

			{/* Фильтры */}

			{/* Дополнительные фильтры */}
			<div className='university-tables-advanced-filters'>
				<div className='filter-group'>
					<label className='filter-label'>Степень квалификации:</label>
					<select
						value={selectedQualification}
						onChange={e => handleQualificationChange(e.target.value)}
						className='university-tables-filter-select'
					>
						<option value=''>Все степени</option>
						{qualifications.map(qual => (
							<option key={qual} value={qual}>
								{qual}
							</option>
						))}
					</select>
				</div>

				<div className='filter-group'>
					<label className='filter-label'>Факультет:</label>
					<select
						value={selectedFaculty}
						onChange={e => handleFacultyChange(e.target.value)}
						className='university-tables-filter-select'
						disabled={!selectedQualification}
					>
						<option value=''>Все факультеты</option>
						{availableFaculties.map(faculty => (
							<option key={faculty} value={faculty}>
								{faculty}
							</option>
						))}
					</select>
				</div>

				<div className='filter-group'>
					<label className='filter-label'>Направление:</label>
					<select
						value={selectedDirection}
						onChange={e => handleDirectionChange(e.target.value)}
						className='university-tables-filter-select'
						disabled={!selectedFaculty}
					>
						<option value=''>Все направления</option>
						{availableDirections.map(direction => (
							<option key={direction} value={direction}>
								{direction}
							</option>
						))}
					</select>
				</div>
			</div>
			{/* Информация о фильтрах */}

			{/* Сетка карточек - показываем только если выбраны все фильтры */}
			{areAllFiltersSelected && (
				<div className='university-tables-grid'>
					{filteredTables.map((table, index) => (
						<TableCard key={`${table.file}-${index}`} table={table} />
					))}
				</div>
			)}
		</div>
	)
}

export default UniversityTables
