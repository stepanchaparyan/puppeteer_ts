import launchPuppeteer from '../launchPuppeteer';
import { expect } from 'chai';
import CreateBot from '../src/pageObjects/createBotPO';
import LoginPage from '../src/pageObjects/loginPagePO';

let browser, page, loginPage, createBot;
const viewport = { width: 1020, height: 1080 };

describe('Simple Flow Bot', () => {
	before(async () => {
		browser = await launchPuppeteer();
		page = await browser.newPage();
		await page.setViewport(viewport);
		createBot = new CreateBot(page);
		loginPage = new LoginPage(page);
		await loginPage.open();
		await loginPage.logIn();
	});
	after(async () => {
		await browser.close();
	});
	context('Open Dashboard page', () => {
		it('C284 - Check the Dashboard page opens after Login', async () => {
			expect(await createBot.getDefaultDashboardSectionTitle()).to.equal('Dashboard');
			expect(await createBot.getDefaultDashboardSectionURL()).to.equal('https://app.iox.bot/dashboard');
			expect(await createBot.checkMenuBarUIDefault()).to.equal(true);
		});
	});
	context('Menu panel', () => {
		it('C426 - Check the Left side Menu panel styles state - Bots', async () => {
			expect(await createBot.getBotSectionTitle()).to.equal('Bots');
			expect(await createBot.getBotSectionURL()).to.equal('https://app.iox.bot/bots');
			expect(await createBot.checkMenuBarUIBotSelected()).to.equal(true);
		});
		it('C426 - Check the Left side Menu panel styles state - Dashboard', async () => {
			expect(await createBot.getDashboardSectionTitle()).to.equal('Dashboard');
			expect(await createBot.getDashboardSectionURL()).to.equal('https://app.iox.bot/dashboard');
			expect(await createBot.checkMenuBarUIDashboardSelected()).to.equal(true);
		});
		it('C426 - Check the Left side Menu panel styles state - Knowledge', async () => {
			expect(await createBot.getKnowledgeSectionTitle()).not.to.equal('Knowledge');
			expect(await createBot.getKnowledgeSectionURL()).not.to.equal('https://app.iox.bot/knowledge');
			expect(await createBot.checkMenuBarUIKnowledgeSelected()).to.equal(true);
		});
		it('C426 - Check the Left side Menu panel styles state - API Connector', async () => {
			expect(await createBot.getApiConnectorSectionTitle()).to.equal('Api Connector');
			expect(await createBot.getApiConnectorSectionURL()).to.equal('https://app.iox.bot/connector');
			expect(await createBot.checkMenuBarUIApiConnectorSelected()).to.equal(true);
		});
		it('C426 - Check the Left side Menu panel styles state - Help', async () => {
			expect(await createBot.getHelpSectionTitle()).to.equal('Help');
			expect(await createBot.getHelpSectionURL()).to.equal('https://app.iox.bot/help');
			expect(await createBot.checkMenuBarUIHelpSelected()).to.equal(true);
		});
	});
	context('Create Flow Bot', () => {
		it('C69 - Check the "Create Bot" functionality', async () => {
			expect(await createBot.createBot69()).to.equal(true);
		});
		it('C282 - Check that when user creates more than 10 bots the website works as it was', async () => {
			expect(await createBot.createBotsAndCheckCount()).to.equal(true);
		});
	});

	context('deleteBot', () => {
		it('delete testBotForC282', async () => {
			expect(await createBot.deleteBot('testBotForC282', 10)).to.equal(true);
		});
		it('delete testBot', async () => {
			expect(await createBot.deleteBot('testBotIA')).to.equal(true);
		});
		it('delete C69', async () => {
			expect(await createBot.deleteBot('C69', 3)).to.equal(true);
		});
	});
});
