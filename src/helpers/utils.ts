import * as path from 'path';
import * as ScreenshotTester from 'puppeteer-screenshot-tester';
import { BOT_SECTION } from '../botSection/botsSectionConstants';
import { IFRAME } from '../botSection/iframeConstants';
import { SIDEMENU } from '../sideMenuSection/sideMenuConstants';

export default class Utils {
	private page: any;
	constructor(page) {
		this.page = page;
	}

	public async compareScreenshots(screenshotPath: string, name: string, component: any = this.page): Promise<boolean> {
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
			if ((await this.page.$(`body > app-root > div > iox-page-container > div > iox-bots > div > div:nth-child(${i}) > iox-bot-item > div > div.bot-content > div.bot-name`)) !== null) {
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
		await this.page.waitForSelector(`body > app-root > div > iox-page-container > div > iox-bots > div > div:nth-child(${botNumber}) > iox-bot-item > div > div.bot-content > div.action-buttons.btn-group > button:nth-child(3) > i`);
		await this.page.click(`body > app-root > div > iox-page-container > div > iox-bots > div > div:nth-child(${botNumber}) > iox-bot-item > div > div.bot-content > div.action-buttons.btn-group > button:nth-child(3) > i`);
	}

	public async clickOnBotUpdateButton(botName: string): Promise<void> {
		const botNumber = await this.getCorrespondingBotNumber(botName);
		await this.page.waitForSelector(`body > app-root > div > iox-page-container > div > iox-bots > div > div:nth-child(${botNumber}) > iox-bot-item > div > div.bot-content > div.action-buttons.btn-group > button:nth-child(1) > i`);
		await this.page.click(`body > app-root > div > iox-page-container > div > iox-bots > div > div:nth-child(${botNumber}) > iox-bot-item > div > div.bot-content > div.action-buttons.btn-group > button:nth-child(1) > i`);
	}

	public async botIsExist(botName: string): Promise<boolean> {
		await this.page.click(SIDEMENU.SELECTORS.BOTS);
		await this.reload();
		const botNumber = await this.getCorrespondingBotNumber(botName);
		const botIsExist = (await this.page.$(`body > app-root > div > iox-page-container > div > iox-bots > div > div:nth-child(${botNumber}) > iox-bot-item > div > div.bot-content > div.action-buttons.btn-group > button:nth-child(3) > i`)) !== null;
		// back to this Bot page
		if (botIsExist === true) {
			await this.clickOnBotUpdateButton(botName);
		}
		return botIsExist;
	}

	public async botIsTrained(botName: string): Promise<boolean> {
		await this.click(SIDEMENU.SELECTORS.BOTS);
		await this.page.waitFor(1000); //!500
		const botNumber = await this.getCorrespondingBotNumber(botName);
		await this.page.waitFor(1000); //!
		const checkbox = await this.page.$(`body > app-root > div > iox-page-container > div > iox-bots > div > div:nth-child(${botNumber}) > iox-bot-item > div > div.bot-content > div.status-bar > i`);
		const className = await checkbox.getProperty('className');
		const classNameIncludescheck = String(className).includes('check');
		return classNameIncludescheck;
	}

	public async getBotCount(botName: string): Promise<number> {
		await this.reload();
		await this.page.click(SIDEMENU.SELECTORS.BOTS);
		await this.page.waitFor(1000); //!
		const allBotsCount = await this.page.$$eval(BOT_SECTION.SELECTORS.ALL_BOTS, (bots) => bots.length);
		let botCount = 0;
		for (let i = 1; i < allBotsCount; i++) {
			if (await this.page.$eval(`body > app-root > div > iox-page-container > div > iox-bots > div > div:nth-child(${i}) > iox-bot-item > div > div.bot-content > div.bot-name`, (bot) => bot.innerText) === 'C69') {
				botCount++; 
			}
		}
		return botCount;
	}

	public async deleteBot(botName: string): Promise<void> {
		await this.page.waitFor(500);
		await this.page.click(SIDEMENU.SELECTORS.BOTS);
		await this.clickOnBotDeleteButton(botName);
		//await this.page.waitForSelector(BOT_SECTION.SELECTORS.YES_BUTTON_ON_DELETE);
		await this.page.click(BOT_SECTION.SELECTORS.YES_BUTTON_ON_DELETE);
		await this.page.waitFor(500); //?
	}
	public async deleteNotTrainedBotAndGetTextFromAlert(botName: string): Promise<string> {
		await this.page.waitFor(500);
		await this.page.click(SIDEMENU.SELECTORS.BOTS);
		await this.clickOnBotDeleteButton(botName);
		const text = await this.page.$eval(BOT_SECTION.SELECTORS.DELETE_ALERT_TEXT, (text) => text.innerText);
		await this.page.click(BOT_SECTION.SELECTORS.YES_BUTTON_ON_DELETE);
		await this.page.waitFor(500); //?
		return await text;
	}
	//! delete after test
	public async deleteBot2(botName: string): Promise<void> {
		await this.page.waitFor(500);
		await this.page.click(SIDEMENU.SELECTORS.BOTS);
		await this.clickOnBotDeleteButton(botName);
		await this.page.waitForSelector(BOT_SECTION.SELECTORS.YES_BUTTON_ON_DELETE);
		await this.page.click(BOT_SECTION.SELECTORS.YES_BUTTON_ON_DELETE);
		await this.page.waitFor(500); //?
	}
	public async deleteTrainedBotAndGetTextFromAlert(botName: string): Promise<string> {
		await this.page.waitFor(2000);//!
		await this.click(SIDEMENU.SELECTORS.BOTS);
		await this.clickOnBotDeleteButton(botName);
		const text = await this.page.$eval(BOT_SECTION.SELECTORS.DELETE_ALERT_TEXT, (text) => text.innerText);
		await this.page.waitForSelector(BOT_SECTION.SELECTORS.DELETE_TRAINED_BOT_INPUT);
		await this.page.type(BOT_SECTION.SELECTORS.DELETE_TRAINED_BOT_INPUT, 'delete');
		await this.page.waitForSelector(BOT_SECTION.SELECTORS.DELETE_TRAINED_BOT_DELETE_BUTTON);
		await this.page.click(BOT_SECTION.SELECTORS.DELETE_TRAINED_BOT_DELETE_BUTTON, { delay: 50 });
		await this.page.waitFor(1000);//!
		return await text;
	}
	public async deleteTrainedBot(botName: string): Promise<void> {
		await this.page.waitFor(2000);//!
		await this.click(SIDEMENU.SELECTORS.BOTS);
		await this.clickOnBotDeleteButton(botName);
		await this.page.waitForSelector(BOT_SECTION.SELECTORS.DELETE_TRAINED_BOT_INPUT);
		await this.page.type(BOT_SECTION.SELECTORS.DELETE_TRAINED_BOT_INPUT, 'delete');
		await this.page.waitForSelector(BOT_SECTION.SELECTORS.DELETE_TRAINED_BOT_DELETE_BUTTON);
		await this.page.click(BOT_SECTION.SELECTORS.DELETE_TRAINED_BOT_DELETE_BUTTON, { delay: 50 });
		await this.page.waitFor(1000);//!
	}

	public async integrateBotToGoogle(): Promise<void> {
		await this.page.waitForSelector(BOT_SECTION.SELECTORS.INTEGRATE);
		await this.page.click(BOT_SECTION.SELECTORS.INTEGRATE);
		await this.page.waitForSelector(BOT_SECTION.SELECTORS.CHECHBOX_GOOGLE_HOME);
		await this.page.click(BOT_SECTION.SELECTORS.CHECHBOX_GOOGLE_HOME);
		await this.page.waitForSelector(BOT_SECTION.SELECTORS.GOOGLE_HOME_INPUT_1);
		await this.page.type(BOT_SECTION.SELECTORS.GOOGLE_HOME_INPUT_1, 'newagent-4dfa0');
		await this.page.type(BOT_SECTION.SELECTORS.GOOGLE_HOME_INPUT_2, '237d84ca4fc8457c8b3cf8c4c348476b');
		await this.page.waitForSelector(BOT_SECTION.SELECTORS.INTEGRATE_BUTTON);
		await this.page.click(BOT_SECTION.SELECTORS.INTEGRATE_BUTTON);
		await this.page.waitFor(2000); //! need open bug
	}

	public async trainBot(): Promise<void> {
		await this.page.waitFor(1000); //! 
		await this.page.waitForSelector(BOT_SECTION.SELECTORS.RUN);
		await this.page.click(BOT_SECTION.SELECTORS.RUN);
		await this.page.waitForSelector(BOT_SECTION.SELECTORS.TRAIN);
		await this.page.click(BOT_SECTION.SELECTORS.TRAIN);
		await this.page.waitForSelector(BOT_SECTION.SELECTORS.PROGRESS_BAR, { timeout: 300000, hidden: true });
	}

	public async reload(): Promise<void> {
		await this.page.reload({ waitUntil: 'load' });
		await this.page.waitFor(500);
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
		//console.log('click on ', selector);
		try {
			await this.page.waitForSelector(selector);
		} catch (err) {
			if (err == 'Error: waiting failed: timeout 30000ms exceeded') {
			throw new Error(`Error. WaitFor: ' ${selector}`)
			} else {
				throw err
			}
		}
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
		const botUrl = await this.getBotUrl('clickOnGoogle');
		await this.page.goto(botUrl);
		await this.click(IFRAME.SELECTORS.MAIN_BUTTON);
		await this.click(IFRAME.SELECTORS.AGREEMENT_CHECKBOX);
		await this.click(IFRAME.SELECTORS.AGREEMENT_CONFIRM_BUTTON);
		await this.page.goBack();
		return true;
	}

	public async getBotUrl(botName: string): Promise<string> {
		await this.click(SIDEMENU.SELECTORS.BOTS);
		const botNumber = await this.getCorrespondingBotNumber(botName);
		const linkOfBot = await this.page.$(`body > app-root > div > iox-page-container > div > iox-bots > div > div:nth-child(${botNumber}) > iox-bot-item > div > div.bot-content > div.copy-area-container > div > div > a`);
		const botHref = await linkOfBot.getProperty('href');
		const botUrlHome = botHref._remoteObject.value;
		const botUrlChat = botUrlHome.replace('home', 'chat');
		return botUrlChat;
	}
}
