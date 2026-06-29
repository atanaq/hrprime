function buildCompanyStatistics(vacancies) {
    const counter = new Map();

    vacancies.forEach(({ company }) => {
        counter.set(company, (counter.get(company) || 0) + 1);
    });

    return Array.from(counter.entries()).map(([name, count]) => ({
        name,
        vacanciesCount: count
    }));
}

function getTopCompanies(companies, limit = 20) {
    return [...companies]
        .sort((a, b) => b.vacanciesCount - a.vacanciesCount)
        .slice(0, limit);
}

function filterVacanciesByCompanies(vacancies, companies) {
    const allowed = new Set(companies.map(c => c.name.toLowerCase()));

    return vacancies.filter(v =>
        allowed.has(v.company.toLowerCase())
    );
}

module.exports = {
    buildCompanyStatistics,
    getTopCompanies,
    filterVacanciesByCompanies
};