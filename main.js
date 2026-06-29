const { collectVacancies } = require('./src/services/parser.service');
const {
    buildCompanyStatistics,
    getTopCompanies,
    filterVacanciesByCompanies
} = require('./src/services/stats.service');
const { generateReport } = require('./src/services/excel.service');

async function start() {
    try {
        console.log('Запуск парсинга...');

        const vacancies = await collectVacancies();
        console.log(`Собрано вакансий: ${vacancies.length}`);

        const companies = buildCompanyStatistics(vacancies);
        const topCompanies = getTopCompanies(companies, 20);
        const filteredVacancies = filterVacanciesByCompanies(vacancies, topCompanies);

        console.log(`Уникальных компаний: ${companies.length}`);

        await generateReport(topCompanies, filteredVacancies);

        console.log('✅ Отчет успешно создан: hh_top_companies.xlsx');

    } catch (error) {
        console.error('Ошибка выполнения:', error.message);
    }
}

start();