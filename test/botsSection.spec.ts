import { expect } from 'chai';
import launchPuppeteer from '../launchPuppeteer';
import BotSection from '../src/botSection/botSectionPage';
import LoginPage from '../src/loginSection/loginPage';

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

	context('Create Flow Bot', () => {
		it('C282 - Check that when user creates more than 10 bots the website works as it was', async () => {
			expect(await botSection.createBotsAndCheckCount()).to.equal(true);
		});
		it('C69 - Check the "Create Bot" functionality', async () => {
			expect(await botSection.createBots()).to.equal(true);
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
