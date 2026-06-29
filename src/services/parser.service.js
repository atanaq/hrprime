const { chromium } = require('playwright');

const BASE_URL = 'https://hh.ru/search/vacancy?area=113&page=';
const MAX_PAGES = 5;

async function collectVacancies() {
    const browser = await chromium.launch({ headless: true });
    const context = await browser.newContext();
    const page = await context.newPage();

    const allVacancies = [];

    for (let pageIndex = 0; pageIndex < MAX_PAGES; pageIndex++) {
        const url = `${BASE_URL}${pageIndex}`;
        await page.goto(url, { waitUntil: 'domcontentloaded' });

        try {
            await page.waitForSelector('[data-qa="vacancy-serp__vacancy"]', { timeout: 10000 });

            const vacanciesFromPage = await page.$$eval(
                '[data-qa="vacancy-serp__vacancy"]',
                nodes => nodes.map(node => ({
                    title: node.querySelector('[data-qa="serp-item__title-text"]')?.textContent?.trim() ?? 'Без названия',
                    company: node.querySelector('[data-qa="vacancy-serp__vacancy-employer-text"]')?.textContent?.trim() ?? 'Неизвестно',
                    salary: node.querySelector('[data-qa="vacancy-salary"]')?.textContent?.replace(/\s+/g, ' ').trim() ?? 'Не указана',
                    link: node.querySelector('[data-qa="serp-item__title"]')?.href ?? ''
                }))
            );

            allVacancies.push(...vacanciesFromPage);
            console.log(`Страница ${pageIndex + 1}: +${vacanciesFromPage.length}`);

        } catch {
            console.warn(`Страница ${pageIndex + 1} не загрузилась`);
        }

        await page.waitForTimeout(2000);
    }

    await browser.close();
    return allVacancies;
}

module.exports = { collectVacancies };