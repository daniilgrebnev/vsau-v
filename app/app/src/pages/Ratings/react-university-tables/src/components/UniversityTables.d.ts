import { FC } from 'react';

export interface TableData {
  name: string;
  faculty: string;
  file: string;
}

export interface UniversityTablesProps {
  /** Базовый URL к папке с HTML файлами */
  baseUrl?: string;
  /** Заголовок компонента */
  title?: string;
  /** Подзаголовок */
  subtitle?: string;
  /** Кастомные данные таблиц (опционально) */
  customTables?: TableData[];
  /** Callback при клике на карточку */
  onTableClick?: (table: TableData) => void;
  /** CSS класс для контейнера */
  className?: string;
}

declare const UniversityTables: FC<UniversityTablesProps>;

export default UniversityTables;
