const ExcelJS = require('exceljs');

async function generateReport(companies, vacancies) {
    const workbook = new ExcelJS.Workbook();

    createCompaniesSheet(workbook, companies);
    createVacanciesSheet(workbook, vacancies);

    await workbook.xlsx.writeFile('hh_top_companies.xlsx');
}

function createCompaniesSheet(workbook, companies) {
    const sheet = workbook.addWorksheet('Компании');

    sheet.columns = [
        { header: 'Компания', key: 'name', width: 50 },
        { header: 'Количество вакансий', key: 'vacanciesCount', width: 25 }
    ];

    sheet.addRows(companies);
}

function createVacanciesSheet(workbook, vacancies) {
    const sheet = workbook.addWorksheet('Вакансии');

    sheet.columns = [
        { header: 'Название', key: 'title', width: 50 },
        { header: 'Компания', key: 'company', width: 30 },
        { header: 'Зарплата', key: 'salary', width: 25 },
        { header: 'Ссылка', key: 'link', width: 40 }
    ];

    sheet.addRows(vacancies);
}

module.exports = { generateReport };