import { BOT_SECTION } from '../helpers/constants/botsSectionConstants.js';
import { DASHBOARD } from '../helpers/constants/dashboardConstants.js';
import { NAVBAR } from '../helpers/constants/navbarConstants.js';
import Utils from '../helpers/utils';
import LoginPage from './loginPagePO';

export default class BotSection {
	private page: any;
	private utils: any;
	private loginPage: any;

	constructor(page) {
		this.page = page;
		this.utils = new Utils(page);
		this.loginPage = new LoginPage(page);
	}

	public async createBots(): Promise<boolean> {
		for (let i = 0; i < 3; i++) {
			await this.utils.createFlowBot('C69');
			// Location Question
			await this.page.waitForSelector(BOT_SECTION.SELECTORS.ADD_SUB_DIALOG, { visible: true });
			await this.page.click(BOT_SECTION.SELECTORS.ADD_SUB_DIALOG);
			await this.page.type(BOT_SECTION.SELECTORS.ENTER_QUESTION_INPUT, 'Where are you from?');
			await this.page.click(BOT_SECTION.SELECTORS.ADD_ON);
			await this.page.waitForSelector(BOT_SECTION.SELECTORS.CHOOSE_QUESTION_TYPE, { visible: true });
			await this.page.select(BOT_SECTION.SELECTORS.CHOOSE_QUESTION_TYPE, 'Location picker');
			await this.page.click(BOT_SECTION.SELECTORS.QUESTION_SAVE_BUTTON);
			await this.page.waitForSelector(BOT_SECTION.SELECTORS.QUESTION_SAVE_BUTTON, { hidden: true });
		}
		return true;
	}
	public async createBotsAndCheckCount(): Promise<boolean> {
		await this.page.click(NAVBAR.SELECTORS.DASHBOARD);
		let botsCountText = await this.page.$eval(DASHBOARD.SELECTORS.BOTS_COUNT_TEXT, (text) => text.innerText);
		const botsCountBefore = botsCountText.substr(0, 2);
		for (let i = 0; i < 10; i++) {
			await this.utils.createFlowBot('testBotForC282');
		}
		await this.page.waitForSelector(NAVBAR.SELECTORS.DASHBOARD);
		await this.page.click(NAVBAR.SELECTORS.DASHBOARD);
		await this.page.waitForSelector(DASHBOARD.SELECTORS.BOTS_COUNT_TEXT, { visible: true });
		botsCountText = await this.page.$eval(DASHBOARD.SELECTORS.BOTS_COUNT_TEXT, (text) => text.innerText);
		const botsCountAfter = botsCountText.substr(0, 2);
		const botsCountIsRight = Number(botsCountBefore) + 10 === Number(botsCountAfter) ? true : false;
		return botsCountIsRight;
	}

	public async getDefaultSectionTitle(): Promise<string> {
		await this.loginPage.logOut();
		await this.loginPage.logIn();
		return this.page.title();
	}
	public async getDefaultSectionURL(): Promise<string> {
		const url = this.page.url();
		const endOfUrl = url.substr(url.length - 4, 3);
		return endOfUrl;
	}
	public async checkDashboardSectionIsActive(): Promise<any> {
		const dashboardSection = await this.page.$(NAVBAR.SELECTORS.DASHBOARD);
		const className = await dashboardSection.getProperty('className');
		const classNameIncludedActive = String(className).includes('active');
		return classNameIncludedActive;
	}

	public async getBotSectionTitle(): Promise<string> {
		await this.page.click(NAVBAR.SELECTORS.BOTS);
		return this.page.title();
	}
	public async getBotSectionURL(): Promise<string> {
		await this.page.click(NAVBAR.SELECTORS.BOTS);
		await this.utils.reload();
		const url = this.page.url();
		const endOfUrl = url.substr(url.length - 4);
		return endOfUrl;
	}
	public async getBotSectionIconText(): Promise<string> {
		await this.page.click(NAVBAR.SELECTORS.BOTS);
		return this.page.$eval(NAVBAR.SELECTORS.BOTS, (text) => text.innerText);
	}

	public async getDashboardSectionTitle(): Promise<string> {
		await this.page.click(NAVBAR.SELECTORS.DASHBOARD);
		return this.page.title();
	}
	public async getDashboardSectionURL(): Promise<string> {
		await this.page.click(NAVBAR.SELECTORS.DASHBOARD);
		await this.utils.reload();
		const url = this.page.url();
		const endOfUrl = url.substr(url.length - 9);
		return endOfUrl;
	}
	public async getDashboardSectionIconText(): Promise<boolean> {
		await this.page.click(NAVBAR.SELECTORS.DASHBOARD);
		const text = this.page.$eval(NAVBAR.SELECTORS.DASHBOARD, (text) => text.innerText);
		return text;
	}

	public async getKnowledgeSectionTitle(): Promise<string> {
		await this.page.click(NAVBAR.SELECTORS.KNOWLEDGE);
		return this.page.title();
	}
	public async getKnowledgeSectionURL(): Promise<string> {
		await this.page.click(NAVBAR.SELECTORS.KNOWLEDGE);
		await this.utils.reload();
		const url = this.page.url();
		const endOfUrl = url.substr(url.length - 9);
		return endOfUrl;
	}
	public async getKnowledgeSectionIconText(): Promise<boolean> {
		await this.page.click(NAVBAR.SELECTORS.KNOWLEDGE);
		const text = this.page.$eval(NAVBAR.SELECTORS.KNOWLEDGE, (text) => text.innerText);
		return text;
	}
	public async knowledgeSectionIsDisbled(): Promise<boolean> {
		const knowledgeSection = await this.page.$(NAVBAR.SELECTORS.KNOWLEDGE);
		const className = await knowledgeSection.getProperty('className');
		const classNameNotIncludedEnabled = String(className).includes('site-menu-item-enabled');
		return !classNameNotIncludedEnabled;
	}

	public async getApiConnectorSectionTitle(): Promise<string> {
		await this.page.click(NAVBAR.SELECTORS.API_CONNECTOR);
		return this.page.title();
	}
	public async getApiConnectorSectionURL(): Promise<string> {
		await this.page.click(NAVBAR.SELECTORS.API_CONNECTOR);
		await this.utils.reload();
		const url = this.page.url();
		const endOfUrl = url.substr(url.length - 9);
		return endOfUrl;
	}
	public async getApiConnectorSectionIconText(): Promise<boolean> {
		await this.page.click(NAVBAR.SELECTORS.API_CONNECTOR);
		const text = this.page.$eval(NAVBAR.SELECTORS.API_CONNECTOR, (text) => text.innerText);
		return text;
	}

	public async getHelpSectionTitle(): Promise<string> {
		await this.page.click(NAVBAR.SELECTORS.HELP);
		return this.page.title();
	}
	public async getHelpSectionURL(): Promise<string> {
		await this.page.click(NAVBAR.SELECTORS.HELP);
		await this.utils.reload();
		const url = this.page.url();
		const endOfUrl = url.substr(url.length - 4);
		return endOfUrl;
	}
	public async getHelpSectionIconText(): Promise<boolean> {
		await this.page.click(NAVBAR.SELECTORS.HELP);
		const text = this.page.$eval(NAVBAR.SELECTORS.HELP, (text) => text.innerText);
		return text;
	}

	public async deleteNotTrainedFlowBot(): Promise<boolean> {
		await this.utils.createFlowBot('C6163');
		await this.utils.deleteBot('C6163');
		// verify that bot is deleted
		await this.page.waitForSelector(NAVBAR.SELECTORS.BOTS);
		await this.page.click(NAVBAR.SELECTORS.BOTS);
		const botIsExist = await this.utils.botIsExist('C6163');
		return !botIsExist;
	}
	public async cancelDeleteNotTrainedFlowBot(): Promise<boolean> {
		await this.utils.createFlowBot('C6163');
		// cancel deleting bot
		await this.page.waitForSelector(NAVBAR.SELECTORS.BOTS);
		await this.page.click(NAVBAR.SELECTORS.BOTS);
		await this.utils.clickOnBotDeleteButton('C6163');
		await this.page.waitForSelector(BOT_SECTION.SELECTORS.NO_BUTTON_ON_DELETE);
		await this.page.click(BOT_SECTION.SELECTORS.NO_BUTTON_ON_DELETE);
		// verify that bot is NOT deleted
		await this.page.click(NAVBAR.SELECTORS.BOTS);
		const botIsNotDeleted = await this.utils.botIsExist('C6163');
		// delete Bot
		await this.utils.deleteBot('C6163');
		return botIsNotDeleted;
	}
	public async deleteNotTrainedFlowBotNotification(): Promise<boolean> {
		await this.utils.createFlowBot('C6163');
		await this.utils.deleteBot('C6163');
		await this.page.waitForSelector(BOT_SECTION.SELECTORS.DELETE_BOT_NOTIFICATION);
		const text = await this.page.$eval(BOT_SECTION.SELECTORS.DELETE_BOT_NOTIFICATION, (text) => text.innerText);
		return text;
	}

	public async deleteTrainedFlowBotButtonDisabled(): Promise<boolean> {
		await this.utils.createFlowBot('C6164');
		await this.utils.trainBot();
		// type wrong word (not 'delete') and verify that button is remain disabled
		await this.page.waitForSelector(NAVBAR.SELECTORS.BOTS);
		await this.page.click(NAVBAR.SELECTORS.BOTS);
		await this.utils.clickOnBotDeleteButton('C6164');
		const buttonIsDisabled = (await this.page.$(BOT_SECTION.SELECTORS.DISABLED_DELETE_BUTTON)) !== null;
		await this.page.waitForSelector(BOT_SECTION.SELECTORS.DELETE_TRAINED_BOT_INPUT);
		await this.page.type(BOT_SECTION.SELECTORS.DELETE_TRAINED_BOT_INPUT, 'de');
		const buttonIsStillDisabled = (await this.page.$(BOT_SECTION.SELECTORS.DISABLED_DELETE_BUTTON)) !== null;
		await this.page.click(BOT_SECTION.SELECTORS.CANCEL_BUTTON_ON_DELETE);
		return buttonIsStillDisabled;
	}
	public async deleteTrainedFlowBotCancel(): Promise<boolean> {
		// cancel deleting Bot
		await this.page.waitForSelector(NAVBAR.SELECTORS.BOTS);
		await this.page.click(NAVBAR.SELECTORS.BOTS);
		await this.utils.clickOnBotDeleteButton('C6164');
		await this.page.waitForSelector(BOT_SECTION.SELECTORS.CANCEL_BUTTON_ON_DELETE);
		await this.page.click(BOT_SECTION.SELECTORS.CANCEL_BUTTON_ON_DELETE);
		// verify that bot is NOT deleted
		await this.page.waitForSelector(NAVBAR.SELECTORS.BOTS);
		await this.page.click(NAVBAR.SELECTORS.BOTS);
		const botIsExist = await this.utils.botIsExist('C6164');
		return botIsExist;
	}
	public async deleteTrainedFlowBot(): Promise<boolean> {
		await this.utils.deleteTrainedBot('C6164');
		await this.page.waitForSelector(BOT_SECTION.SELECTORS.DELETE_BOT_NOTIFICATION);
		// verify that bot is deleted
		await this.page.click(NAVBAR.SELECTORS.BOTS);
		const botIsExist = await this.utils.botIsExist('C6164');
		return !botIsExist;
	}
	public async deleteTrainedFlowBotNotification(): Promise<boolean> {
		await this.utils.createFlowBot('C6164');
		await this.utils.trainBot();
		await this.utils.deleteTrainedBot('C6164');
		await this.page.waitForSelector(BOT_SECTION.SELECTORS.DELETE_BOT_NOTIFICATION);
		const text = await this.page.$eval(BOT_SECTION.SELECTORS.DELETE_BOT_NOTIFICATION, (text) => text.innerText);
		return text;
	}

	public async deleteNotTrainedNLPBot(): Promise<boolean> {
		await this.utils.createNLPBot('C6165');
		await this.utils.deleteBot('C6165');
		// verify that bot is deleted
		await this.page.waitForSelector(NAVBAR.SELECTORS.BOTS);
		await this.page.click(NAVBAR.SELECTORS.BOTS);
		const botIsExist = await this.utils.botIsExist('C6165');
		return !botIsExist;
	}
	public async cancelDeleteNotTrainedNLPBot(): Promise<boolean> {
		await this.utils.createNLPBot('C6165');
		// cancel deleting Bot
		await this.page.waitForSelector(NAVBAR.SELECTORS.BOTS);
		await this.page.click(NAVBAR.SELECTORS.BOTS);
		await this.utils.clickOnBotDeleteButton('C6165');
		await this.page.waitForSelector(BOT_SECTION.SELECTORS.NO_BUTTON_ON_DELETE);
		await this.page.click(BOT_SECTION.SELECTORS.NO_BUTTON_ON_DELETE);
		// verify that bot is NOT deleted
		await this.page.click(NAVBAR.SELECTORS.BOTS);
		const botIsNotDeleted = await this.utils.botIsExist('C6165');
		// delete Bot
		await this.utils.deleteBot('C6165');
		return botIsNotDeleted;
	}
	public async deleteNotTrainedNLPBotNotification(): Promise<boolean> {
		await this.utils.createNLPBot('C6165');
		await this.utils.deleteBot('C6165');
		await this.page.waitForSelector(BOT_SECTION.SELECTORS.DELETE_BOT_NOTIFICATION);
		const text = await this.page.$eval(BOT_SECTION.SELECTORS.DELETE_BOT_NOTIFICATION, (text) => text.innerText);
		return text;
	}

	public async deleteTrainedNLPBotButtonDisabled(): Promise<boolean> {
		await this.utils.createNLPBot('C6166');
		await this.utils.integrateBotToGoogle();
		await this.page.waitFor(1000); //!
		await this.utils.trainBot();
		// type wrong word (not 'delete') and verify that button is remain disabled
		await this.page.waitFor(NAVBAR.SELECTORS.BOTS);
		await this.page.click(NAVBAR.SELECTORS.BOTS);
		await this.utils.clickOnBotDeleteButton('C6166');
		const buttonIsDisabled = await this.page.$(BOT_SECTION.SELECTORS.DISABLED_DELETE_BUTTON) !== null;
		await this.page.waitForSelector(BOT_SECTION.SELECTORS.DELETE_TRAINED_BOT_INPUT);
		await this.page.type(BOT_SECTION.SELECTORS.DELETE_TRAINED_BOT_INPUT, 'de');
		const buttonIsStillDisabled = (await this.page.$(BOT_SECTION.SELECTORS.DISABLED_DELETE_BUTTON)) !== null;
		await this.page.click(BOT_SECTION.SELECTORS.CANCEL_BUTTON_ON_DELETE);
		return buttonIsStillDisabled;
	}
	public async deleteTrainedNLPBotCancel(): Promise<boolean> {
		// cancel deleting Bot
		await this.page.waitForSelector(NAVBAR.SELECTORS.BOTS);
		await this.page.click(NAVBAR.SELECTORS.BOTS);
		await this.utils.clickOnBotDeleteButton('C6166');
		await this.page.waitForSelector(BOT_SECTION.SELECTORS.CANCEL_BUTTON_ON_DELETE);
		await this.page.click(BOT_SECTION.SELECTORS.CANCEL_BUTTON_ON_DELETE);
		// verify that bot is NOT deleted
		await this.page.waitForSelector(NAVBAR.SELECTORS.BOTS);
		await this.page.click(NAVBAR.SELECTORS.BOTS);
		const botIsExist = await this.utils.botIsExist('C6166');
		return botIsExist;
	}
	public async deleteTrainedNLPBot(): Promise<boolean> {
		await this.utils.deleteTrainedBot('C6166');
		await this.page.waitForSelector(BOT_SECTION.SELECTORS.DELETE_BOT_NOTIFICATION);
		// verify that bot is deleted
		await this.page.click(NAVBAR.SELECTORS.BOTS);
		const botIsExist = await this.utils.botIsExist('C6166');
		return !botIsExist;
	}
	public async deleteTrainedNLPBotNotification(): Promise<boolean> {
		await this.utils.createNLPBot('C6166');
		await this.utils.integrateBotToGoogle();
		await this.page.waitFor(1000); //!
		await this.utils.trainBot();
		await this.utils.deleteTrainedBot('C6166');
		await this.page.waitForSelector(BOT_SECTION.SELECTORS.DELETE_BOT_NOTIFICATION);
		const text = await this.page.$eval(BOT_SECTION.SELECTORS.DELETE_BOT_NOTIFICATION, (text) => text.innerText);
		return text;
	}
}
