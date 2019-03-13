import { expect } from 'chai';
import launchPuppeteer from '../launchPuppeteer';
import BotSection from '../src/pageObjects/botSectionPO';
import LoginPage from '../src/pageObjects/loginPagePO';
import Utils from '../src/helpers/utils';

let browser;
let page;
let loginPage;
let botSection;
let utils;

const viewport = { width: 920, height: 1080 };

describe.only('Bot section', () => {
	before(async () => {
		browser = await launchPuppeteer();
		page = await browser.newPage();
		await page.setViewport(viewport);
		botSection = new BotSection(page);
		loginPage = new LoginPage(page);
		utils = new Utils(page);
		await loginPage.open();
		await loginPage.logIn();
	});
	after(async () => {
		await browser.close();
	});

	context('Create Flow Bot', () => {
		it('C69 - Check the "Create Bot" functionality', async () => {
			expect(await botSection.createBots()).to.equal(true);
		});
		it('C282 - Check that when user creates more than 10 bots the website works as it was', async () => {
			expect(await botSection.createBotsAndCheckCount()).to.equal(true);
		});
	});

	context('Open Dashboard page', () => {
		it('C284 - Check the Dashboard page opens after Login', async () => {
			expect(await botSection.getDefaultSectionTitle()).to.equal('Dashboard');
			expect(await botSection.getDefaultSectionURL()).to.equal('bot');
			expect(await botSection.checkDashboardSectionIsActive()).to.equal(true);
		});
	});

	context('Menu panel', () => {
		it('C426 - Check the Left side Menu panel styles state - Bots', async () => {
			expect(await botSection.getBotSectionTitle()).to.equal('Bots');
			expect(await botSection.getBotSectionURL()).to.equal('bots');
			expect(await botSection.getBotSectionIconText()).to.equal('Bots\n');
		});
		it('C426 - Check the Left side Menu panel styles state - Dashboard', async () => {
			expect(await botSection.getDashboardSectionTitle()).to.equal('Dashboard');
			expect(await botSection.getDashboardSectionURL()).to.equal('dashboard');
			expect(await botSection.getDashboardSectionIconText()).to.equal('Dashboard\n');
		});
		it('C426 - Check the Left side Menu panel styles state - Knowledge', async () => {
			expect(await botSection.getKnowledgeSectionTitle()).not.to.equal('Knowledge');
			expect(await botSection.getKnowledgeSectionURL()).not.to.equal('knowledge');
			expect(await botSection.getKnowledgeSectionIconText()).to.equal('Knowledge\n');
			expect(await botSection.knowledgeSectionIsDisbled()).to.equal(true);
		});
		it('C426 - Check the Left side Menu panel styles state - API Connector', async () => {
			expect(await botSection.getApiConnectorSectionTitle()).to.equal('Api Connector');
			expect(await botSection.getApiConnectorSectionURL()).to.equal('connector');
			expect(await botSection.getApiConnectorSectionIconText()).to.equal('API Connector\n');
		});
		it('C426 - Check the Left side Menu panel styles state - Help', async () => {
			expect(await botSection.getHelpSectionTitle()).to.equal('Help');
			expect(await botSection.getHelpSectionURL()).to.equal('help');
			expect(await botSection.getHelpSectionIconText()).to.equal('Help\n');
		});
	});

	context('Delete Flow Bot', function() {
		it('C6163 - Check the "Delete Flow Bot" (not trained) functionality', async () => {
			expect(await botSection.deleteNotTrainedFlowBot()).to.equal(true);
		});
		it('C6163 - Check the "Delete Flow Bot" (not trained) "cancel" functionality', async () => {
			expect(await botSection.cancelDeleteNotTrainedFlowBot()).to.equal(true);
		});
		it('C6163 - Check the "Delete Flow Bot" (not trained) functionality (notification)', async () => {
			expect(await botSection.deleteNotTrainedFlowBotNotification()).to.include('Successfully removed bot');
		});
		it.skip('C6164 - Check the `Delete Flow Bot` (trained) buttonDisabled functionality', async () => {
			expect(await botSection.deleteTrainedFlowBotButtonDisabled()).to.equal(true);
		});
		it.skip('C6164 - Check the `Delete Flow Bot` (trained) cancel functionality', async () => {
			expect(await botSection.deleteTrainedFlowBotCancel()).to.equal(true);
		});
		it.skip('C6164 - Check the `Delete Flow Bot` (trained) delete functionality', async () => {
			expect(await botSection.deleteTrainedFlowBot()).to.equal(true);
		});
		it.skip('C6164 - Check the `Delete Flow Bot` (trained) notification', async () => {
			expect(await botSection.deleteTrainedFlowBotNotification()).to.include('Successfully removed bot');
		});
	});

	context('Delete NLP Bot', function() {
		it('C6165 - Check the "Delete NLP Bot" (not trained) functionality', async () => {
			expect(await botSection.deleteNotTrainedNLPBot()).to.equal(true);
		});
		it('C6165 - Check the "Delete NLP Bot" (not trained) "cancel" functionality', async () => {
			expect(await botSection.cancelDeleteNotTrainedNLPBot()).to.equal(true);
		});
		it('C6165 - Check the "Delete NLP Bot" (not trained) functionality (notification)', async () => {
			expect(await botSection.deleteNotTrainedNLPBotNotification()).to.include('Successfully removed bot');
		});
		it('C6166 - Check the `Delete NLP Bot` (trained) buttonDisabled functionality', async () => {
			expect(await botSection.deleteTrainedNLPBotButtonDisabled()).to.equal(true);
		});
		it('C6166 - Check the `Delete NLP Bot` (trained) cancel functionality', async () => {
			expect(await botSection.deleteTrainedNLPBotCancel()).to.equal(true);
		});
		it('C6166 - Check the `Delete NLP Bot` (trained) delete functionality', async () => {
			expect(await botSection.deleteTrainedNLPBot()).to.equal(true);
		});
		it('C6166 - Check the `Delete NLP Bot` (trained) notification', async () => {
			expect(await botSection.deleteTrainedNLPBotNotification()).to.include('Successfully removed bot');
		});
	});

});
