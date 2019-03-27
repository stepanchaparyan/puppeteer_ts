import { expect } from 'chai';
import launchPuppeteer from '../settings/launchPuppeteer';
import BotSection from '../src/botSection/botSectionPage';
import LoginPage from '../src/loginSection/loginPage';
import { DASHBOARD } from '../src/dashboardSection/dashboardConstants';
import { BOT_SECTION } from '../src/botSection/botsSectionConstants';
import Utils from '../src/helpers/utils';
import * as puppeteerSettings from '../settings/puppeteerSettings';
import { SIDEMENU } from '../src/sideMenuSection/sideMenuConstants';

let browser: any, page: any, loginPage: any, botSection: any, utils: any;

describe.only('Bot section', () => {
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

	context('Open Dashboard page', () => {
		it('C284 - Check the Dashboard page opens after Login', async () => {
			expect(await botSection.getDefaultSectionTitle()).to.equal('Dashboard');
			expect(await botSection.getDefaultSectionURL()).to.equal('dashboard');
			expect(await botSection.checkDashboardSectionIsActive()).to.equal(true);
		});
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

	context('Delete Bots', () => {
		it('C6163 - Check the "Delete Flow Bot" (not trained) functionality', async () => {
			// create bot and check that bot is created
			await utils.createFlowBot('C6163');
			expect(await utils.botIsExist('C6163')).to.equal(true, 'C6163 Bot is not exist, create process failed');
			// click on No button on delete FlowBot Modal and check that bot is not deleted
			await botSection.clickOnNoButtonOnDeleteModal('C6163');
			expect(await utils.botIsExist('C6163')).to.equal(true, 'C6163 Bot is not exist');
			// delete bot and check that bot is deleted
			await utils.deleteBot('C6163');
			expect(await utils.botIsExist('C6163')).to.equal(false, 'C6163 bot did not delete');
		});
		it('C6164 - Check the `Delete Flow Bot` (trained) functionality', async () => {
			// create bot and check that bot is created
			await utils.createFlowBot('C6164');
			expect(await utils.botIsExist('C6164')).to.equal(true, 'C6164 Bot is not exist, create process failed');
			// train bot and check that bot is trained
			await utils.trainBot();
			expect(await utils.botIsTrained('C6164')).to.equal(true, 'C6164 Bot is not trained, train process failed, or you have other not trained bot with same name');
			// chack that delete button is disabled
			expect(await botSection.checkDeleteButtonIsDisableOrNo('C6164')).to.equal(true, 'C6164, delete button is not disabled');
			// write wrong word in delete input and check that delete button still disabled
			await botSection.writeWrongWordInBotDeleteInput('del');
			expect(await botSection.checkDeleteButtonIsDisableOrNo('C6164')).to.equal(true, 'C6164, delete button is not disabled after writing wrong word ');
			// click on cancel button
			await botSection.clickOnCancelButtonOnTrainedBotDeleteModal();
			// check that bot is still exist
			expect(await utils.botIsExist('C6164')).to.equal(true);
			// delete bot and check that bot deleted
			await utils.deleteTrainedBot('C6164');
			expect(await utils.botIsExist('C6164')).to.equal(false, 'C6164 bot did not delete');
		});
		it('C6165 - Check the "Delete NLP Bot" (not trained) functionality', async () => {
			// create bot and check that bot is created
			await utils.createNLPBot('C6165');
			expect(await utils.botIsExist('C6165')).to.equal(true, 'C6165 Bot is not exist, create process failed');
			// click on No button on delete FlowBot Modal and check that bot is not deleted
			await botSection.clickOnNoButtonOnDeleteModal('C6165');
			expect(await utils.botIsExist('C6165')).to.equal(true, 'C6165 Bot is not exist');
			// delete bot and check that bot deleted
			await utils.deleteBot('C6165');
			expect(await utils.botIsExist('C6165')).to.equal(false, 'C6165 bot did not delete');
		});
		it('C6166 - Check the `Delete NLP Bot` (trained) functionality', async () => {
			// create bot and check that bot is created
			await utils.createNLPBot('C6166');
			expect(await utils.botIsExist('C6166')).to.equal(true, 'C6166 Bot is not exist, create process failed');
			// integrate bot with Google Home
			await utils.integrateBotToGoogle();
			// train bot and check that bot is trained
			await utils.trainBot();
			expect(await utils.botIsTrained('C6166')).to.equal(true, 'C6166 Bot is not trained, train process failed, or you have other not trained bot with same name');
			// check that delete button is disabled
			expect(await botSection.checkDeleteButtonIsDisableOrNo('C6166')).to.equal(true, 'C6166, delete button is not disabled');
			// write wrong word in delete input and check that delete button still disabled
			await botSection.writeWrongWordInBotDeleteInput('del');
			expect(await botSection.checkDeleteButtonIsDisableOrNo('C6166')).to.equal(true, 'C6166, delete button is not disabled after writing wrong word ');
			// click on cancel button
			await botSection.clickOnCancelButtonOnTrainedBotDeleteModal();
			// check that bot is still exist
			expect(await utils.botIsExist('C6166')).to.equal(true);
			// delete bot and check that bot deleted
			await utils.deleteTrainedBot('C6166');
			expect(await utils.botIsExist('C6166')).to.equal(false, 'C6166 bot did not delete');
		});
	});

	context('Get toaster about deleting Bots', () => {
		it('C6167 - Check that we get toaster about deleting not trained Flow bot', async () => {
			// create bot and check that bot is created
			await utils.createFlowBot('C6167');
			expect(await utils.botIsExist('C6167')).to.equal(true, 'C6167 Bot is not exist, create process failed');
			// delete bot and check that bot deleted
			await utils.deleteBot('C6167');
			expect(await botSection.waitAndGetTextFromNotification()).to.include('Successfully removed bot');
		});
		it('C6168 - Check that we get toaster about deleting trained Flow bot', async () => {
			// create bot and check that bot is created
			await utils.createFlowBot('C6168');
			expect(await utils.botIsExist('C6168')).to.equal(true, 'C6168 Bot is not exist, create process failed');
			// train bot and that bot is trained
			await utils.trainBot();
			expect(await utils.botIsTrained('C6168')).to.equal(true, 'C6168 Bot is not trained, train process failed, or you have other not trained bot with same name');
			// delete bot
			await utils.deleteTrainedBot('C6168');
			// check that we get the notification with expected text
			expect(await botSection.waitAndGetTextFromNotification()).to.include('Successfully removed bot');
		});
		it('C6169 - Check that we get toaster about deleting not trained NLP bot', async () => {
			// create bot and check that bot is created
			await utils.createNLPBot('C6169');
			expect(await utils.botIsExist('C6169')).to.equal(true, 'C6169 Bot is not exist, create process failed');
			// delete bot
			await utils.deleteBot('C6169');
			// check that we get notification with expected text
			expect(await botSection.waitAndGetTextFromNotification()).to.include('Successfully removed bot');
		});
		it('C6169_2 - Check that we get toaster about deleting not trained NLP bot', async () => {
			// create bot and check that bot is created
			await utils.createNLPBot('C6169');
			expect(await utils.botIsExist('C6169')).to.equal(true, 'C6169 Bot is not exist, create process failed');
			// delete bot
			await utils.deleteBot2('C6169');
			// check that we get notification with expected text
			expect(await botSection.waitAndGetTextFromNotification()).to.include('Successfully removed bot');
		});
		it('C6170 - Check that we get toaster about deleting trained NLP bot', async () => {
			// create bot and check that bot is created
			await utils.createNLPBot('C6170');
			expect(await utils.botIsExist('C6170')).to.equal(true, 'C6170 Bot is not exist, create process failed');
			// integrate bot with Google Home
			await utils.integrateBotToGoogle();
			// train bot and check that bot is trained
			await utils.trainBot();
			expect(await utils.botIsTrained('C6170')).to.equal(true, 'C6170 Bot is not trained, train process failed, or you have other not trained bot with same name');
			// delete bot
			await utils.deleteTrainedBot('C6170');
			// check that we get the notification with expected text
			expect(await botSection.waitAndGetTextFromNotification()).to.include('Successfully removed bot');
		});
	});

	context('Get text from alert and check', () => {
		it('C6171 - Check that we get correct text from alert when delete not trained Flow bot', async () => {
			// create bot and check that bot is created
			await utils.createFlowBot('C6171');
			expect(await utils.botIsExist('C6171')).to.equal(true, 'C6171 Bot is not exist, create process failed');
			// delete bot and get text from alert
			expect(await utils.deleteNotTrainedBotAndGetTextFromAlert('C6171')).to.equal('Are you sure that you want to delete this bot?');
		});
		it('C6172 - Check that we get correct text from alert when delete trained Flow bot', async () => {
			// create bot and check that bot is created
			await utils.createFlowBot('C6172');
			expect(await utils.botIsExist('C6172')).to.equal(true, 'C6172 Bot is not exist, create process failed');
			// train bot and that bot is trained
			await utils.trainBot();
			expect(await utils.botIsTrained('C6172')).to.equal(true, 'C6172 Bot is not trained, train process failed, or you have other not trained bot with same name');
			// delete bot and get text from alert
			expect(await utils.deleteTrainedBotAndGetTextFromAlert('C6172')).to.equal('This bot is deployed. If you delete it the deployed version will be deleted as well. Please type \'delete\' word if you really want to delete the bot.');
		});
		it('C6173 - Check that we get correct text from alert when delete not trained NLP bot', async () => {
			// create bot and check that bot is created
			await utils.createNLPBot('C6173');
			expect(await utils.botIsExist('C6173')).to.equal(true, 'C6173 Bot is not exist, create process failed');
			// delete bot and get text from alert
			expect(await utils.deleteNotTrainedBotAndGetTextFromAlert('C6173')).to.equal('Are you sure that you want to delete this bot?');
		});
		it('C6174 - Check that we get correct text from alert when delete trained NLP bot', async () => {
			// create bot and check that bot is created
			await utils.createNLPBot('C6174');
			expect(await utils.botIsExist('C6174')).to.equal(true, 'C6174 Bot is not exist, create process failed');
			// integrate bot with Google Home
			await utils.integrateBotToGoogle();
			// train bot and check that bot is trained
			await utils.trainBot();
			expect(await utils.botIsTrained('C6174')).to.equal(true, 'C6174 Bot is not trained, train process failed, or you have other not trained bot with same name');
			// delete bot and get text from alert
			expect(await utils.deleteTrainedBotAndGetTextFromAlert('C6174')).to.equal('This bot is deployed. If you delete it the deployed version will be deleted as well. Please type \'delete\' word if you really want to delete the bot.');
		});
	});

	context('Update Flow Bot', () => {
		it('C73 - Check "the Edit Bot" functionality', async () => {
			// create bot and check that bot is created
			await utils.createFlowBot('C73');
			expect(await utils.botIsExist('C73')).to.equal(true, 'C73 Bot is not exist, create process failed');
			// update Initial Question To FreeText Question
			await botSection.updateInitialQuestionToFreeTextQuestion();
			// get text from question field and check
			expect(await botSection.getTextFromFirstQuestion()).to.include('What is your name?');
		});
	});

	context.only('Delete integrated bot (Magento, Wordpress)', () => {
		it('C344 - Check the "Delete Bot" with Integration functionality', async () => {
			// create bot and check that bot is created
			await utils.createFlowBot('C344');
			expect(await utils.botIsExist('C344')).to.equal(true, 'C344 Bot is not exist, create process failed');
			// integrate Magento to bot
			await botSection.goToIntegratePage();
			await botSection.clickOnMagentoCheckbox();
			await botSection.clickOnLinkOnAlert();
			await botSection.generateKeyAndReturn();
			await utils.clickOnBotDeleteButton();
			await utils.clickOnBotDeleteButton();

		});
	});
});
