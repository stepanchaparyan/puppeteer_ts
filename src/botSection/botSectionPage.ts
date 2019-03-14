import { BOT_SECTION } from './botsSectionConstants';
import { DASHBOARD } from '../dashboardSection/dashboardConstants';
import { SIDEMENU } from '../sideMenu/sideMenuConstants';
import Utils from '../helpers/utils';
import LoginPage from '../loginSection/loginPage';

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
			await this.utils.click(BOT_SECTION.SELECTORS.ADD_SUB_DIALOG);
			await this.utils.type(BOT_SECTION.SELECTORS.ENTER_QUESTION_INPUT, 'Where are you from?');
			await this.utils.click(BOT_SECTION.SELECTORS.ADD_ON);
			await this.utils.select(BOT_SECTION.SELECTORS.CHOOSE_QUESTION_TYPE, 'Location picker');
			await this.utils.click(BOT_SECTION.SELECTORS.QUESTION_SAVE_BUTTON);
			await this.page.waitForSelector(BOT_SECTION.SELECTORS.QUESTION_SAVE_BUTTON, { hidden: true });
		}
		await this.utils.deleteBot('C69');
		await this.utils.reload();
		await this.utils.deleteBot('C69');
		await this.utils.reload();
		await this.utils.deleteBot('C69');
		await this.utils.reload();
		return true;
	}
	public async createBotsAndCheckCount(): Promise<boolean> {
		await this.utils.click(SIDEMENU.SELECTORS.DASHBOARD);
		await this.page.waitForSelector(DASHBOARD.SELECTORS.BOTS_COUNT_TEXT, { visible: true });
		let botsCountText = await this.page.$eval(DASHBOARD.SELECTORS.BOTS_COUNT_TEXT, (text) => text.innerText);
		const botsCountBefore = botsCountText.substr(0, 2);
		for (let i = 0; i < 10; i++) {
			await this.utils.createFlowBot('testBotForC282');
		}
		await this.utils.click(SIDEMENU.SELECTORS.DASHBOARD);
		await this.page.waitForSelector(DASHBOARD.SELECTORS.BOTS_COUNT_TEXT, { visible: true });
		botsCountText = await this.page.$eval(DASHBOARD.SELECTORS.BOTS_COUNT_TEXT, (text) => text.innerText);
		const botsCountAfter = botsCountText.substr(0, 2);
		const botsCountIsRight = Number(botsCountBefore) + 10 === Number(botsCountAfter) ? true : false;
		for (let i = 0; i < 10; i++) {
			await this.utils.deleteBot('testBotForC282');
			await this.utils.reload();
		}
		return botsCountIsRight;
	}

	public async getDefaultSectionTitle(): Promise<string> {
		await this.utils.reload();
		await this.loginPage.logOut();
		await this.loginPage.logIn();
		return this.page.title();
	}
	public async getDefaultSectionURL(): Promise<string> {
		await this.utils.reload();
		const url = this.page.url();
		const endOfUrl = url.substr(url.length - 9);
		return endOfUrl;
	}
	public async checkDashboardSectionIsActive(): Promise<any> {
		const dashboardSection = await this.page.$(SIDEMENU.SELECTORS.DASHBOARD);
		const className = await dashboardSection.getProperty('className');
		const classNameIncludedActive = String(className).includes('active');
		return classNameIncludedActive;
	}

	public async deleteNotTrainedFlowBot(): Promise<boolean> {
		await this.utils.createFlowBot('C6163');
		await this.utils.deleteBot('C6163');
		// verify that bot is deleted
		await this.utils.click(SIDEMENU.SELECTORS.BOTS);
		const botIsExist = await this.utils.botIsExist('C6163');
		return !botIsExist;
	}
	public async cancelDeleteNotTrainedFlowBot(): Promise<boolean> {
		await this.utils.createFlowBot('C6163');
		// cancel deleting bot
		await this.utils.click(SIDEMENU.SELECTORS.BOTS);
		await this.utils.clickOnBotDeleteButton('C6163');
		await this.utils.click(BOT_SECTION.SELECTORS.NO_BUTTON_ON_DELETE);
		// verify that bot is NOT deleted
		await this.utils.click(SIDEMENU.SELECTORS.BOTS);
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
		await this.utils.click(SIDEMENU.SELECTORS.BOTS);
		await this.utils.clickOnBotDeleteButton('C6164');
		const buttonIsDisabled = await this.page.$(BOT_SECTION.SELECTORS.DISABLED_DELETE_BUTTON) !== null;
		await this.utils.type(BOT_SECTION.SELECTORS.DELETE_TRAINED_BOT_INPUT, 'de');
		const buttonIsStillDisabled = await this.page.$(BOT_SECTION.SELECTORS.DISABLED_DELETE_BUTTON) !== null;
		await this.utils.click(BOT_SECTION.SELECTORS.CANCEL_BUTTON_ON_DELETE);
		console.log('555: ', buttonIsStillDisabled);
		return buttonIsStillDisabled;
	}
	public async deleteTrainedFlowBotCancel(): Promise<boolean> {
		// cancel deleting Bot
		await this.utils.click(SIDEMENU.SELECTORS.BOTS);
		await this.utils.clickOnBotDeleteButton('C6164');
		await this.utils.click(BOT_SECTION.SELECTORS.CANCEL_BUTTON_ON_DELETE);
		// verify that bot is NOT deleted
		await this.utils.click(SIDEMENU.SELECTORS.BOTS);
		const botIsExist = await this.utils.botIsExist('C6164');
		return botIsExist;
	}
	public async deleteTrainedFlowBot(): Promise<boolean> {
		await this.utils.deleteTrainedBot('C6164');
		await this.page.waitForSelector(BOT_SECTION.SELECTORS.DELETE_BOT_NOTIFICATION);
		// verify that bot is deleted
		await this.utils.click(SIDEMENU.SELECTORS.BOTS);
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
		await this.utils.click(SIDEMENU.SELECTORS.BOTS);
		const botIsExist = await this.utils.botIsExist('C6165');
		return !botIsExist;
	}
	public async cancelDeleteNotTrainedNLPBot(): Promise<boolean> {
		await this.utils.createNLPBot('C6165');
		// cancel deleting Bot
		await this.utils.click(SIDEMENU.SELECTORS.BOTS);
		await this.utils.clickOnBotDeleteButton('C6165');
		await this.utils.click(BOT_SECTION.SELECTORS.NO_BUTTON_ON_DELETE);
		// verify that bot is NOT deleted
		await this.utils.click(SIDEMENU.SELECTORS.BOTS);
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
		await this.utils.trainBot();
		// type wrong word (not 'delete') and verify that button is remain disabled
		await this.utils.click(SIDEMENU.SELECTORS.BOTS);
		await this.utils.clickOnBotDeleteButton('C6166');
		const buttonIsDisabled = await this.page.$(BOT_SECTION.SELECTORS.DISABLED_DELETE_BUTTON) !== null;
		await this.utils.type(BOT_SECTION.SELECTORS.DELETE_TRAINED_BOT_INPUT, 'de');
		const buttonIsStillDisabled = (await this.page.$(BOT_SECTION.SELECTORS.DISABLED_DELETE_BUTTON)) !== null;
		await this.utils.click(BOT_SECTION.SELECTORS.CANCEL_BUTTON_ON_DELETE);
		return buttonIsStillDisabled;
	}
	public async deleteTrainedNLPBotCancel(): Promise<boolean> {
		// cancel deleting Bot
		await this.utils.click(SIDEMENU.SELECTORS.BOTS);
		await this.utils.clickOnBotDeleteButton('C6166');
		await this.utils.click(BOT_SECTION.SELECTORS.CANCEL_BUTTON_ON_DELETE);
		// verify that bot is NOT deleted
		await this.utils.click(SIDEMENU.SELECTORS.BOTS);
		const botIsExist = await this.utils.botIsExist('C6166');
		return botIsExist;
	}
	public async deleteTrainedNLPBot(): Promise<boolean> {
		await this.utils.deleteTrainedBot('C6166');
		await this.page.waitForSelector(BOT_SECTION.SELECTORS.DELETE_BOT_NOTIFICATION);
		// verify that bot is deleted
		await this.utils.click(SIDEMENU.SELECTORS.BOTS);
		const botIsExist = await this.utils.botIsExist('C6166');
		return !botIsExist;
	}
	public async deleteTrainedNLPBotNotification(): Promise<boolean> {
		await this.utils.createNLPBot('C6166');
		await this.utils.integrateBotToGoogle();
		await this.utils.trainBot();
		await this.utils.deleteTrainedBot('C6166');
		await this.page.waitForSelector(BOT_SECTION.SELECTORS.DELETE_BOT_NOTIFICATION);
		const text = await this.page.$eval(BOT_SECTION.SELECTORS.DELETE_BOT_NOTIFICATION, (text) => text.innerText);
		await this.page.reload();
		return text;
	}
}
