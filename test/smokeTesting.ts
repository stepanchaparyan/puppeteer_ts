import { expect } from 'chai';
import launchPuppeteer from '../settings/launchPuppeteer';
import SmokeTesting from '../src/smokeTesting/smokeTesting';
import LoginPage from '../src/loginSection/loginPage';
import Utils from '../src/helpers/utils';
import * as puppeteerSettings from '../settings/puppeteerSettings';

let browser:any, page: any, loginPage: any, smokeTesting: any, utils: any;

describe('Smoke Testing', () => {
	before(async () => {
		browser = await launchPuppeteer();
		page = await browser.newPage();
		await page.setViewport(puppeteerSettings.viewport);
		smokeTesting = new SmokeTesting(page);
		loginPage = new LoginPage(page);
		utils = new Utils(page);
		await loginPage.open();
		await loginPage.logIn();
	});
	after(async () => {
		await browser.close();
	});

	context('Flow Bot', () => {
		it('Create long flow bot', async () => {
			await utils.createFlowBot('SmokeTest');
			await smokeTesting.createFreeTextQuestion();
			await smokeTesting.createOptionsQuestion();
			await smokeTesting.createMultipleOptionsQuestion();
			await smokeTesting.createQuestionForBoy();
			await smokeTesting.createDatePickerQuestion();
			await smokeTesting.createLocationQuestion();
			await smokeTesting.createQuestionForGirl();
			await smokeTesting.createURLQuestion();
			await smokeTesting.createCustomSliderQuestion();
			await smokeTesting.createSliderQuestion();
			await utils.trainBot();
			await utils.deleteTrainedBot('SmokeTest');
		});
		// it('test', async () => {
		// 	expect(await flowBot.test()).to.equal(true);
		// });
	});
});
