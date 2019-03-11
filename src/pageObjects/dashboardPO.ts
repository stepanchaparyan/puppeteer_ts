import { BOT_SECTION } from '../helpers/constants/botsSectionConstants.js';
import { DASHBOARD } from '../helpers/constants/dashboardConstants.js';
import { IFRAME } from '../helpers/constants/iframeConstants.js';
import { NAVBAR } from '../helpers/constants/navbarConstants.js';
import Utils from '../helpers/utils';

export default class Dashboard {
	private browser: any;
	private page: any;
	private utils: any;

	constructor(page, browser) {
		this.browser = browser;
		this.page = page;
		this.utils = new Utils(page);
	}
	public async pageTitle(): Promise<string> {
		return this.page.title();
	}
	public async fourDivsColorsUI(): Promise<boolean> {
		await this.page.click(NAVBAR.SELECTORS.DASHBOARD);
		const options = { x: 330, y: 130, width: 120, height: 250 };
		const noDiff = await this.utils.compareScreenshotsWithClip('dashboard', 'fourDivColors', options);
		return noDiff;
	}

	public async messagesPast7DaysExist(): Promise<boolean> {
		await this.page.click(NAVBAR.SELECTORS.DASHBOARD);
		return (await this.page.$(DASHBOARD.SELECTORS.MESSAGES_PAST_7_DAYS_TEXT_DIV)) !== null;
	}
	public async messagesPast7DaysMessages(): Promise<string> {
		await this.page.click(NAVBAR.SELECTORS.DASHBOARD);
		return this.page.$eval(DASHBOARD.SELECTORS.MESSAGES_PAST_7_DAYS_MESSAGES, (text) => text.innerText);
	}
	public async messagesPast7DaysText(): Promise<string> {
		await this.page.click(NAVBAR.SELECTORS.DASHBOARD);
		return this.page.$eval(DASHBOARD.SELECTORS.MESSAGES_PAST_7_DAYS_TEXT, (text) => text.innerText);
	}
	public async messagesPast7DaysNumber(): Promise<boolean> {
		await this.page.click(NAVBAR.SELECTORS.DASHBOARD);
		await this.page.waitFor(1000);
		const messagesCountBefore = await this.page.$eval(DASHBOARD.SELECTORS.MESSAGES_PAST_7_DAYS_NUMBER, (text) => text.innerText);
		await this.page.click(NAVBAR.SELECTORS.BOTS);
		const botNumber = await this.utils.getCorrespondingBotNumber('clickOnGoogle');
		await this.page.waitForSelector(`body > app-root > div > iox-page-container > div > iox-bots > div > div:nth-child(${botNumber}) > iox-bot-item > div > div.img-container > img`);
		await this.page.click(`body > app-root > div > iox-page-container > div > iox-bots > div > div:nth-child(${botNumber}) > iox-bot-item > div > div.img-container > img`);
		await this.page.waitForSelector(BOT_SECTION.SELECTORS.RUN);
		await this.page.click(BOT_SECTION.SELECTORS.RUN);
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
		await this.page.waitFor(2000);
		const googleButton = await frame.$(IFRAME.SELECTORS.GOOGLE);
		await googleButton.click();
		await this.page.waitFor(1500);
		await this.page.click(NAVBAR.SELECTORS.DASHBOARD);
		await this.page.waitFor(1000);
		const messagesCountAfter = await this.page.$eval(DASHBOARD.SELECTORS.MESSAGES_PAST_7_DAYS_NUMBER, (text) => text.innerText);
		// console.log('before', messagesCountBefore);
		// console.log('after ', messagesCountAfter);
		const addedOneMessage = Number(messagesCountBefore) + 1 === Number(messagesCountAfter) ? true : false;
		return addedOneMessage;
	}

	public async messagesPast30DaysExist(): Promise<boolean> {
		await this.page.click(NAVBAR.SELECTORS.DASHBOARD);
		return (await this.page.$(DASHBOARD.SELECTORS.MESSAGES_PAST_30_DAYS_TEXT_DIV)) !== null;
	}
	public async messagesPast30DaysMessages(): Promise<string> {
		await this.page.click(NAVBAR.SELECTORS.DASHBOARD);
		return this.page.$eval(DASHBOARD.SELECTORS.MESSAGES_PAST_30_DAYS_MESSAGES, (text) => text.innerText);
	}
	public async messagesPast30DaysText(): Promise<string> {
		await this.page.click(NAVBAR.SELECTORS.DASHBOARD);
		return this.page.$eval(DASHBOARD.SELECTORS.MESSAGES_PAST_30_DAYS_TEXT, (text) => text.innerText);
	}
	public async messagesPast30DaysNumber(): Promise<boolean> {
		await this.page.click(NAVBAR.SELECTORS.DASHBOARD);
		await this.page.waitFor(1000);
		const messagesCountBefore = await this.page.$eval(DASHBOARD.SELECTORS.MESSAGES_PAST_30_DAYS_NUMBER, (text) => text.innerText);
		await this.page.click(NAVBAR.SELECTORS.BOTS);
		const botNumber = await this.utils.getCorrespondingBotNumber('clickOnGoogle');
		await this.page.waitForSelector(`body > app-root > div > iox-page-container > div > iox-bots > div > div:nth-child(${botNumber}) > iox-bot-item > div > div.img-container > img`);
		await this.page.click(`body > app-root > div > iox-page-container > div > iox-bots > div > div:nth-child(${botNumber}) > iox-bot-item > div > div.img-container > img`);
		await this.page.waitForSelector(BOT_SECTION.SELECTORS.RUN);
		await this.page.click(BOT_SECTION.SELECTORS.RUN);
		// wait for iframe loading
		await this.page.waitFor(3000);
		const frame = await this.page.frames().find((iframe) => iframe.name() === 'responsiveFrame');
		const mainButton = await frame.$(IFRAME.SELECTORS.MAIN_BUTTON);
		await mainButton.click();
		await this.page.waitFor(2000);
		const googleButton = await frame.$(IFRAME.SELECTORS.GOOGLE);
		await googleButton.click();
		await this.page.waitFor(1500);
		await this.page.click(NAVBAR.SELECTORS.DASHBOARD);
		await this.page.waitFor(1000);
		const messagesCountAfter = await this.page.$eval(DASHBOARD.SELECTORS.MESSAGES_PAST_30_DAYS_NUMBER, (text) => text.innerText);
		// console.log('before', messagesCountBefore);
		// console.log('after ', messagesCountAfter);
		const addedOneMessage = Number(messagesCountBefore) + 1 === Number(messagesCountAfter) ? true : false;
		return addedOneMessage;
	}

	public async sessionsPast30DaysExist(): Promise<boolean> {
		await this.page.click(NAVBAR.SELECTORS.DASHBOARD);
		return (await this.page.$(DASHBOARD.SELECTORS.SESSIONS_PAST_30_DAYS_TEXT_DIV)) !== null;
	}
	public async sessionsPast30DaysSessions(): Promise<string> {
		await this.page.click(NAVBAR.SELECTORS.DASHBOARD);
		return this.page.$eval(DASHBOARD.SELECTORS.SESSIONS_PAST_30_DAYS_SESSIONS, (text) => text.innerText);
	}
	public async sessionsPast30DaysText(): Promise<string> {
		await this.page.click(NAVBAR.SELECTORS.DASHBOARD);
		return this.page.$eval(DASHBOARD.SELECTORS.SESSIONS_PAST_30_DAYS_TEXT, (text) => text.innerText);
	}
	public async sessionsPast30DaysNumber(): Promise<boolean> {
		await this.page.click(NAVBAR.SELECTORS.DASHBOARD);
		await this.page.waitFor(1000);
		const messagesCountBefore = await this.page.$eval(DASHBOARD.SELECTORS.SESSIONS_PAST_30_DAYS_NUMBER, (text) => text.innerText);
		await this.page.click(NAVBAR.SELECTORS.BOTS);
		const botNumber = await this.utils.getCorrespondingBotNumber('clickOnGoogle');
		await this.page.waitForSelector(`body > app-root > div > iox-page-container > div > iox-bots > div > div:nth-child(${botNumber}) > iox-bot-item > div > div.img-container > img`);
		await this.page.click(`body > app-root > div > iox-page-container > div > iox-bots > div > div:nth-child(${botNumber}) > iox-bot-item > div > div.img-container > img`);
		await this.page.waitForSelector(BOT_SECTION.SELECTORS.RUN);
		await this.page.click(BOT_SECTION.SELECTORS.RUN);
		// wait for iframe loading
		await this.page.waitFor(3000);
		const frame = await this.page.frames().find((iframe) => iframe.name() === 'responsiveFrame');
		const mainButton = await frame.$(IFRAME.SELECTORS.MAIN_BUTTON);
		await mainButton.click();
		await this.page.waitFor(2000);
		const googleButton = await frame.$(IFRAME.SELECTORS.GOOGLE);
		await googleButton.click();
		await this.page.waitFor(1500);
		await this.page.click(NAVBAR.SELECTORS.DASHBOARD);
		await this.page.waitFor(1000);
		const messagesCountAfter = await this.page.$eval(DASHBOARD.SELECTORS.SESSIONS_PAST_30_DAYS_NUMBER, (text) => text.innerText);
		// console.log('before', messagesCountBefore);
		// console.log('after ', messagesCountAfter);
		const addedOneMessage = Number(messagesCountBefore) + 1 === Number(messagesCountAfter) ? true : false;
		return addedOneMessage;
	}

	public async botsCountDivExist(): Promise<boolean> {
		await this.page.click(NAVBAR.SELECTORS.DASHBOARD);
		return (await this.page.$(DASHBOARD.SELECTORS.BOTS_COUNT_DIV)) !== null;
	}
	public async botsCountDivText(): Promise<string> {
		await this.page.click(NAVBAR.SELECTORS.DASHBOARD);
		return this.page.$eval(DASHBOARD.SELECTORS.BOTS_COUNT_TEXT, (text) => text.innerText);
	}
	public async botsCount(): Promise<boolean> {
		await this.page.click(NAVBAR.SELECTORS.DASHBOARD);
		await this.page.waitFor(1000);
		const botsCountText = await this.page.$eval(DASHBOARD.SELECTORS.BOTS_COUNT_TEXT, (text) => text.innerText);
		const botsCount = botsCountText.substr(0, 2);
		await this.page.click(NAVBAR.SELECTORS.BOTS);
		const botsCountsReal = await this.page.$$eval(BOT_SECTION.SELECTORS.ALL_BOTS, (bots) => bots.length);
		const botsCountIsRight = Number(botsCountsReal) - 1 === Number(botsCount) ? true : false;
		return botsCountIsRight;
	}

	public async platformStatusDivUI(): Promise<boolean> {
		await this.page.click(NAVBAR.SELECTORS.DASHBOARD);
		await this.page.waitFor(1000);
		const platformStatusDiv = await this.page.$(DASHBOARD.SELECTORS.PLATFORM_STATUS_DIV);
		const noDiff = await this.utils.compareScreenshots('dashboard', 'platformStatus', platformStatusDiv);
		return noDiff;
	}
	public async platformStatusText(): Promise<string> {
		await this.page.click(NAVBAR.SELECTORS.DASHBOARD);
		return this.page.$eval(DASHBOARD.SELECTORS.PLATFORM_STATUS_DIV_TEXT, (text) => text.innerText);
	}
	public async platformsList(): Promise<any> {
		const platformsList = [];
		const platformElement = await this.page.$$(DASHBOARD.SELECTORS.PLATFORMS_LIST);
		for (const platform of platformElement) {
			const platformInnerText = await (await platform.getProperty('innerText')).jsonValue();
			platformsList.push(platformInnerText);
		}
		return platformsList;
	}
	public async troublesText(): Promise<string> {
		await this.page.click(NAVBAR.SELECTORS.DASHBOARD);
		return this.page.$eval(DASHBOARD.SELECTORS.HAVING_TROUBLES, (text) => text.innerText);
	}
	public async contactUsLink(): Promise<string> {
		await this.page.click(NAVBAR.SELECTORS.DASHBOARD);
		await this.page.click(DASHBOARD.SELECTORS.CONTACT_US);
		await this.page.waitFor(1000);
		const url = this.page.url();
		await this.page.goBack();
		return url;
	}

	public async chatBotUI(): Promise<boolean> {
		await this.page.click(NAVBAR.SELECTORS.DASHBOARD);
		await this.page.waitFor(4000); // wait for iframe loading
		const frame = await this.page.frames().find((iframe) => iframe.url() === 'https://app.iox.bot/iox-chatbot/chatwindow');
		const frameDiv = await frame.$(DASHBOARD.BOT.FULL_BOT);
		await this.utils.compareScreenshots('dashboard', 'dashboardChatBot', frameDiv);
		return true;
	}
	public async chatBotTitle(): Promise<string> {
		await this.page.click(NAVBAR.SELECTORS.DASHBOARD);
		const frame = await this.page.frames().find((iframe) => iframe.url() === 'https://app.iox.bot/iox-chatbot/chatwindow');
		const botName = await frame.$eval(DASHBOARD.BOT.NAME, (name) => name.innerText);
		return botName;
	}
	public async chatBotByIOX_URL(): Promise<string> {
		await this.page.click(NAVBAR.SELECTORS.DASHBOARD);
		const frame = await this.page.frames().find((iframe) => iframe.url() === 'https://app.iox.bot/iox-chatbot/chatwindow');
		const byIOXButton = await frame.$(DASHBOARD.BOT.BYIOX_LINK);
		await byIOXButton.click();
		await this.page.waitFor(2000);
		const pages = await this.browser.pages();
		const url = await pages[2].url();
		return url;
	}
	public async chatBotConversation(): Promise<boolean> {
		await this.page.click(NAVBAR.SELECTORS.DASHBOARD);
		// wait for iframe loading
		await this.page.waitFor(2000);
		const frame = await this.page.frames().find((iframe) => iframe.url() === 'https://app.iox.bot/iox-chatbot/chatwindow');
		const optionTwo = await frame.$(DASHBOARD.BOT.QUESTION_FIRST_ANSWER_TWO);
		await optionTwo.click();
		await this.page.waitFor(2500);
		const frameDiv = await frame.$(DASHBOARD.BOT.FULL_BOT);
		await this.utils.compareScreenshots('dashboard', 'dashboardChatBotStepTwo', frameDiv);
		return true;
	}
}
