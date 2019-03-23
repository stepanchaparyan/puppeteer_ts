import { BOT_SECTION } from '../botSection/botsSectionConstants';
import { IFRAME } from '../botSection/iframeConstants';
import Utils from '../helpers/utils';
import { SIDEMENU } from '../sideMenuSection/sideMenuConstants';
import { DASHBOARD } from './dashboardConstants';

export default class Dashboard {
	private browser: any;
	private page: any;
	private utils: any;

	constructor (page, browser) {
		this.browser = browser;
		this.page = page;
		this.utils = new Utils(page);
	}
	public async pageTitle (): Promise<string> {
		return this.page.title();
	}

	public async messagesPast7DaysExist (): Promise<boolean> {
		await this.utils.click(SIDEMENU.SELECTORS.DASHBOARD);
		return (await this.page.$(DASHBOARD.SELECTORS.MESSAGES_PAST_7_DAYS_TEXT_DIV)) !== null;
	}
	public async messagesPast7DaysMessages (): Promise<string> {
		await this.utils.click(SIDEMENU.SELECTORS.DASHBOARD);
		return this.page.$eval(DASHBOARD.SELECTORS.MESSAGES_PAST_7_DAYS_MESSAGES, (text) => text.innerText);
	}
	public async messagesPast7DaysText (): Promise<string> {
		await this.utils.click(SIDEMENU.SELECTORS.DASHBOARD);
		return this.page.$eval(DASHBOARD.SELECTORS.MESSAGES_PAST_7_DAYS_TEXT, (text) => text.innerText);
	}

	public async messagesPast7DaysNumber (): Promise<boolean> {
		await this.utils.click(SIDEMENU.SELECTORS.DASHBOARD);
		await this.page.waitForFunction(`document.querySelector('body > app-root > div > iox-page-container > div > iox-dashboard > div > div.col-lg-7.col-md-7.col-sm-12.col-xs-12.dashboard-column-left > div:nth-child(1) > div > span').innerText > 0;`);
		const messagesCountBefore = await this.page.$eval(DASHBOARD.SELECTORS.MESSAGES_PAST_7_DAYS_NUMBER, (text) => text.innerText);
		const botUrl = await this.utils.getBotUrl('clickOnGoogle');
		await this.page.goto(botUrl);
		await this.utils.click(IFRAME.SELECTORS.MAIN_BUTTON);
		await this.utils.click(IFRAME.SELECTORS.GOOGLE);
		await this.page.goBack();
		await this.utils.click(SIDEMENU.SELECTORS.DASHBOARD);
		await this.page.waitFor(500);
		const messagesCountAfter = await this.page.$eval(DASHBOARD.SELECTORS.MESSAGES_PAST_7_DAYS_NUMBER, (text) => text.innerText);
		const addedOneMessage = Number(messagesCountBefore) + 1 === Number(messagesCountAfter) ? true : false;
		return addedOneMessage;
	}

	public async messagesPast30DaysExist (): Promise<boolean> {
		await this.utils.click(SIDEMENU.SELECTORS.DASHBOARD);
		return (await this.page.$(DASHBOARD.SELECTORS.MESSAGES_PAST_30_DAYS_TEXT_DIV)) !== null;
	}
	public async messagesPast30DaysMessages (): Promise<string> {
		await this.utils.click(SIDEMENU.SELECTORS.DASHBOARD);
		return this.page.$eval(DASHBOARD.SELECTORS.MESSAGES_PAST_30_DAYS_MESSAGES, (text) => text.innerText);
	}
	public async messagesPast30DaysText (): Promise<string> {
		await this.utils.click(SIDEMENU.SELECTORS.DASHBOARD);
		return this.page.$eval(DASHBOARD.SELECTORS.MESSAGES_PAST_30_DAYS_TEXT, (text) => text.innerText);
	}
	public async messagesPast30DaysNumber (): Promise<boolean> {
		await this.utils.click(SIDEMENU.SELECTORS.DASHBOARD);
		await this.page.waitForFunction(`document.querySelector('body > app-root > div > iox-page-container > div > iox-dashboard > div > div.col-lg-7.col-md-7.col-sm-12.col-xs-12.dashboard-column-left > div:nth-child(2) > div > span').innerText > 0;`);
		const messagesCountBefore = await this.page.$eval(DASHBOARD.SELECTORS.MESSAGES_PAST_30_DAYS_NUMBER, (text) => text.innerText);
		const botUrl = await this.utils.getBotUrl('clickOnGoogle');
		await this.page.goto(botUrl);
		await this.utils.click(IFRAME.SELECTORS.MAIN_BUTTON);
		await this.utils.click(IFRAME.SELECTORS.GOOGLE);
		await this.page.goBack();
		await this.utils.click(SIDEMENU.SELECTORS.DASHBOARD);
		await this.page.waitFor(500);
		const messagesCountAfter = await this.page.$eval(DASHBOARD.SELECTORS.MESSAGES_PAST_30_DAYS_NUMBER, (text) => text.innerText);
		const addedOneMessage = Number(messagesCountBefore) + 1 === Number(messagesCountAfter) ? true : false;
		return addedOneMessage;
	}

	public async sessionsPast30DaysExist (): Promise<boolean> {
		await this.utils.click(SIDEMENU.SELECTORS.DASHBOARD);
		return (await this.page.$(DASHBOARD.SELECTORS.SESSIONS_PAST_30_DAYS_TEXT_DIV)) !== null;
	}
	public async sessionsPast30DaysSessions (): Promise<string> {
		await this.utils.click(SIDEMENU.SELECTORS.DASHBOARD);
		return this.page.$eval(DASHBOARD.SELECTORS.SESSIONS_PAST_30_DAYS_SESSIONS, (text) => text.innerText);
	}
	public async sessionsPast30DaysText (): Promise<string> {
		await this.utils.click(SIDEMENU.SELECTORS.DASHBOARD);
		return this.page.$eval(DASHBOARD.SELECTORS.SESSIONS_PAST_30_DAYS_TEXT, (text) => text.innerText);
	}
	public async sessionsPast30DaysNumber (): Promise<boolean> {
		await this.utils.click(SIDEMENU.SELECTORS.DASHBOARD);
		await this.page.waitForFunction(`document.querySelector('body > app-root > div > iox-page-container > div > iox-dashboard > div > div.col-lg-7.col-md-7.col-sm-12.col-xs-12.dashboard-column-left > div:nth-child(4) > div > span').innerText > 0;`);
		const messagesCountBefore = await this.page.$eval(DASHBOARD.SELECTORS.SESSIONS_PAST_30_DAYS_NUMBER, (text) => text.innerText);
		const botUrl = await this.utils.getBotUrl('clickOnGoogle');
		await this.page.goto(botUrl);
		await this.utils.click(IFRAME.SELECTORS.MAIN_BUTTON);
		await this.utils.click(IFRAME.SELECTORS.GOOGLE);
		await this.page.goBack();
		await this.utils.click(SIDEMENU.SELECTORS.DASHBOARD);
		await this.page.waitFor(500);
		const messagesCountAfter = await this.page.$eval(DASHBOARD.SELECTORS.SESSIONS_PAST_30_DAYS_NUMBER, (text) => text.innerText);
		// console.log('before', messagesCountBefore);
		// console.log('after ', messagesCountAfter);
		const addedOneMessage = Number(messagesCountBefore) + 1 === Number(messagesCountAfter) ? true : false;
		return addedOneMessage;
	}

	public async botsCountDivExist (): Promise<boolean> {
		await this.utils.click(SIDEMENU.SELECTORS.DASHBOARD);
		return (await this.page.$(DASHBOARD.SELECTORS.BOTS_COUNT_DIV)) !== null;
	}
	public async botsCountDivText (): Promise<string> {
		await this.utils.click(SIDEMENU.SELECTORS.DASHBOARD);
		return this.page.$eval(DASHBOARD.SELECTORS.BOTS_COUNT_TEXT, (text) => text.innerText);
	}
	public async botsCount (): Promise<boolean> {
		await this.utils.click(SIDEMENU.SELECTORS.DASHBOARD);
		await this.page.waitForSelector(DASHBOARD.SELECTORS.BOTS_COUNT_TEXT);
		const botsCountText = await this.page.$eval(DASHBOARD.SELECTORS.BOTS_COUNT_TEXT, (text) => text.innerText);
		const botsCount = botsCountText.substr(0, 2);
		await this.utils.click(SIDEMENU.SELECTORS.BOTS);
		const botsCountsReal = await this.page.$$eval(BOT_SECTION.SELECTORS.ALL_BOTS, (bots) => bots.length);
		const botsCountIsRight = Number(botsCountsReal) - 1 === Number(botsCount) ? true : false;
		return botsCountIsRight;
	}

	public async platformStatusText (): Promise<string> {
		await this.utils.click(SIDEMENU.SELECTORS.DASHBOARD);
		return this.page.$eval(DASHBOARD.SELECTORS.PLATFORM_STATUS_DIV_TEXT, (text) => text.innerText);
	}
	public async platformsList (): Promise<any> {
		const platformsList = [];
		const platformElement = await this.page.$$(DASHBOARD.SELECTORS.PLATFORMS_LIST);
		for (const platform of platformElement) {
			const platformInnerText = await (await platform.getProperty('innerText')).jsonValue();
			platformsList.push(platformInnerText);
		}
		return platformsList;
	}
	public async troublesText (): Promise<string> {
		await this.utils.click(SIDEMENU.SELECTORS.DASHBOARD);
		return this.page.$eval(DASHBOARD.SELECTORS.HAVING_TROUBLES, (text) => text.innerText);
	}
	public async contactUsLink (): Promise<string> {
		await this.utils.click(SIDEMENU.SELECTORS.DASHBOARD);
		await this.utils.click(DASHBOARD.SELECTORS.CONTACT_US);
		await this.page.waitForSelector(DASHBOARD.SELECTORS.ONE_DIV_FROM_LINKED_PAGE);
		const url = this.page.url();
		await this.page.goBack();
		return url;
	}

	public async chatBotTitle (): Promise<string> {
		await this.utils.click(SIDEMENU.SELECTORS.DASHBOARD);
		const frame = await this.page.frames().find((iframe) => iframe.url() === 'https://app.iox.bot/iox-chatbot/chatwindow');
		const botName = await frame.$eval(DASHBOARD.BOT.NAME, (name) => name.innerText);
		return botName;
	}
	public async chatBotByIOX_URL (): Promise<string> {
		await this.utils.click(SIDEMENU.SELECTORS.DASHBOARD);
		const frame = await this.page.frames().find((iframe) => iframe.url() === 'https://app.iox.bot/iox-chatbot/chatwindow');
		const byIOXButton = await frame.$(DASHBOARD.BOT.BYIOX_LINK);
		await byIOXButton.click();
		await this.page.waitFor(2000); // !
		const pages = await this.browser.pages();
		await pages[2].waitForSelector('#tmp_button-91792');
		const url = await pages[2].url();
		return url;
	}
}
