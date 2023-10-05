import puppeteer from 'puppeteer';

var timestamp = new Date().toISOString();
const trelloUrl = 'https://trello.com/b/QvHVksDa/personal-work-goals';
const username = 'manoel.balam@gmail.com';
const password = 'm4n03l#B4l4m';
const todoistLoginUrl = 'https://todoist.com/auth/login?success_page';
const todoistTitle = 'div > div > form > div.task_editor__editing_area > div.task_editor__input_fields > div.task_editor__content_field.no-focus-marker.task_editor__content_field--large-text > div > div > div > div > p';

async function startBrowser() {
    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();
    return { browser, page };
}

async function closeBrowser(browser) {
    return browser.close();
}

async function save_todoist_taks(goals) {
    const { browser, page } = await startBrowser();
    console.log('Going into todoist.com');
    await page.goto(todoistLoginUrl);
    await page.waitForSelector('input[type="email"]');
    await page.type('input[type="email"]', username);
    await page.type('input[type="password"]', password);
    console.log('Logging into todoist.com');
    await page.click('button[type="submit"]');
    await page.waitForTimeout(9100);
    console.log('todoist.com dashboard loaded successfully');
    for (let i = 0; i < goals.length; i++) {
        await page.waitForTimeout(100);
        await page.click('button[id="quick_add_task_holder"]');
        await page.waitForTimeout(50);

        await page.type(todoistTitle, goals[i]);
        await page.waitForTimeout(50);

        await page.type('div[class="tiptap ProseMirror"]', timestamp);
        await page.waitForTimeout(100);
        await page.click('button[type="submit"]');
        await page.waitForTimeout(100);
        console.log('Saving Todoist task: ' + goals[i]);
    }
    closeBrowser(browser);
    console.log(goals.length + ' Tasks saved successfully!');
}

async function init(limit = 1) {
    const { browser, page } = await startBrowser();
    console.log('Going to Trello');
    await page.goto(trelloUrl);
    console.log('Loading Random Trello Goals');
    const goals_pool = await page.$$('.list-card-title');
    const goals = new Array();
    for (let i = 0; i < limit; i++) {
        var random_id = Math.floor(Math.random() * goals_pool.length);
        const title = await page.evaluate(element => element.textContent, goals_pool[random_id]);
        goals.push(title);
    }
    console.log('Goals Loaded');
    closeBrowser(browser);
    save_todoist_taks(goals);
}

init(5);