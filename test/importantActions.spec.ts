import { expect } from 'chai';
import launchPuppeteer from '../launchPuppeteer';
import FlowBot from '../src/importantActions/importantActionsPO';
import LoginPage from '../src/loginSection/loginPage';

let browser;
let page;
let loginPage;
let flowBot;
const viewport = { width: 1020, height: 1080 };

describe('Important Actions', () => {
	before(async () => {
		browser = await launchPuppeteer();
		page = await browser.newPage();
		await page.setViewport(viewport);
		flowBot = new FlowBot(page);
		loginPage = new LoginPage(page);
		await loginPage.open();
		await loginPage.logIn();
	});
	after(async () => {
		await browser.close();
	});

	context('Flow Bot', () => {
		it('Create long flow bot', async () => {
			expect(await flowBot.createBotByImportantActionDoc()).to.equal(true);
		});
	});
});
