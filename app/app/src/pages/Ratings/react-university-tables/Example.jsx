import React from 'react';
import UniversityTables from './src/components/UniversityTables';

// Пример 1: Базовое использование
const BasicExample = () => {
  return (
    <div>
      <UniversityTables />
    </div>
  );
};

// Пример 2: С кастомными настройками
const CustomExample = () => {
  return (
    <div>
      <UniversityTables 
        baseUrl="/public/tables/"
        title="Списки поступающих 2025"
        subtitle="Воронежский ГАУ"
      />
    </div>
  );
};

// Пример 3: В составе большого приложения
const AppExample = () => {
  return (
    <div className="app">
      <header>
        <h1>Приемная комиссия</h1>
      </header>
      
      <main>
        <section className="admission-section">
          <UniversityTables 
            baseUrl="/assets/admission-tables/"
            title="Актуальные списки поступающих"
          />
        </section>
      </main>
      
      <footer>
        <p>© 2025 ВГАУ</p>
      </footer>
    </div>
  );
};

export { BasicExample, CustomExample, AppExample };
export default BasicExample;
