import { expect } from 'chai';
import launchPuppeteer from '../settings/launchPuppeteer';
import BotSection from '../src/botSection/botSectionPage';
import LoginPage from '../src/loginSection/loginPage';
import { DASHBOARD } from '../src/dashboardSection/dashboardConstants';
import Utils from '../src/helpers/utils';
import * as puppeteerSettings from '../settings/puppeteerSettings';

let browser: any, page: any, loginPage: any, botSection: any, utils: any;

describe('Bot section', () => {
	before(async () => {
		browser = await launchPuppeteer();
		page = await browser.newPage();
		await page.setViewport(puppeteerSettings.viewport);
		utils = new Utils(page);
		botSection = new BotSection(page);
		loginPage = new LoginPage(page);
		await loginPage.open();
		await loginPage.logIn();
	});
	after(async () => {
		await browser.close();
	});

	context('Create Flow Bot', () => {
		it('C282 - Check that when user creates more than 10 bots the website works as it was', async () => {
			// get Bots count before test
			const botsCountBefore = await botSection.getBotsCountFromDashboard(DASHBOARD.SELECTORS.BOTS_COUNT_TEXT);
			// create 10 bots
			await botSection.createFlowBot('testBotForC282', 10);
			// get Bots count after create 10 Bots
			const botsCountAfter = await botSection.getBotsCountFromDashboard(DASHBOARD.SELECTORS.BOTS_COUNT_TEXT);
			// delete created 10 unnecessory bot
			await botSection.deleteFlowBot('testBotForC282', 10);
			// check that we created just 10 new bots
			expect(await Number(botsCountAfter)).to.equal(Number(botsCountBefore) + 10);
		});
		it('C69 - Check the "Create Bot" functionality', async () => {
			// create 3 bots
			await botSection.createBotsWithLocationQuestion('C69', 3);
			// get and check that we have 3 bots with name 'C69'
			const botsCount = await utils.getBotCount('C69');
			expect(await Number(botsCount)).to.equal(3);
			// delete created 3 unnecessory bot
			await botSection.deleteFlowBot('C69', 3);
			// get and check that we delete created 3 bots
			const botsCountAfterDeleting = await utils.getBotCount('C69');	
			expect(await Number(botsCountAfterDeleting)).to.equal(0);			
		});
	});

	context('Open Dashboard page', () => {
		it('C284 - Check the Dashboard page opens after Login', async () => {
			expect(await botSection.getDefaultSectionTitle()).to.equal('Dashboard');
			expect(await botSection.getDefaultSectionURL()).to.equal('dashboard');
			expect(await botSection.checkDashboardSectionIsActive()).to.equal(true);
		});
	});

	context('Delete Flow Bot', () => {
		it('C6163 - Check the "Delete Flow Bot" (not trained) functionality', async () => {
			expect(await botSection.deleteNotTrainedFlowBot()).to.equal(true);
		});
		it('C6163 - Check the "Delete Flow Bot" (not trained) "cancel" functionality', async () => {
			expect(await botSection.cancelDeleteNotTrainedFlowBot()).to.equal(true);
		});
		it('C6163 - Check the "Delete Flow Bot" (not trained) functionality (notification)', async () => {
			expect(await botSection.deleteNotTrainedFlowBotNotification()).to.include('Successfully removed bot');
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
		it('C6164 - Check the `Delete Flow Bot` (trained) notification', async () => {
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

	context('Update Flow Bot', () => {
		it('T2252 Check "the Edit Bot" functionality', async () => {
			expect(await botSection.updateBot()).to.include('What is your name?');
		});

	});
});
