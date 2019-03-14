import * as path from 'path';
import * as ScreenshotTester from 'puppeteer-screenshot-tester';
import { BOT_SECTION } from '../botSection/botsSectionConstants';
import { SIDEMENU } from '../sideMenu/sideMenuConstants';
import { IFRAME } from '../botSection/iframeConstants';
import { DASHBOARD } from '../dashboardSection/dashboardConstants';

export default class Utils {
	private page: any;
	constructor(page) {
		this.page = page;
	}

	public async compareScreenshots(
		screenshotPath: string,
		name: string,
		component: any = this.page
	): Promise<boolean> {
		const src = 'src';
		const helpers = 'helpers';
		const screenshots = 'screenshots';
		await this.page.waitFor(1000);
		const tester = await ScreenshotTester(0, 4, [], {});
		const result = await tester(component, name, {
			path: path.join(`${src}`, `${helpers}`, `${screenshots}`, `${screenshotPath}`, `${name}`)
		});
		return result;
	}

	public async compareScreenshotsWithClip(screenshotPath: string, name: string, options: any): Promise<boolean> {
		const src = 'src';
		const helpers = 'helpers';
		const screenshots = 'screenshots';
		await this.page.waitFor(1000);
		const tester = await ScreenshotTester(0, 4, [], {});
		const result = await tester(this.page, name, {
			clip: options,
			fullPage: false,
			path: path.join(`${src}`, `${helpers}`, `${screenshots}`, `${screenshotPath}`, `${name}`)
		});
		return result;
	}

	public async getCorrespondingBotNumber(botName: string): Promise<number> {
		let i;
		const botsCount = await this.page.$$eval(BOT_SECTION.SELECTORS.ALL_BOTS, (bots) => bots.length);
		for (i = 1; i < botsCount; i++) {
			if (
				(await this.page.$(
					`body > app-root > div > iox-page-container > div > iox-bots > div > div:nth-child(${i}) > iox-bot-item > div > div.bot-content > div.bot-name`
				)) !== null
			) {
				const row = `body > app-root > div > iox-page-container > div > iox-bots > div > div:nth-child(${i}) > iox-bot-item > div > div.bot-content > div.bot-name`;
				const anyNextLocation = await this.page.$eval(row, (element) => element.innerText);
				if (anyNextLocation === botName) {
					break;
				}
			}
		}
		return i;
	}

	public async clickOnBotDeleteButton(botName: string): Promise<void> {
		const botNumber = await this.getCorrespondingBotNumber(botName);
		await this.page.waitForSelector(
			`body > app-root > div > iox-page-container > div > iox-bots > div > div:nth-child(${botNumber}) > iox-bot-item > div > div.bot-content > div.action-buttons.btn-group > button:nth-child(3) > i`
		);
		await this.page.click(
			`body > app-root > div > iox-page-container > div > iox-bots > div > div:nth-child(${botNumber}) > iox-bot-item > div > div.bot-content > div.action-buttons.btn-group > button:nth-child(3) > i`
		);
	}

	public async botIsExist(botName: string): Promise<boolean> {
		await this.reload();
		const botNumber = await this.getCorrespondingBotNumber(botName);
		const botIsExist =
			(await this.page.$(`body > app-root > div > iox-page-container > div > iox-bots > div > div:nth-child(${botNumber}) > iox-bot-item > div > div.bot-content > div.action-buttons.btn-group > button:nth-child(3) > i`)) !== null;
		return botIsExist;
	}

	public async deleteBot(botName: string): Promise<boolean> {
		await this.page.waitForSelector(SIDEMENU.SELECTORS.BOTS);
		await this.page.click(SIDEMENU.SELECTORS.BOTS);
		await this.clickOnBotDeleteButton(botName);
		await this.page.waitForSelector(BOT_SECTION.SELECTORS.YES_BUTTON_ON_DELETE);
		await this.page.click(BOT_SECTION.SELECTORS.YES_BUTTON_ON_DELETE);
		return true;
	}

	public async deleteTrainedBot(botName: string): Promise<void> {
		await this.page.click(SIDEMENU.SELECTORS.BOTS);
		await this.clickOnBotDeleteButton(botName);
		await this.page.waitForSelector(BOT_SECTION.SELECTORS.DELETE_TRAINED_BOT_INPUT);
		await this.page.type(BOT_SECTION.SELECTORS.DELETE_TRAINED_BOT_INPUT, 'delete');
		await this.page.waitForSelector(BOT_SECTION.SELECTORS.DELETE_TRAINED_BOT_DELETE_BUTTON);
		await this.page.click(BOT_SECTION.SELECTORS.DELETE_TRAINED_BOT_DELETE_BUTTON, { delay: 50 });
	}

	public async integrateBotToGoogle(): Promise<void> {
		await this.page.waitForSelector(BOT_SECTION.SELECTORS.INTEGRATE);
		await this.page.click(BOT_SECTION.SELECTORS.INTEGRATE);
		await this.page.waitForSelector(BOT_SECTION.SELECTORS.CHECHBOX_GOOGLE_HOME);
		await this.page.click(BOT_SECTION.SELECTORS.CHECHBOX_GOOGLE_HOME, { delay: 50 });
		await this.page.waitForSelector(BOT_SECTION.SELECTORS.GOOGLE_HOME_INPUT_1);
		await this.page.type(BOT_SECTION.SELECTORS.GOOGLE_HOME_INPUT_1, 'newagent-4dfa0');
		await this.page.type(BOT_SECTION.SELECTORS.GOOGLE_HOME_INPUT_2, '237d84ca4fc8457c8b3cf8c4c348476b');
		await this.page.waitForSelector(BOT_SECTION.SELECTORS.INTEGRATE_BUTTON);
		await this.page.click(BOT_SECTION.SELECTORS.INTEGRATE_BUTTON);
		await this.page.waitFor(2000); //! need open bug
	}

	public async trainBot(): Promise<void> {
		await this.page.waitForSelector(BOT_SECTION.SELECTORS.RUN);
		await this.page.click(BOT_SECTION.SELECTORS.RUN);
		await this.page.waitForSelector(BOT_SECTION.SELECTORS.TRAIN);
		await this.page.click(BOT_SECTION.SELECTORS.TRAIN);
		await this.page.waitForSelector(BOT_SECTION.SELECTORS.PROGRESS_BAR, { timeout: 300000, hidden: true });
	}

	public async reload(): Promise<void> {
		await this.page.reload({ waitUntil: 'load' });
		await this.page.waitFor(500); //!
	}

	public async clickOnCreateBotButton(): Promise<void> {
		await this.page.waitFor(500); //!
		await this.reload();
		const botsCount = await this.page.$$eval(BOT_SECTION.SELECTORS.ALL_BOTS, (bots) => bots.length);
		await this.page.waitForSelector(`body > app-root > div > iox-page-container > div > iox-bots > div > div:nth-child(${botsCount}) > button`);
		await this.page.click(`body > app-root > div > iox-page-container > div > iox-bots > div > div:nth-child(${botsCount}) > button`);
	}

	public async createFlowBot(botName: string): Promise<void> {
		await this.page.waitForSelector(SIDEMENU.SELECTORS.BOTS);
		await this.page.click(SIDEMENU.SELECTORS.BOTS);
		await this.clickOnCreateBotButton();
		await this.page.waitForSelector(BOT_SECTION.SELECTORS.CREATE_FLOW_BOT);
		await this.page.click(BOT_SECTION.SELECTORS.CREATE_FLOW_BOT);
		await this.page.click(BOT_SECTION.SELECTORS.CREATE_BOT_CONTINUE);
		await this.page.click(BOT_SECTION.SELECTORS.CREATE_WEB_CHAT_BOT);
		await this.page.waitForSelector(BOT_SECTION.SELECTORS.BOT_NAME_INPUT);
		await this.page.type(BOT_SECTION.SELECTORS.BOT_NAME_INPUT, botName);
		await this.page.click(BOT_SECTION.SELECTORS.CREATE_BOT_BUTTON_AFTER_TYPE_NAME);
		await this.page.waitFor(1000); //!
	}

	public async createNLPBot(botName: string): Promise<void> {
		await this.page.waitForSelector(SIDEMENU.SELECTORS.BOTS);
		await this.page.click(SIDEMENU.SELECTORS.BOTS);
		await this.clickOnCreateBotButton();
		await this.page.waitForSelector(BOT_SECTION.SELECTORS.CREATE_NLP_BOT);
		await this.page.click(BOT_SECTION.SELECTORS.CREATE_NLP_BOT);
		await this.page.waitForSelector(BOT_SECTION.SELECTORS.BOT_NAME_INPUT);
		await this.page.type(BOT_SECTION.SELECTORS.BOT_NAME_INPUT, botName);
		await this.page.click(BOT_SECTION.SELECTORS.CREATE_BOT_BUTTON_AFTER_TYPE_NAME);
		await this.page.waitFor(1000); //!
	}

	public async click(selector: string): Promise<void> {
		await this.page.waitForSelector(selector);
		await this.page.click(selector);
	}
	public async type(selector: string, inputText: string): Promise<void> {
		await this.page.waitForSelector(selector);
		await this.page.type(selector, inputText);
	}
	public async select(selector: string, inputText: string): Promise<void> {
		await this.page.waitForSelector(selector);
		await this.page.select(selector, inputText);
	}

	public async acceptChatBotAgreement(): Promise<boolean> {
		//await this.page.waitFor(1000);
		await this.click(SIDEMENU.SELECTORS.BOTS);
		const botNumber = await this.getCorrespondingBotNumber('clickOnGoogle');
		await this.click(`body > app-root > div > iox-page-container > div > iox-bots > div > div:nth-child(${botNumber}) > iox-bot-item > div > div.img-container > img`);
		await this.click(BOT_SECTION.SELECTORS.RUN);
		// wait for iframe loading
		await this.page.waitFor(3000);
		const frame = await this.page.frames().find((iframe) => iframe.name() === 'responsiveFrame');
		const mainButton = await frame.$(IFRAME.SELECTORS.MAIN_BUTTON);
		await mainButton.click();
		await this.page.waitFor(1000);
		const agreementCheckbox = await frame.$(IFRAME.SELECTORS.AGREEMENT_CHECKBOX);
		await agreementCheckbox.click();
		const agreementConfirmButton = await frame.$(IFRAME.SELECTORS.AGREEMENT_CONFIRM_BUTTON);
		await agreementConfirmButton.click();
		//await this.page.waitFor(2000);
		return true;
	}
	public async goToRUNPageOfBot(botName: string): Promise<void> {
		await this.click(SIDEMENU.SELECTORS.BOTS);
		const botNumber = await this.getCorrespondingBotNumber(botName);
		await this.click(`body > app-root > div > iox-page-container > div > iox-bots > div > div:nth-child(${botNumber}) > iox-bot-item > div > div.img-container > img`);
		await this.click(BOT_SECTION.SELECTORS.RUN);
	}
}
