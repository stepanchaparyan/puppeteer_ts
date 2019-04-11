import { expect } from 'chai';
import launchPuppeteer from '../settings/launchPuppeteer';
import BotSection from '../src/botSection/botSectionPage';
import LoginPage from '../src/loginSection/loginPage';
import { DASHBOARD } from '../src/dashboardSection/dashboardConstants';
import { BOT_SECTION } from '../src/botSection/botsSectionConstants';
import Utils from '../src/helpers/utils';
import * as puppeteerSettings from '../settings/puppeteerSettings';
//import TestRailAPI from '../src/helpers/TestRailAPI';
import * as args from 'minimist';
import * as TestRailAPI from '@stepanchaparyan/testrailapi';
import * as testRailCreds from '../settings/testRailSettings';

let browser: any, page: any, loginPage: any, botSection: any, utils: any;
let testRailApi: any, runID:number, caseID:any;;
const argv = args(process.argv.slice(2));
const runWithTestRail = argv._[1] === 'TestRail' ? true : false;

describe.only('Bot section', () => {
	before(async () => {
		browser = await launchPuppeteer();
		page = await browser.newPage();
		await page.setViewport(puppeteerSettings.viewport);
		utils = new Utils(page);
		botSection = new BotSection(page);
		loginPage = new LoginPage(page);
		testRailApi = new TestRailAPI(testRailCreds.host,testRailCreds.username, testRailCreds.password);
		await loginPage.open();
		await loginPage.logIn();
		if (runWithTestRail) {
			runID = await testRailApi.addRunWithType(1,3);
		}
	});
	after(async () => {
		await browser.close();
	});
	// beforeEach(async () => {
	// 	await utils.reload();
	// });

	afterEach(async () => {
		if (runWithTestRail) {
			if (await testRailApi.getResultForCase(runID,caseID) !== 1) {
				await testRailApi.addResultForCase(runID,caseID,5);
			}
		}
	});

	context('Create Run on TestRail', () => {
		it('Simple tests', async () => {
			//console.log(await testRailApi.addRun(1));
			//console.log(await testRailApi.getResultsForRun(545,3));
			//console.log(await testRailApi.getResultForCase(545,32));
			//runId = await testRailApi.addRunWithType(1,3);
			//console.log('00 ', id);
		});
	});

	context.only('Open Dashboard page', () => {
		it(`C32  284 - Check the Dashboard page opens after Login`, async function () {
			// get test ID
			caseID = this.test.title.substr(1,3).trim();
			// run tests
			expect(await botSection.getDefaultSectionTitle()).to.equal('Dashboard');
			expect(await botSection.getDefaultSectionURL()).to.equal('dashboard');
			expect(await botSection.checkDashboardSectionIsActive()).to.equal(true);
			// update TestRail
			if (runWithTestRail) {
				await testRailApi.addResultForCase(runID,caseID,1);
			}
		});
	});

	context('Open Dashboard page', () => {
		it.only(`C34 284 - Check the Dashboard page opens after Login`, async function () {
			// get test ID
			caseID = this.test.title.substr(1,3).trim();
			// run tests
			expect(await botSection.getDefaultSectionTitle()).to.equal('Dashboard');
			expect(await botSection.getDefaultSectionURL()).to.equal('dashboard');
			expect(await botSection.checkDashboardSectionIsActive()).to.equal(true);
			// update TestRail
			if (runWithTestRail) {
				await testRailApi.addResultForCase(runID,caseID,1);
			}	
		});
		it.only(`C35 284 - Check the Dashboard page opens after Login`, async function () {
			// get test ID
			caseID = this.test.title.substr(1,3).trim();
			// run tests
			expect(await botSection.getDefaultSectionTitle()).to.equal('kDashboard');
			expect(await botSection.getDefaultSectionURL()).to.equal('dashboard');
			expect(await botSection.checkDashboardSectionIsActive()).to.equal(true);
			// update TestRail
			if (runWithTestRail) {
				await testRailApi.addResultForCase(runID,caseID,1);
			}	
		});
	});

	context('Open Dashboard page', () => {
		it('C33 284 - Check the Dashboard page opens after Login', async () => {
		try {
			expect(await botSection.getDefaultSectionTitle()).to.equal('Dashboard');
			expect(await botSection.getDefaultSectionURL()).to.equal('kdashboard');
			expect(await botSection.checkDashboardSectionIsActive()).to.equal(true);
			await testRailApi.addResultForCase(runID,33,1);
		} catch (err) {
			await testRailApi.addResultForCase(runID,33,5,String(err));
			throw err;
		}
		});
	});

	context('Create Flow Bot', () => {
		it('C33 282 - Check that when user creates more than 10 bots the website works as it was', async () => {
			// get Bots count before test
			const botsCountBefore = await botSection.getBotsCountFromDashboard(DASHBOARD.SELECTORS.BOTS_COUNT_TEXT);
			// create 10 bots
			await botSection.createFlowBots('testBotForC282', 10);
			// get Bots count after create 10 Bots
			const botsCountAfter = await botSection.getBotsCountFromDashboard(DASHBOARD.SELECTORS.BOTS_COUNT_TEXT);
			// delete created 10 unnecessory bot
			await botSection.deleteFlowBots('testBotForC282', 10);
			// check that we created just 10 new bots
			expect(await Number(botsCountAfter)).to.equal(Number(botsCountBefore) + 10);
		});
		it('C34 69 - Check the "Create Bot" functionality', async () => {
			// create 3 bots
			await botSection.createBotsWithLocationQuestion('C69', 3);
			// get and check that we have 3 bots with name 'C69'
			const botsCount = await botSection.getBotCount('C69');
			expect(await Number(botsCount)).to.equal(3);
			// delete created 3 unnecessory bot
			await botSection.deleteFlowBots('C69', 3);
			// get and check that we delete created 3 bots
			const botsCountAfterDeleting = await botSection.getBotCount('C69');
			expect(await Number(botsCountAfterDeleting)).to.equal(0);
		});
	});

	context('Delete Bots', () => {
		it('C35 6163 - Check the "Delete Flow Bot" (not trained) functionality', async () => {
		try {
			// create bot and check that bot is created
			await botSection.createFlowBot('C6163');
			expect(await botSection.botIsExist('C6163')).to.equal(true, 'C6163 Bot is not exist');
			// click on No button on delete FlowBot Modal and check that bot is not deleted
			await botSection.clickOnNoButtonOnDeleteModal('C6163');
			expect(await botSection.botIsExist('C6163')).to.equal(true, 'C6163 Bot is not exist');
			// delete bot and check that bot is deleted
			await botSection.deleteBot('C6163');
			expect(await botSection.botIsExist('C6163')).to.equal(false, 'C6163 bot did not delete');
			await testRailApi.addResultForCase(runID,35,1);
		} catch (err) {
			await testRailApi.addResultForCase(runID,35,5,String(err));
			throw err;
		}
		});
		it('C36 6164 - Check the `Delete Flow Bot` (trained) functionality', async () => {
			// create bot and check that bot is created
			await botSection.createFlowBot('C6164');
			expect(await botSection.botIsExist('C6164')).to.equal(true, 'C6164 Bot is not exist, create process failed');
			// train bot and check that bot is trained
			await botSection.trainBot('C6164');
			expect(await botSection.botIsTrained('C6164')).to.equal(true, 'C6164 Bot is not trained, train process failed, or you have other not trained bot with same name');
			// chack that delete button is disabled
			expect(await botSection.checkDeleteButtonIsDisableOrNo('C6164')).to.equal(true, 'C6164, delete button is not disabled');
			// write wrong word in delete input and check that delete button still disabled
			await botSection.writeWrongWordInBotDeleteInput('del');
			expect(await botSection.checkDeleteButtonIsDisableOrNoAfterWrongWord()).to.equal(true, 'C6164, delete button is not disabled after writing wrong word ');
			// click on cancel button
			await botSection.clickOnCancelButtonOnTrainedBotDeleteModal();
			// check that bot is still exist
			expect(await botSection.botIsExist('C6164')).to.equal(true);
			// delete bot and check that bot deleted
			await botSection.deleteTrainedBot('C6164');
			expect(await botSection.botIsExist('C6164')).to.equal(false, 'C6164 bot did not delete');
		});
		it.only('C37 6165 - Check the "Delete NLP Bot" (not trained) functionality', async function () {
			// get test ID
			caseID = this.test.title.substr(1,3).trim();
			// create bot and check that bot is created
			await botSection.createNLPBot('C6165');
			expect(await botSection.botIsExist('C6165')).to.equal(true, 'C6165 Bot is not exist, create process failed');
			// click on No button on delete FlowBot Modal and check that bot is not deleted
			await botSection.clickOnNoButtonOnDeleteModal('C6165');
			expect(await botSection.botIsExist('C6165')).to.equal(true, 'C6165 Bot is not exist');
			// delete bot and check that bot deleted
			await botSection.deleteBot('C6165');
			expect(await botSection.botIsExist('C6165')).to.equal(false, 'C6165 bot did not delete');
			// update TestRail
			if (runWithTestRail) {
				await testRailApi.addResultForCase(runID,caseID,1);
			}	
		});
		it('C38 6166 - Check the `Delete NLP Bot` (trained) functionality', async () => {
			// create bot and check that bot is created
			await botSection.createNLPBot('C6166');
			expect(await botSection.botIsExist('C6166')).to.equal(true, 'C6166 Bot is not exist, create process failed');
			// integrate bot with Google Home
			await botSection.integrateBotToGoogle('C6166');
			// train bot and check that bot is trained
			await botSection.trainBot('C6166');
			expect(await botSection.botIsTrained('C6166')).to.equal(true, 'C6166 Bot is not trained, train process failed, or you have other not trained bot with same name');
			// check that delete button is disabled
			expect(await botSection.checkDeleteButtonIsDisableOrNo('C6166')).to.equal(true, 'C6166, delete button is not disabled');
			// write wrong word in delete input and check that delete button still disabled
			await botSection.writeWrongWordInBotDeleteInput('del');
			expect(await botSection.checkDeleteButtonIsDisableOrNoAfterWrongWord()).to.equal(true, 'C6166, delete button is not disabled after writing wrong word ');
			// click on cancel button
			await botSection.clickOnCancelButtonOnTrainedBotDeleteModal();
			// check that bot is still exist
			expect(await botSection.botIsExist('C6166')).to.equal(true);
			// delete bot and check that bot deleted
			await botSection.deleteTrainedBot('C6166');
			expect(await botSection.botIsExist('C6166')).to.equal(false, 'C6166 bot did not delete');
		});
	});

	context('Get toaster about deleting Bots', () => {
		it('C39 6167 - Check that we get toaster about deleting not trained Flow bot', async () => {
			// create bot and check that bot is created
			await botSection.createFlowBot('C6167');
			expect(await botSection.botIsExist('C6167')).to.equal(true, 'C6167 Bot is not exist, create process failed');
			// delete bot and check that bot deleted
			await botSection.deleteBot('C6167');
			expect(await botSection.waitAndGetTextFromNotification()).to.include('Successfully removed bot');
		});
		it('C40 6168 - Check that we get toaster about deleting trained Flow bot', async () => {
			// create bot and check that bot is created
			await botSection.createFlowBot('C6168');
			expect(await botSection.botIsExist('C6168')).to.equal(true, 'C6168 Bot is not exist, create process failed');
			// train bot and that bot is trained
			await botSection.trainBot('C6168');
			expect(await botSection.botIsTrained('C6168')).to.equal(true, 'C6168 Bot is not trained, train process failed, or you have other not trained bot with same name');
			// delete bot
			await botSection.deleteTrainedBot('C6168');
			// check that we get the notification with expected text
			expect(await botSection.waitAndGetTextFromNotification()).to.include('Successfully removed bot');
		});
		it('C41 6169 - Check that we get toaster about deleting not trained NLP bot', async () => {
			// create bot and check that bot is created
			await botSection.createNLPBot('C6169');
			expect(await botSection.botIsExist('C6169')).to.equal(true, 'C6169 Bot is not exist, create process failed');
			// delete bot
			await botSection.deleteBot('C6169');
			// check that we get notification with expected text
			expect(await botSection.waitAndGetTextFromNotification()).to.include('Successfully removed bot');
		});
		it('C42 6170 - Check that we get toaster about deleting trained NLP bot', async () => {
			// create bot and check that bot is created
			await botSection.createNLPBot('C6170');
			expect(await botSection.botIsExist('C6170')).to.equal(true, 'C6170 Bot is not exist, create process failed');
			// integrate bot with Google Home
			await botSection.integrateBotToGoogle('C6170');
			// train bot and check that bot is trained
			await botSection.trainBot('C6170');
			expect(await botSection.botIsTrained('C6170')).to.equal(true, 'C6170 Bot is not trained, train process failed, or you have other not trained bot with same name');
			// delete bot
			await botSection.deleteTrainedBot('C6170');
			// check that we get the notification with expected text
			expect(await botSection.waitAndGetTextFromNotification()).to.include('Successfully removed bot');
		});
	});

	context('Get text from alert and check', () => {
		it('C43 6171 - Check that we get correct text from alert when delete not trained Flow bot', async () => {
			// create bot and check that bot is created
			await botSection.createFlowBot('C6171');
			expect(await botSection.botIsExist('C6171')).to.equal(true, 'C6171 Bot is not exist, create process failed');
			// delete bot and get text from alert
			expect(await botSection.deleteNotTrainedBotAndGetTextFromAlert('C6171')).to.equal('Are you sure that you want to delete this bot?');
		});
		it('C44 6172 - Check that we get correct text from alert when delete trained Flow bot', async () => {
			// create bot and check that bot is created
			await botSection.createFlowBot('C6172');
			expect(await botSection.botIsExist('C6172')).to.equal(true, 'C6172 Bot is not exist, create process failed');
			// train bot and that bot is trained
			await botSection.trainBot('C6172');
			expect(await botSection.botIsTrained('C6172')).to.equal(true, 'C6172 Bot is not trained, train process failed, or you have other not trained bot with same name');
			// delete bot and get text from alert
			expect(await botSection.deleteTrainedBotAndGetTextFromAlert('C6172')).to.equal("This bot is deployed. If you delete it the deployed version will be deleted as well. Please type 'delete' word if you really want to delete the bot.");
		});
		it('C45 6173 - Check that we get correct text from alert when delete not trained NLP bot', async () => {
			// create bot and check that bot is created
			await botSection.createNLPBot('C6173');
			expect(await botSection.botIsExist('C6173')).to.equal(true, 'C6173 Bot is not exist, create process failed');
			// delete bot and get text from alert
			expect(await botSection.deleteNotTrainedBotAndGetTextFromAlert('C6173')).to.equal('Are you sure that you want to delete this bot?');
		});
		it('C46 6174 - Check that we get correct text from alert when delete trained NLP bot', async () => {
			// create bot and check that bot is created
			await botSection.createNLPBot('C6174');
			expect(await botSection.botIsExist('C6174')).to.equal(true, 'C6174 Bot is not exist, create process failed');
			// integrate bot with Google Home
			await botSection.integrateBotToGoogle('C6174');
			// train bot and check that bot is trained
			await botSection.trainBot('C6174');
			expect(await botSection.botIsTrained('C6174')).to.equal(true, 'C6174 Bot is not trained, train process failed, or you have other not trained bot with same name');
			// delete bot and get text from alert
			expect(await botSection.deleteTrainedBotAndGetTextFromAlert('C6174')).to.equal("This bot is deployed. If you delete it the deployed version will be deleted as well. Please type 'delete' word if you really want to delete the bot.");
		});
	});

	context('Update Flow Bot', () => {
		it('C47 73 - Check "the Edit Bot" functionality', async () => {
			// create bot and check that bot is created
			await botSection.createFlowBot('C73');
			expect(await botSection.botIsExist('C73')).to.equal(true, 'C73 Bot is not exist, create process failed');
			// update Initial Question To FreeText Question
			await botSection.updateInitialQuestionToFreeTextQuestion();
			// get text from question field and check
			expect(await botSection.getTextFromFirstQuestion()).to.include('What is your name?');
		});
	});

	context('Delete integrated bot (Magento, Wordpress)', () => {
		it('C22 344 - Check the "Delete Bot" with Integration functionality', async () => {
			// activate Magento
			await utils.goToApiConnectorPage();
			await botSection.check_Magento();
			await botSection.generateKeyAndReturn();
			// create bot and check that it is created
			await botSection.createFlowBot('C344');
			expect(await botSection.botIsExist('C344')).to.equal(true, 'C344 Bot is not exist, create process failed');
			// go to bots page and try to delete bot
			await botSection.tryDeleteIntegratedBot('C344');
			// check that we see alert that we can not delete bot and check text
			expect(await utils.getText(BOT_SECTION.SELECTORS.ALERT_FOR_DELETE_INTEGRATED_BOT)).to.equal('You are not allowed to delete the bot which has been integrated to Magento. To delete it please disable the Magento integration first.', 'Magento is activated but new bot created not integrated');
			// click on OK button
			await botSection.clickOnOKButton();
			// deActivate Magento and delete bot
			await botSection.deActivateMagentoAndDeleteBot('C344');
		});
		it.skip('C23 344_1 - Check the "Delete Bot" with Integration functionality', async () => {
			await utils.becomeDeActivatedMagento();
			// create bot and check that it is created
			await botSection.createFlowBot('C3441');
			expect(await botSection.botIsExist('C3441')).to.equal(true, 'C3441 Bot is not exist, create process failed');
			// activate Magento
			await utils.goToApiConnectorPage();
			await botSection.check_Magento();
			await botSection.generateKeyAndReturn();
			// activate Magento for this bot
			await botSection.activateMagento('C3441');
			// go to bots page and try to delete bot
			await botSection.tryDeleteIntegratedBot('C3441');
			// check that we see alert that we can not delete bot and check text
			expect(await utils.getText(BOT_SECTION.SELECTORS.ALERT_FOR_DELETE_INTEGRATED_BOT)).to.equal('You are not allowed to delete the bot which has been integrated to Magento. To delete it please disable the Magento integration first.', 'Magento is activated but new bot created not integrated');
			// click on OK button
			await botSection.clickOnOKButton();
			// deActivate Magento and delete bot
			await botSection.deActivateMagentoAndDeleteBot('C3441');
		});
	});

});
