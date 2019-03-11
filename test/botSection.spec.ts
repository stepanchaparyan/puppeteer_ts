import { expect } from 'chai';
import launchPuppeteer from '../launchPuppeteer';
import BotSection from '../src/pageObjects/botSectionPO';
import LoginPage from '../src/pageObjects/loginPagePO';

let browser;
let page;
let loginPage;
let botSection;
const viewport = { width: 920, height: 1080 };

describe('Bot section', () => {
	before(async () => {
		browser = await launchPuppeteer();
		page = await browser.newPage();
		await page.setViewport(viewport);
		botSection = new BotSection(page);
		loginPage = new LoginPage(page);
		await loginPage.open();
		await loginPage.logIn();
	});
	after(async () => {
		await browser.close();
	});
	context('Open Dashboard page', () => {
		it('C284 - Check the Dashboard page opens after Login', async () => {
			expect(await botSection.getDefaultDashboardSectionTitle()).to.equal('Dashboard');
			expect(await botSection.getDefaultDashboardSectionURL()).to.equal('https://app.iox.bot/dashboard');
			expect(await botSection.checkMenuBarUIDefault()).to.equal(true);
		});
	});
	context('Menu panel', () => {
		it('C426 - Check the Left side Menu panel styles state - Bots', async () => {
			expect(await botSection.getBotSectionTitle()).to.equal('Bots');
			expect(await botSection.getBotSectionURL()).to.equal('https://app.iox.bot/bots');
			expect(await botSection.checkMenuBarUIBotSelected()).to.equal(true);
		});
		it('C426 - Check the Left side Menu panel styles state - Dashboard', async () => {
			expect(await botSection.getDashboardSectionTitle()).to.equal('Dashboard');
			expect(await botSection.getDashboardSectionURL()).to.equal('https://app.iox.bot/dashboard');
			expect(await botSection.checkMenuBarUIDashboardSelected()).to.equal(true);
		});
		it('C426 - Check the Left side Menu panel styles state - Knowledge', async () => {
			expect(await botSection.getKnowledgeSectionTitle()).not.to.equal('Knowledge');
			expect(await botSection.getKnowledgeSectionURL()).not.to.equal('https://app.iox.bot/knowledge');
			expect(await botSection.checkMenuBarUIKnowledgeSelected()).to.equal(true);
		});
		it('C426 - Check the Left side Menu panel styles state - API Connector', async () => {
			expect(await botSection.getApiConnectorSectionTitle()).to.equal('Api Connector');
			expect(await botSection.getApiConnectorSectionURL()).to.equal('https://app.iox.bot/connector');
			expect(await botSection.checkMenuBarUIApiConnectorSelected()).to.equal(true);
		});
		it('C426 - Check the Left side Menu panel styles state - Help', async () => {
			expect(await botSection.getHelpSectionTitle()).to.equal('Help');
			expect(await botSection.getHelpSectionURL()).to.equal('https://app.iox.bot/help');
			expect(await botSection.checkMenuBarUIHelpSelected()).to.equal(true);
		});
	});
	context('Create Flow Bot', () => {
		it('C69 - Check the "Create Bot" functionality', async () => {
			expect(await botSection.createBots()).to.equal(true);
		});
		it('C282 - Check that when user creates more than 10 bots the website works as it was', async () => {
			expect(await botSection.createBotsAndCheckCount()).to.equal(true);
		});
	});

	context('Delete Flow Bot', function () {
		it('C6163 - Check the "Delete Flow Bot" (not trained) functionality', async () => {
			expect(await botSection.deleteNotTrainedFlowBot()).to.equal(true);
		});
		it('C6163 - Check the "Delete Flow Bot" (not trained) "cancel" functionality', async () => {
			expect(await botSection.cancelDeleteNotTrainedFlowBot()).to.equal(true);
		});
		it('C6163 - Check the "Delete Flow Bot" (not trained) functionality (notification)', async () => {
			expect(await botSection.deleteNotTrainedFlowBotNotificationIsVisible()).to.equal(true);
		});
		it('C6164 - Check the `Delete Flow Bot` (trained) buttonDisabled functionality', async () => {
			expect(await botSection.deleteTrainedFlowBotButtonDisabled()).to.equal(true);
		});
		it('C6164 - Check the `Delete Flow Bot` (trained) cancel functionality', async () => {
			expect(await botSection.deleteTrainedFlowBotCancel()).to.equal(true);
		});
		it('C6164 - Check the `Delete Flow Bot` (trained) delete functionality', async () => {
			expect(await botSection.deleteTrainedFlowBot()).to.equal(true);
		});
	});

	context.only('Delete NLP Bot', function () {
		it('C6165 - Check the "Delete NLP Bot" (not trained) functionality', async () => {
			expect(await botSection.deleteNotTrainedNLPBot()).to.equal(true);
		});
		it('C6165 - Check the "Delete NLP Bot" (not trained) "cancel" functionality', async () => {
			expect(await botSection.cancelDeleteNotTrainedNLPBot()).to.equal(true);
		});
		it('C6165 - Check the "Delete NLP Bot" (not trained) functionality (notification)', async () => {
			expect(await botSection.deleteNotTrainedNLPBotNotificationIsVisible()).to.equal(true);
		});
		it.only('C6166 - Check the `Delete NLP Bot` (trained) buttonDisabled functionality', async () => {
			expect(await botSection.deleteTrainedNLPBotButtonDisabled()).to.equal(true);
		});
		it('C6166 - Check the `Delete NLP Bot` (trained) cancel functionality', async () => {
			expect(await botSection.deleteTrainedNLPBotCancel()).to.equal(true);
		});
		it('C6166 - Check the `Delete NLP Bot` (trained) delete functionality', async () => {
			expect(await botSection.deleteTrainedNLPBot()).to.equal(true);
		});
	});
	context('deleteBot', () => {
		it('delete testBotForC282', async () => {
			expect(await botSection.deleteBot('testBotForC282', 10)).to.equal(true);
		});
		it('delete testBot', async () => {
			expect(await botSection.deleteBot('testBotIA')).to.equal(true);
		});
		it('delete C69', async () => {
			expect(await botSection.deleteBot('C69', 3)).to.equal(true);
		});
	});
});
