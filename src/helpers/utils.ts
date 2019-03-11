import * as path from 'path';
import * as ScreenshotTester from 'puppeteer-screenshot-tester';
import { BOT_SECTION } from './constants/botsSectionConstants.js';
import { NAVBAR } from './constants/navbarConstants.js';

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
						path: path.join(`${src}`, `${helpers}`, `${screenshots}`, `${screenshotPath}`, `${name}`),
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
						path: path.join(`${src}`, `${helpers}`, `${screenshots}`, `${screenshotPath}`, `${name}`),
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

		public async deleteBot(botName: string): Promise<boolean> {
				await this.page.waitFor(500);
				await this.page.click(NAVBAR.SELECTORS.BOTS);
				const botNumber = await this.getCorrespondingBotNumber(botName);
				await this.page.waitFor(500);
				await this.page.click(`body > app-root > div > iox-page-container > div > iox-bots > div > div:nth-child(${botNumber}) > iox-bot-item > div > div.bot-content > div.action-buttons.btn-group > button:nth-child(3) > i`);
				await this.page.click(BOT_SECTION.SELECTORS.YES_BUTTON_ON_DELETE);
				return true;
		}

		public async reload(): Promise<void> {
				await this.page.reload();
				await this.page.waitFor(500);
		}

		public async clickOnCreateBotButton(): Promise<void> {
				await this.page.waitFor(500);
				await this.reload();
				const botsCount = await this.page.$$eval(BOT_SECTION.SELECTORS.ALL_BOTS, (bots) => bots.length);
				await this.page.click(`body > app-root > div > iox-page-container > div > iox-bots > div > div:nth-child(${botsCount}) > button`);
		}

		public async createBot(botName: string): Promise<void> {
				await this.page.waitFor(500);
				await this.page.click(NAVBAR.SELECTORS.BOTS);
				await this.clickOnCreateBotButton();
				await this.page.waitFor(800);
				await this.page.click(BOT_SECTION.SELECTORS.CREATE_FLOW_BOT);
				await this.page.click(BOT_SECTION.SELECTORS.CREATE_BOT_CONTINUE);
				await this.page.click(BOT_SECTION.SELECTORS.CREATE_WEB_CHAT_BOT);
				await this.page.waitFor(500);
				await this.page.type(BOT_SECTION.SELECTORS.BOT_NAME_INPUT, botName);
				await this.page.click(BOT_SECTION.SELECTORS.CREATE_BOT_BUTTON_AFTER_TYPE_NAME);
		}
}
