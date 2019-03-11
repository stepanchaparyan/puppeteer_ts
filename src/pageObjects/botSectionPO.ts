import { BOT_SECTION } from '../helpers/constants/botsSectionConstants.js';
import { DASHBOARD } from '../helpers/constants/dashboardConstants.js';
import { NAVBAR } from '../helpers/constants/navbarConstants.js';
import Utils from '../helpers/utils';

export default class BotSection {
	private page: any;
	private utils: any;

	constructor(page) {
		this.page = page;
		this.utils = new Utils(page);
	}

	public async createBotsAndCheckCount(): Promise<boolean> {
		await this.page.click(NAVBAR.SELECTORS.DASHBOARD);
		await this.page.waitFor(500);
		let botsCountText = await this.page.$eval(DASHBOARD.SELECTORS.BOTS_COUNT_TEXT, (text) => text.innerText);
		const botsCountBefore = botsCountText.substr(0, 2);
		for (let i = 0; i < 10; i++) {
			await this.utils.createBot('testBotForC282');
		}
		await this.page.waitFor(500);
		await this.page.click(NAVBAR.SELECTORS.DASHBOARD);
		await this.page.waitFor(500);
		botsCountText = await this.page.$eval(DASHBOARD.SELECTORS.BOTS_COUNT_TEXT, (text) => text.innerText);
		const botsCountAfter = botsCountText.substr(0, 2);
		const botsCountIsRight = Number(botsCountBefore) + 10 === Number(botsCountAfter) ? true : false;
		return botsCountIsRight;
	}

	public async getDefaultDashboardSectionTitle(): Promise<string> {
		return this.page.title();
	}
	public async getDefaultDashboardSectionURL(): Promise<string> {
		await this.utils.reload();
		return this.page.url();
	}
	public async checkMenuBarUIDefault(): Promise<boolean> {
		const menuBarDiv = await this.page.$(NAVBAR.SELECTORS.MENUBAR);
		await this.utils.compareScreenshots('dashboard', 'menuBarDefault', menuBarDiv);
		return true;
	}
	public async getBotSectionTitle(): Promise<string> {
		await this.page.click(NAVBAR.SELECTORS.BOTS);
		return this.page.title();
	}
	public async getBotSectionURL(): Promise<string> {
		await this.page.click(NAVBAR.SELECTORS.BOTS);
		await this.utils.reload();
		return this.page.url();
	}
	public async checkMenuBarUIBotSelected(): Promise<boolean> {
		await this.page.click(NAVBAR.SELECTORS.BOTS);
		const menuBarDiv = await this.page.$(NAVBAR.SELECTORS.MENUBAR);
		await this.utils.compareScreenshots('dashboard', 'menuBarBots', menuBarDiv);
		return true;
	}
	public async getDashboardSectionTitle(): Promise<string> {
		await this.page.click(NAVBAR.SELECTORS.DASHBOARD);
		return this.page.title();
	}
	public async getDashboardSectionURL(): Promise<string> {
		await this.page.click(NAVBAR.SELECTORS.DASHBOARD);
		await this.utils.reload();
		return this.page.url();
	}
	public async checkMenuBarUIDashboardSelected(): Promise<boolean> {
		await this.page.click(NAVBAR.SELECTORS.DASHBOARD);
		const menuBarDiv = await this.page.$(NAVBAR.SELECTORS.MENUBAR);
		await this.utils.compareScreenshots('dashboard', 'menuBarDashboard', menuBarDiv);
		return true;
	}

	public async getKnowledgeSectionTitle(): Promise<string> {
		await this.page.click(NAVBAR.SELECTORS.KNOWLEDGE);
		return this.page.title();
	}
	public async getKnowledgeSectionURL(): Promise<string> {
		await this.page.click(NAVBAR.SELECTORS.KNOWLEDGE);
		await this.utils.reload();
		return this.page.url();
	}
	public async checkMenuBarUIKnowledgeSelected(): Promise<boolean> {
		await this.page.click(NAVBAR.SELECTORS.KNOWLEDGE);
		const menuBarDiv = await this.page.$(NAVBAR.SELECTORS.MENUBAR);
		await this.utils.compareScreenshots('dashboard', 'menuBarKnowledge', menuBarDiv);
		return true;
	}

	public async getApiConnectorSectionTitle(): Promise<string> {
		await this.page.click(NAVBAR.SELECTORS.API_CONNECTOR);
		return this.page.title();
	}
	public async getApiConnectorSectionURL(): Promise<string> {
		await this.page.click(NAVBAR.SELECTORS.API_CONNECTOR);
		await this.utils.reload();
		return this.page.url();
	}
	public async checkMenuBarUIApiConnectorSelected(): Promise<boolean> {
		await this.page.click(NAVBAR.SELECTORS.API_CONNECTOR);
		const menuBarDiv = await this.page.$(NAVBAR.SELECTORS.MENUBAR);
		await this.utils.compareScreenshots('dashboard', 'menuBarApiConnector', menuBarDiv);
		return true;
	}

	public async getHelpSectionTitle(): Promise<string> {
		await this.page.click(NAVBAR.SELECTORS.HELP);
		return this.page.title();
	}
	public async getHelpSectionURL(): Promise<string> {
		await this.page.click(NAVBAR.SELECTORS.HELP);
		await this.utils.reload();
		return this.page.url();
	}
	public async checkMenuBarUIHelpSelected(): Promise<boolean> {
		await this.page.click(NAVBAR.SELECTORS.HELP);
		const menuBarDiv = await this.page.$(NAVBAR.SELECTORS.MENUBAR);
		await this.utils.compareScreenshots('dashboard', 'menuBarHelp', menuBarDiv);
		return true;
	}

	public async createBots(): Promise<boolean> {
		for (let i = 0; i < 3; i++) {
			// * Create Bot
			await this.page.click(NAVBAR.SELECTORS.BOTS);
			await this.utils.clickOnCreateBotButton();
			await this.page.waitFor(800);
			await this.page.click(BOT_SECTION.SELECTORS.CREATE_FLOW_BOT);
			await this.page.click(BOT_SECTION.SELECTORS.CREATE_BOT_CONTINUE);
			await this.page.click(BOT_SECTION.SELECTORS.CREATE_WEB_CHAT_BOT);
			await this.page.waitFor(500);
			await this.page.type(BOT_SECTION.SELECTORS.BOT_NAME_INPUT, 'C69');
			await this.page.click(BOT_SECTION.SELECTORS.CREATE_BOT_BUTTON_AFTER_TYPE_NAME);
			// * Location
			await this.page.waitFor(1000);
			await this.page.click(BOT_SECTION.SELECTORS.ADD_SUB_DIALOG);
			await this.page.type(BOT_SECTION.SELECTORS.ENTER_QUESTION_INPUT, 'Where are you from?');
			await this.page.click(BOT_SECTION.SELECTORS.ADD_ON);
			await this.page.waitFor(500);
			await this.page.select(BOT_SECTION.SELECTORS.CHOOSE_QUESTION_TYPE, 'Location picker');
			await this.page.click(BOT_SECTION.SELECTORS.QUESTION_SAVE_BUTTON);
			await this.page.waitFor(1000);
		}
		return true;
	}

	public async deleteNotTrainedFlowBot(): Promise<boolean> {
		// create Bot
		await this.page.click(NAVBAR.SELECTORS.BOTS);
		await this.utils.clickOnCreateBotButton();
		await this.page.waitForSelector(BOT_SECTION.SELECTORS.CREATE_FLOW_BOT);
		await this.page.click(BOT_SECTION.SELECTORS.CREATE_FLOW_BOT);
		await this.page.click(BOT_SECTION.SELECTORS.CREATE_BOT_CONTINUE);
		await this.page.click(BOT_SECTION.SELECTORS.CREATE_WEB_CHAT_BOT);
		await this.page.waitForSelector(BOT_SECTION.SELECTORS.BOT_NAME_INPUT);
		await this.page.type(BOT_SECTION.SELECTORS.BOT_NAME_INPUT, 'C6163');
		await this.page.click(BOT_SECTION.SELECTORS.CREATE_BOT_BUTTON_AFTER_TYPE_NAME);
		await this.page.waitFor(700);
		// delete Bot
		await this.page.click(NAVBAR.SELECTORS.BOTS);
		const botNumber = await this.utils.getCorrespondingBotNumber('C6163');
		await this.page.waitForSelector(`body > app-root > div > iox-page-container > div > iox-bots > div > div:nth-child(${botNumber}) > iox-bot-item > div > div.bot-content > div.action-buttons.btn-group > button:nth-child(3) > i`);
		await this.page.click(`body > app-root > div > iox-page-container > div > iox-bots > div > div:nth-child(${botNumber}) > iox-bot-item > div > div.bot-content > div.action-buttons.btn-group > button:nth-child(3) > i`);
		await this.page.waitForSelector(BOT_SECTION.SELECTORS.YES_BUTTON_ON_DELETE);
		await this.page.click(BOT_SECTION.SELECTORS.YES_BUTTON_ON_DELETE);
		await this.page.waitFor(500);
		// verify that bot is deleted
		await this.page.click(NAVBAR.SELECTORS.BOTS);
		await this.utils.reload();
		const deletedBotNumber = await this.utils.getCorrespondingBotNumber('C6163');
		const botIsDeleted = await this.page.$(`body > app-root > div > iox-page-container > div > iox-bots > div > div:nth-child(${deletedBotNumber}) > iox-bot-item > div > div.bot-content > div.action-buttons.btn-group > button:nth-child(3) > i`) === null;
		return botIsDeleted;
	}
	public async deleteNotTrainedFlowBotNotificationIsVisible(): Promise<boolean> {
		// create Bot
		await this.page.click(NAVBAR.SELECTORS.BOTS);
		await this.utils.clickOnCreateBotButton();
		await this.page.waitForSelector(BOT_SECTION.SELECTORS.CREATE_FLOW_BOT);
		await this.page.click(BOT_SECTION.SELECTORS.CREATE_FLOW_BOT);
		await this.page.click(BOT_SECTION.SELECTORS.CREATE_BOT_CONTINUE);
		await this.page.click(BOT_SECTION.SELECTORS.CREATE_WEB_CHAT_BOT);
		await this.page.waitForSelector(BOT_SECTION.SELECTORS.BOT_NAME_INPUT);
		await this.page.type(BOT_SECTION.SELECTORS.BOT_NAME_INPUT, 'C6163');
		await this.page.click(BOT_SECTION.SELECTORS.CREATE_BOT_BUTTON_AFTER_TYPE_NAME);
		await this.page.waitFor(700);
		// delete Bot
		await this.page.click(NAVBAR.SELECTORS.BOTS);
		const botNumber = await this.utils.getCorrespondingBotNumber('C6163');
		await this.page.waitForSelector(`body > app-root > div > iox-page-container > div > iox-bots > div > div:nth-child(${botNumber}) > iox-bot-item > div > div.bot-content > div.action-buttons.btn-group > button:nth-child(3) > i`);
		await this.page.click(`body > app-root > div > iox-page-container > div > iox-bots > div > div:nth-child(${botNumber}) > iox-bot-item > div > div.bot-content > div.action-buttons.btn-group > button:nth-child(3) > i`);
		await this.page.waitForSelector(BOT_SECTION.SELECTORS.YES_BUTTON_ON_DELETE);
		await this.page.click(BOT_SECTION.SELECTORS.YES_BUTTON_ON_DELETE);
		await this.page.waitForSelector(BOT_SECTION.SELECTORS.DELETE_BOT_NOTIFICATION);
		const notificationForDelete = await this.page.$(BOT_SECTION.SELECTORS.DELETE_BOT_NOTIFICATION);
		await this.page.waitFor(500);
		await this.utils.compareScreenshots('flowBot', 'C6163notificationForDelete', notificationForDelete);
		return true;
	}
	public async cancelDeleteNotTrainedFlowBot(): Promise<boolean> {
		// create Bot
		await this.page.click(NAVBAR.SELECTORS.BOTS);
		await this.utils.clickOnCreateBotButton();
		await this.page.waitForSelector(BOT_SECTION.SELECTORS.CREATE_FLOW_BOT);
		await this.page.click(BOT_SECTION.SELECTORS.CREATE_FLOW_BOT);
		await this.page.click(BOT_SECTION.SELECTORS.CREATE_BOT_CONTINUE);
		await this.page.click(BOT_SECTION.SELECTORS.CREATE_WEB_CHAT_BOT);
		await this.page.waitForSelector(BOT_SECTION.SELECTORS.BOT_NAME_INPUT);
		await this.page.type(BOT_SECTION.SELECTORS.BOT_NAME_INPUT, 'C6163');
		await this.page.click(BOT_SECTION.SELECTORS.CREATE_BOT_BUTTON_AFTER_TYPE_NAME);
		await this.page.waitFor(1000);
		// cancel delete Bot
		await this.page.click(NAVBAR.SELECTORS.BOTS);
		let botNumber = await this.utils.getCorrespondingBotNumber('C6163');
		await this.page.waitForSelector(`body > app-root > div > iox-page-container > div > iox-bots > div > div:nth-child(${botNumber}) > iox-bot-item > div > div.bot-content > div.action-buttons.btn-group > button:nth-child(3) > i`);
		await this.page.click(`body > app-root > div > iox-page-container > div > iox-bots > div > div:nth-child(${botNumber}) > iox-bot-item > div > div.bot-content > div.action-buttons.btn-group > button:nth-child(3) > i`);
		const alert = await this.page.$(BOT_SECTION.SELECTORS.DELETE_ALERT_FLOW_BOT);
		await this.page.waitFor(700);
		await this.utils.compareScreenshots('flowBot', 'C6163alert', alert);
		await this.page.click(BOT_SECTION.SELECTORS.NO_BUTTON_ON_DELETE);
		// verify that bot is NOT deleted
		await this.page.click(NAVBAR.SELECTORS.BOTS);
		await this.utils.reload();
		botNumber = await this.utils.getCorrespondingBotNumber('C6163');
		const botIsNotDeleted = await this.page.$(`body > app-root > div > iox-page-container > div > iox-bots > div > div:nth-child(${botNumber}) > iox-bot-item > div > div.bot-content > div.action-buttons.btn-group > button:nth-child(3) > i`) !== null;
		// delete Bot
		await this.page.click(`body > app-root > div > iox-page-container > div > iox-bots > div > div:nth-child(${botNumber}) > iox-bot-item > div > div.bot-content > div.action-buttons.btn-group > button:nth-child(3) > i`);
		await this.page.click(BOT_SECTION.SELECTORS.YES_BUTTON_ON_DELETE);
		return botIsNotDeleted;
	}

	public async deleteTrainedFlowBotButtonDisabled(): Promise<boolean> {
		// create Bot
		await this.page.click(NAVBAR.SELECTORS.BOTS);
		await this.utils.clickOnCreateBotButton();
		await this.page.waitForSelector(BOT_SECTION.SELECTORS.CREATE_FLOW_BOT);
		await this.page.click(BOT_SECTION.SELECTORS.CREATE_FLOW_BOT);
		await this.page.click(BOT_SECTION.SELECTORS.CREATE_BOT_CONTINUE);
		await this.page.click(BOT_SECTION.SELECTORS.CREATE_WEB_CHAT_BOT);
		await this.page.waitForSelector(BOT_SECTION.SELECTORS.BOT_NAME_INPUT);
		await this.page.type(BOT_SECTION.SELECTORS.BOT_NAME_INPUT, 'C6164');
		await this.page.click(BOT_SECTION.SELECTORS.CREATE_BOT_BUTTON_AFTER_TYPE_NAME);
		await this.page.waitFor(700);
		// Train Bot
		await this.page.click(BOT_SECTION.SELECTORS.RUN);
		await this.page.waitFor(300);
		await this.page.click(BOT_SECTION.SELECTORS.TRAIN);
		await this.page.waitFor(210000);
		await this.page.waitForSelector(BOT_SECTION.SELECTORS.PROGRESS_BAR, { hidden: true });
		await this.page.waitFor(1000);
		// type wrong word (not 'delete') and verify that button is remain disabled
		await this.page.click(NAVBAR.SELECTORS.BOTS);
		await this.page.waitFor(500);
		const botNumber = await this.utils.getCorrespondingBotNumber('C6164');
		await this.page.waitFor(500);
		await this.page.click(`body > app-root > div > iox-page-container > div > iox-bots > div > div:nth-child(${botNumber}) > iox-bot-item > div > div.bot-content > div.action-buttons.btn-group > button:nth-child(3) > i`);
		await this.page.waitFor(500);
		const buttonIsDisabled = await this.page.$('body > modal-container > div > div > div > form > button.btn.btn-default[disabled]') !== null;
		await this.page.waitFor(500);
		await this.page.type(BOT_SECTION.SELECTORS.DELETE_TRAINED_BOT_INPUT,'de');
		await this.page.waitFor(500);
		const buttonIsStillDisabled = await this.page.$('body > modal-container > div > div > div > form > button.btn.btn-default[disabled]') !== null;
		await this.page.click(BOT_SECTION.SELECTORS.CANCEL_BUTTON_ON_DELETE);
		return buttonIsStillDisabled;
	}
	public async deleteTrainedFlowBotCancel(): Promise<boolean> {
		// cancel deleting Bot
		await this.page.click(NAVBAR.SELECTORS.BOTS);
		const botNumber = await this.utils.getCorrespondingBotNumber('C6164');
		await this.page.waitFor(500);
		await this.page.click(`body > app-root > div > iox-page-container > div > iox-bots > div > div:nth-child(${botNumber}) > iox-bot-item > div > div.bot-content > div.action-buttons.btn-group > button:nth-child(3) > i`);
		await this.page.waitFor(500);
		const alert = await this.page.$(BOT_SECTION.SELECTORS.DELETE_ALERT_FLOW_BOT);
		await this.page.waitFor(700);
		await this.utils.compareScreenshots('flowBot', 'C6164alert', alert);
		await this.page.click(BOT_SECTION.SELECTORS.CANCEL_BUTTON_ON_DELETE);
		// verify that bot is NOT deleted
		await this.page.click(NAVBAR.SELECTORS.BOTS);
		await this.utils.reload();
		const thisBotNumber = await this.utils.getCorrespondingBotNumber('C6164');
		const botIsNotDeleted = await this.page.$(`body > app-root > div > iox-page-container > div > iox-bots > div > div:nth-child(${thisBotNumber}) > iox-bot-item > div > div.bot-content > div.action-buttons.btn-group > button:nth-child(3) > i`) !== null;
		return botIsNotDeleted;
	}
	public async deleteTrainedFlowBot(): Promise<boolean> {
		// delete Bot
		await this.page.click(NAVBAR.SELECTORS.BOTS);
		const botNumber = await this.utils.getCorrespondingBotNumber('C6164');
		await this.page.waitFor(500);
		await this.page.click(`body > app-root > div > iox-page-container > div > iox-bots > div > div:nth-child(${botNumber}) > iox-bot-item > div > div.bot-content > div.action-buttons.btn-group > button:nth-child(3) > i`);
		await this.page.waitFor(500);
		await this.page.type(BOT_SECTION.SELECTORS.DELETE_TRAINED_BOT_INPUT,'delete');
		await this.page.waitFor(700);
		await this.page.click(BOT_SECTION.SELECTORS.DELETE_TRAINED_BOT_DELETE_BUTTON);
		await this.page.waitFor(700);
		await this.page.waitForSelector(BOT_SECTION.SELECTORS.DELETE_BOT_NOTIFICATION);
		const notificationForDelete = await this.page.$(BOT_SECTION.SELECTORS.DELETE_BOT_NOTIFICATION);
		await this.page.waitFor(500);
		await this.utils.compareScreenshots('flowBot', 'C6164notificationForDelete', notificationForDelete);
		// verify that bot is deleted
		await this.page.click(NAVBAR.SELECTORS.BOTS);
		await this.utils.reload();
		await this.page.waitFor(500);
		const deletedBotNumber = await this.utils.getCorrespondingBotNumber('C6164');
		const botIsDeleted = await this.page.$(`body > app-root > div > iox-page-container > div > iox-bots > div > div:nth-child(${deletedBotNumber}) > iox-bot-item > div > div.bot-content > div.action-buttons.btn-group > button:nth-child(3) > i`) === null;
		return botIsDeleted;
	}

	public async deleteNotTrainedNLPBot(): Promise<boolean> {
		// create Bot
		await this.page.click(NAVBAR.SELECTORS.BOTS);
		await this.utils.clickOnCreateBotButton();
		await this.page.waitForSelector(BOT_SECTION.SELECTORS.CREATE_NLP_BOT);
		await this.page.click(BOT_SECTION.SELECTORS.CREATE_NLP_BOT);
		await this.page.waitForSelector(BOT_SECTION.SELECTORS.BOT_NAME_INPUT);
		await this.page.type(BOT_SECTION.SELECTORS.BOT_NAME_INPUT, 'C6165');
		await this.page.click(BOT_SECTION.SELECTORS.CREATE_BOT_BUTTON_AFTER_TYPE_NAME);
		await this.page.waitFor(700);
		// delete Bot
		await this.page.click(NAVBAR.SELECTORS.BOTS);
		const botNumber = await this.utils.getCorrespondingBotNumber('C6165');
		await this.page.waitForSelector(`body > app-root > div > iox-page-container > div > iox-bots > div > div:nth-child(${botNumber}) > iox-bot-item > div > div.bot-content > div.action-buttons.btn-group > button:nth-child(3) > i`);
		await this.page.click(`body > app-root > div > iox-page-container > div > iox-bots > div > div:nth-child(${botNumber}) > iox-bot-item > div > div.bot-content > div.action-buttons.btn-group > button:nth-child(3) > i`);
		await this.page.waitForSelector(BOT_SECTION.SELECTORS.YES_BUTTON_ON_DELETE);
		await this.page.click(BOT_SECTION.SELECTORS.YES_BUTTON_ON_DELETE);
		await this.page.waitFor(500);
		// verify that bot is deleted
		await this.page.click(NAVBAR.SELECTORS.BOTS);
		await this.utils.reload();
		const deletedBotNumber = await this.utils.getCorrespondingBotNumber('C6165');
		const botIsDeleted = await this.page.$(`body > app-root > div > iox-page-container > div > iox-bots > div > div:nth-child(${deletedBotNumber}) > iox-bot-item > div > div.bot-content > div.action-buttons.btn-group > button:nth-child(3) > i`) === null;
		return botIsDeleted;
	}
	public async deleteNotTrainedNLPBotNotificationIsVisible(): Promise<boolean> {
		// create Bot
		await this.page.click(NAVBAR.SELECTORS.BOTS);
		await this.utils.clickOnCreateBotButton();
		await this.page.waitForSelector(BOT_SECTION.SELECTORS.CREATE_NLP_BOT);
		await this.page.click(BOT_SECTION.SELECTORS.CREATE_NLP_BOT);
		await this.page.waitForSelector(BOT_SECTION.SELECTORS.BOT_NAME_INPUT);
		await this.page.type(BOT_SECTION.SELECTORS.BOT_NAME_INPUT, 'C6165');
		await this.page.click(BOT_SECTION.SELECTORS.CREATE_BOT_BUTTON_AFTER_TYPE_NAME);
		await this.page.waitFor(700);
		// delete Bot
		await this.page.click(NAVBAR.SELECTORS.BOTS);
		const botNumber = await this.utils.getCorrespondingBotNumber('C6165');
		await this.page.waitForSelector(`body > app-root > div > iox-page-container > div > iox-bots > div > div:nth-child(${botNumber}) > iox-bot-item > div > div.bot-content > div.action-buttons.btn-group > button:nth-child(3) > i`);
		await this.page.click(`body > app-root > div > iox-page-container > div > iox-bots > div > div:nth-child(${botNumber}) > iox-bot-item > div > div.bot-content > div.action-buttons.btn-group > button:nth-child(3) > i`);
		await this.page.waitForSelector(BOT_SECTION.SELECTORS.YES_BUTTON_ON_DELETE);
		await this.page.click(BOT_SECTION.SELECTORS.YES_BUTTON_ON_DELETE);
		await this.page.waitForSelector(BOT_SECTION.SELECTORS.DELETE_BOT_NOTIFICATION);
		const notificationForDelete = await this.page.$(BOT_SECTION.SELECTORS.DELETE_BOT_NOTIFICATION);
		await this.page.waitFor(500);
		await this.utils.compareScreenshots('NLPBot', 'C6165notificationForDelete', notificationForDelete);
		return true;
	}
	public async cancelDeleteNotTrainedNLPBot(): Promise<boolean> {
		// create Bot
		await this.page.click(NAVBAR.SELECTORS.BOTS);
		await this.utils.clickOnCreateBotButton();
		await this.page.waitForSelector(BOT_SECTION.SELECTORS.CREATE_NLP_BOT);
		await this.page.click(BOT_SECTION.SELECTORS.CREATE_NLP_BOT);
		await this.page.waitForSelector(BOT_SECTION.SELECTORS.BOT_NAME_INPUT);
		await this.page.type(BOT_SECTION.SELECTORS.BOT_NAME_INPUT, 'C6165');
		await this.page.click(BOT_SECTION.SELECTORS.CREATE_BOT_BUTTON_AFTER_TYPE_NAME);
		await this.page.waitFor(700);
		// cancel delete Bot
		await this.page.click(NAVBAR.SELECTORS.BOTS);
		let botNumber = await this.utils.getCorrespondingBotNumber('C6165');
		await this.page.waitForSelector(`body > app-root > div > iox-page-container > div > iox-bots > div > div:nth-child(${botNumber}) > iox-bot-item > div > div.bot-content > div.action-buttons.btn-group > button:nth-child(3) > i`);
		await this.page.click(`body > app-root > div > iox-page-container > div > iox-bots > div > div:nth-child(${botNumber}) > iox-bot-item > div > div.bot-content > div.action-buttons.btn-group > button:nth-child(3) > i`);
		const alert = await this.page.$(BOT_SECTION.SELECTORS.DELETE_ALERT_FLOW_BOT);
		await this.page.waitFor(700);
		await this.utils.compareScreenshots('NLPBot', 'C6165alert', alert);
		await this.page.click(BOT_SECTION.SELECTORS.NO_BUTTON_ON_DELETE);
		// verify that bot is NOT deleted
		await this.page.click(NAVBAR.SELECTORS.BOTS);
		await this.utils.reload();
		botNumber = await this.utils.getCorrespondingBotNumber('C6165');
		const botIsNotDeleted = await this.page.$(`body > app-root > div > iox-page-container > div > iox-bots > div > div:nth-child(${botNumber}) > iox-bot-item > div > div.bot-content > div.action-buttons.btn-group > button:nth-child(3) > i`) !== null;
		// delete Bot
		await this.page.click(`body > app-root > div > iox-page-container > div > iox-bots > div > div:nth-child(${botNumber}) > iox-bot-item > div > div.bot-content > div.action-buttons.btn-group > button:nth-child(3) > i`);
		await this.page.click(BOT_SECTION.SELECTORS.YES_BUTTON_ON_DELETE);
		return botIsNotDeleted;
	}

	public async deleteTrainedNLPBotButtonDisabled(): Promise<boolean> {
		// create Bot
		await this.page.click(NAVBAR.SELECTORS.BOTS);
		await this.utils.clickOnCreateBotButton();
		await this.page.waitForSelector(BOT_SECTION.SELECTORS.CREATE_NLP_BOT);
		await this.page.click(BOT_SECTION.SELECTORS.CREATE_NLP_BOT);
		await this.page.waitForSelector(BOT_SECTION.SELECTORS.BOT_NAME_INPUT);
		await this.page.type(BOT_SECTION.SELECTORS.BOT_NAME_INPUT, 'C6166');
		await this.page.click(BOT_SECTION.SELECTORS.CREATE_BOT_BUTTON_AFTER_TYPE_NAME);
		await this.page.waitFor(700);
		// Train Bot
		await this.page.click(BOT_SECTION.SELECTORS.INTEGRATE);
		await this.page.waitFor(300);
		await this.page.click(BOT_SECTION.SELECTORS.CHECHBOX_GOOGLE_HOME);
		await this.page.waitFor(700);
		await this.page.type(BOT_SECTION.SELECTORS.GOOGLE_HOME_INPUT_1,'newagent-4dfa0');
		await this.page.type(BOT_SECTION.SELECTORS.GOOGLE_HOME_INPUT_2,'237d84ca4fc8457c8b3cf8c4c348476b');
		await this.page.click(BOT_SECTION.SELECTORS.INTEGRATE_BUTTON);
		await this.page.waitFor(500); //!
		await this.page.click(BOT_SECTION.SELECTORS.RUN);
		await this.page.waitFor(700); //!
		await this.page.click(BOT_SECTION.SELECTORS.TRAIN);
		await this.page.waitFor(50000);
		await this.page.waitForSelector(BOT_SECTION.SELECTORS.PROGRESS_BAR, { hidden: true });
		await this.page.waitFor(1000);
		// type wrong word (not 'delete') and verify that button is remain disabled
		await this.page.click(NAVBAR.SELECTORS.BOTS);
		await this.page.waitFor(500);
		const botNumber = await this.utils.getCorrespondingBotNumber('C6166');
		await this.page.waitFor(500);
		await this.page.click(`body > app-root > div > iox-page-container > div > iox-bots > div > div:nth-child(${botNumber}) > iox-bot-item > div > div.bot-content > div.action-buttons.btn-group > button:nth-child(3) > i`);
		await this.page.waitFor(500);
		const buttonIsDisabled = await this.page.$('body > modal-container > div > div > div > form > button.btn.btn-default[disabled]') !== null;
		await this.page.waitFor(500);
		await this.page.type(BOT_SECTION.SELECTORS.DELETE_TRAINED_BOT_INPUT,'de');
		await this.page.waitFor(500);
		const buttonIsStillDisabled = await this.page.$('body > modal-container > div > div > div > form > button.btn.btn-default[disabled]') !== null;
		await this.page.click(BOT_SECTION.SELECTORS.CANCEL_BUTTON_ON_DELETE);
		return buttonIsStillDisabled;
	}
	public async deleteTrainedNLPBotCancel(): Promise<boolean> {
		// cancel deleting Bot
		await this.page.click(NAVBAR.SELECTORS.BOTS);
		const botNumber = await this.utils.getCorrespondingBotNumber('C6166');
		await this.page.waitFor(500);
		await this.page.click(`body > app-root > div > iox-page-container > div > iox-bots > div > div:nth-child(${botNumber}) > iox-bot-item > div > div.bot-content > div.action-buttons.btn-group > button:nth-child(3) > i`);
		await this.page.waitFor(500);
		const alert = await this.page.$(BOT_SECTION.SELECTORS.DELETE_ALERT_FLOW_BOT);
		await this.page.waitFor(700);
		await this.utils.compareScreenshots('NLPBot', 'C6166alert', alert);
		await this.page.click(BOT_SECTION.SELECTORS.CANCEL_BUTTON_ON_DELETE);
		// verify that bot is NOT deleted
		await this.page.click(NAVBAR.SELECTORS.BOTS);
		await this.utils.reload();
		const thisBotNumber = await this.utils.getCorrespondingBotNumber('C6166');
		const botIsNotDeleted = await this.page.$(`body > app-root > div > iox-page-container > div > iox-bots > div > div:nth-child(${thisBotNumber}) > iox-bot-item > div > div.bot-content > div.action-buttons.btn-group > button:nth-child(3) > i`) !== null;
		return botIsNotDeleted;
	}
	public async deleteTrainedNLPBot(): Promise<boolean> {
		// delete Bot
		await this.page.click(NAVBAR.SELECTORS.BOTS);
		const botNumber = await this.utils.getCorrespondingBotNumber('C6166');
		await this.page.waitFor(500);
		await this.page.click(`body > app-root > div > iox-page-container > div > iox-bots > div > div:nth-child(${botNumber}) > iox-bot-item > div > div.bot-content > div.action-buttons.btn-group > button:nth-child(3) > i`);
		await this.page.waitFor(500);
		await this.page.type(BOT_SECTION.SELECTORS.DELETE_TRAINED_BOT_INPUT,'delete');
		await this.page.waitFor(700);
		await this.page.click(BOT_SECTION.SELECTORS.DELETE_TRAINED_BOT_DELETE_BUTTON);
		await this.page.waitFor(700);
		await this.page.waitForSelector(BOT_SECTION.SELECTORS.DELETE_BOT_NOTIFICATION);
		const notificationForDelete = await this.page.$(BOT_SECTION.SELECTORS.DELETE_BOT_NOTIFICATION);
		await this.page.waitFor(500);
		await this.utils.compareScreenshots('NLPBot', 'C6166notificationForDelete', notificationForDelete);
		// verify that bot is deleted
		await this.page.click(NAVBAR.SELECTORS.BOTS);
		await this.utils.reload();
		await this.page.waitFor(500);
		const deletedBotNumber = await this.utils.getCorrespondingBotNumber('C6166');
		const botIsDeleted = await this.page.$(`body > app-root > div > iox-page-container > div > iox-bots > div > div:nth-child(${deletedBotNumber}) > iox-bot-item > div > div.bot-content > div.action-buttons.btn-group > button:nth-child(3) > i`) === null;
		return botIsDeleted;
	}
	public async deleteBot(botName: string, count: number = 1): Promise<boolean> {
		for (let i = 0; i < count; i++) {
			await this.utils.deleteBot(botName);
		}
		return true;
	}
}
