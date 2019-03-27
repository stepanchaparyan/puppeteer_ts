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

			try {
				expect(await smokeTesting.createFreeTextQuestion()).to.equal(true, 'free this function not working properly');
			} catch (err) {
				if (err == 'Error: waiting failed: timeout 30000ms exceeded') {
				throw new Error('Free Text Question Timeout Error')
				} else {
					throw err
				}
			}
			
			try {
				expect(await smokeTesting.createOptionsQuestion()).to.equal(true, 'Option this function not working properly');
			} catch (err) {
				if (err == 'Error: waiting failed: timeout 30000ms exceeded') {
				throw new Error('Options Question Timeout Error')
				} else {
					throw err
				}
			}

			try {
				expect(await smokeTesting.createMultipleOptionsQuestion()).to.equal(true, 'Multiple this function not working properly');
			} catch (err) {
				if (err == 'Error: waiting failed: timeout 30000ms exceeded') {
				throw new Error('Multiple Question Timeout Error')
				} else {
					throw err
				}
			}
			
			try {
				expect(await smokeTesting.createDatePickerQuestion()).to.equal(true, 'Data Picker this function not working properly');
			} catch (err) {
				if (err == 'Error: waiting failed: timeout 30000ms exceeded') {
					throw new Error('DataPicker Question Timeout Error')
				} else {
					throw err
				}
			}

			try {
				expect(await smokeTesting.createLocationQuestion()).to.equal(true, 'Location: this function not working properly');
			} catch (err) {
				if (err == 'Error: waiting failed: timeout 30000ms exceeded') {
					throw new Error('Location Question Timeout Error')
				} else {
					throw err
				}
			}

			try {
				expect(await smokeTesting.createQuestionForGirl()).to.equal(true, 'QuestionForGirl  function not working properly');
			} catch (err) {
				if (err == 'Error: waiting failed: timeout 30000ms exceeded') {
					throw new Error('QuestionForGirl Question Timeout Error')
				} else {
					throw err
				}
			}

			try {
				expect(await smokeTesting.createURLQuestion()).to.equal(true, 'URL: this function not working properly');
			} catch (err) {
				if (err == 'Error: waiting failed: timeout 30000ms exceeded') {
					throw new Error('URL Question Timeout Error')
				} else {
					throw err
				}
			}

			try {
				expect(await smokeTesting.createCustomSliderQuestion()).to.equal(true, 'CustomSlider Question: this function not working properly');
			} catch (err) {
				if (err == 'Error: waiting failed: timeout 30000ms exceeded') {
					throw new Error('CustomSlider Question Timeout Error')
				} else {
					throw err
				}
			}

			try {
				expect(await smokeTesting.createSliderQuestion()).to.equal(true, 'Slider Question: this function not working properly');
			} catch (err) {
				if (err == 'Error: waiting failed: timeout 30000ms exceeded') {
					throw new Error('Slider Question Timeout Error')
				} else {
					throw err
				}
			}

			//expect(await smokeTesting.createMultipleOptionsQuestion()).to.equal(true, 'this function not working properly');
			//expect(await smokeTesting.createDatePickerQuestion()).to.equal(true, 'this function not working properly');
			//expect(await smokeTesting.createLocationQuestion()).to.equal(true, 'this function not working properly');
			//expect(await smokeTesting.createQuestionForGirl()).to.equal(true, 'this function not working properly');
			//expect(await smokeTesting.createURLQuestion()).to.equal(true, 'this function not working properly');
			//expect(await smokeTesting.createCustomSliderQuestion()).to.equal(true, 'this function not working properly');
			//expect(await smokeTesting.createSliderQuestion()).to.equal(true, 'this function not working properly');
			await utils.trainBot();
			await utils.deleteTrainedBot('SmokeTest');
		});
		// it('test', async () => {
		// 	expect(await flowBot.test()).to.equal(true);
		// });
	});
});
