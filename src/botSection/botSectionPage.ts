import { BOT_SECTION } from './botsSectionConstants';
import { DASHBOARD } from '../dashboardSection/dashboardConstants';
import { SIDEMENU } from '../sideMenuSection/sideMenuConstants';
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

	public async createLocationQuestion(): Promise<void> {
			await this.utils.click(BOT_SECTION.SELECTORS.ADD_SUB_DIALOG);
			await this.page.waitFor(500);//
			await this.utils.type(BOT_SECTION.SELECTORS.ENTER_QUESTION_INPUT, 'Where are you from?');
			await this.utils.click(BOT_SECTION.SELECTORS.ADD_ON);
			await this.utils.select(BOT_SECTION.SELECTORS.CHOOSE_QUESTION_TYPE, 'Location picker');
			await this.utils.click(BOT_SECTION.SELECTORS.QUESTION_SAVE_BUTTON);
			await this.page.waitForSelector(BOT_SECTION.SELECTORS.QUESTION_SAVE_BUTTON, { visible: false, delay: 200 });
			await this.page.waitFor(500);//
	}
	public async createBotsWithLocationQuestion(botName: string, count: number = 1): Promise<void> {
		for (let i = 0; i < count; i++) {
			await this.utils.createFlowBot(botName);
			await this.createLocationQuestion();
		}
	}

	public async getBotsCountFromDashboard(selector: string): Promise<number> {
		await this.goToDashboardPage();
		await this.page.waitForSelector(selector, { visible: true });
		let botsCountText = await this.page.$eval(selector, (text) => text.innerText);
		const botsCountBefore = botsCountText.substr(0, 2);
		return await botsCountBefore;
	}
	public async goToDashboardPage(): Promise<void> {
		await this.utils.click(SIDEMENU.SELECTORS.DASHBOARD);
	}
	public async deleteFlowBot(botName: string, count: number = 1): Promise<void> {
		for (let i = 0; i < count; i++) {
			await this.utils.deleteBot(botName);
			await this.utils.reload();
		}
	}
	public async createFlowBot(botName: string, count: number = 1): Promise<void> {
		for (let i = 0; i < count; i++) {
			await this.utils.createFlowBot(botName);
		}
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
		const buttonIsDisabled = (await this.page.$(BOT_SECTION.SELECTORS.DISABLED_DELETE_BUTTON)) !== null;
		await this.utils.type(BOT_SECTION.SELECTORS.DELETE_TRAINED_BOT_INPUT, 'de');
		const buttonIsStillDisabled = (await this.page.$(BOT_SECTION.SELECTORS.DISABLED_DELETE_BUTTON)) !== null;
		await this.utils.click(BOT_SECTION.SELECTORS.CANCEL_BUTTON_ON_DELETE);
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
		const buttonIsDisabled = (await this.page.$(BOT_SECTION.SELECTORS.DISABLED_DELETE_BUTTON)) !== null;
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
	public async updateBot(): Promise<boolean> {
		await this.utils.createFlowBot('C73');
		await this.utils.click(SIDEMENU.SELECTORS.BOTS);
		await this.utils.clickOnBotUpdateButton('C73');
		// * Free text
		await this.utils.click(BOT_SECTION.SELECTORS.EDIT_FIRST_QUESTION);
		await this.utils.click(BOT_SECTION.SELECTORS.REMOVE_DEFAULT_QUESTION);
		await this.utils.type(BOT_SECTION.SELECTORS.ENTER_QUESTION_INPUT, 'What is your name?');
		await this.page.waitFor(500);//
		await this.utils.click(BOT_SECTION.SELECTORS.QUESTION_SAVE_BUTTON);
		await this.page.waitFor(500);//
		await this.utils.click(SIDEMENU.SELECTORS.BOTS);
		await this.utils.clickOnBotUpdateButton('C73');
		await this.page.waitForSelector(BOT_SECTION.SELECTORS.FIRST_QUESTION);
		const text = await this.page.$eval(BOT_SECTION.SELECTORS.FIRST_QUESTION, (text) => text.innerText);
		await this.utils.deleteBot('C73');
		return text;
	}
}
