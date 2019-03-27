import { BOT_SECTION } from './botsSectionConstants';
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
	public async goToBotsPage(): Promise<void> {
		await this.utils.click(SIDEMENU.SELECTORS.BOTS);
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

	public async clickOnNoButtonOnDeleteModal(botName): Promise<void> {
		await this.page.waitFor(1000)
		await this.goToBotsPage();
		await this.utils.clickOnBotDeleteButton(botName);
		await this.utils.click(BOT_SECTION.SELECTORS.NO_BUTTON_ON_DELETE);
	}

	public async waitAndGetTextFromNotification(): Promise<string> {
		try {
			await this.page.waitForSelector(BOT_SECTION.SELECTORS.DELETE_BOT_NOTIFICATION);
		} catch (err) {
			if (err == 'Error: waiting failed: timeout 30000ms exceeded') {
			throw new Error('Notification did not appeared')
			} else {
				throw err
			}
		}
		const text = await this.page.$eval(BOT_SECTION.SELECTORS.DELETE_BOT_NOTIFICATION, (text) => text.innerText);
		return text;
	}

	public async writeWrongWordInBotDeleteInput(wrongWord): Promise<void> {
		await this.utils.type(BOT_SECTION.SELECTORS.DELETE_TRAINED_BOT_INPUT, wrongWord);
	}

	public async clickOnCancelButtonOnTrainedBotDeleteModal(): Promise<void> {
		await this.utils.click(BOT_SECTION.SELECTORS.CANCEL_BUTTON_ON_DELETE);
	}

	public async checkButtonIsDisabledOrNo(selector: any): Promise<boolean> {
		const buttonIsDisabled = (await this.page.$(selector)) !== null;
		return buttonIsDisabled;
	}

	public async checkDeleteButtonIsDisableOrNo(botname:any): Promise<boolean> {
		await this.goToBotsPage();
		await this.utils.clickOnBotDeleteButton(botname);
		const buttonIsDisabled = await this.checkButtonIsDisabledOrNo(BOT_SECTION.SELECTORS.DISABLED_DELETE_BUTTON);
		return buttonIsDisabled;
	}

	public async updateInitialQuestionToFreeTextQuestion(): Promise<void> {
		await this.page.waitFor(500);
		await this.utils.click(SIDEMENU.SELECTORS.BOTS);
		await this.utils.clickOnBotUpdateButton('C73');
		await this.utils.click(BOT_SECTION.SELECTORS.EDIT_FIRST_QUESTION);
		await this.utils.click(BOT_SECTION.SELECTORS.REMOVE_DEFAULT_QUESTION);
		await this.utils.type(BOT_SECTION.SELECTORS.ENTER_QUESTION_INPUT, 'What is your name?');
		await this.page.waitFor(500);
		await this.utils.click(BOT_SECTION.SELECTORS.QUESTION_SAVE_BUTTON);
		await this.page.waitFor(500);
	}
	public async getTextFromFirstQuestion(): Promise<boolean> {
		await this.utils.click(SIDEMENU.SELECTORS.BOTS);
		await this.utils.clickOnBotUpdateButton('C73');
		await this.page.waitForSelector(BOT_SECTION.SELECTORS.FIRST_QUESTION);
		const text = await this.page.$eval(BOT_SECTION.SELECTORS.FIRST_QUESTION, (text) => text.innerText);
		await this.utils.deleteBot('C73');
		return text;
	}

	public async goToIntegratePage(): Promise<void> {
		await this.utils.click(BOT_SECTION.SELECTORS.INTEGRATE);
	}
	public async clickOnMagentoCheckbox(): Promise<void> {
		await this.page.waitFor(1000);
		await this.utils.click(BOT_SECTION.SELECTORS.CHECHBOX_MAGENTO);
	}
	public async clickOnLinkOnAlert(): Promise<void> {
		await this.page.waitFor(2000);
		await this.utils.click(BOT_SECTION.SELECTORS.API_CONNECTOR_SETTING_LINK_ON_ALERT);
		//await this.page.waitFor(2000);
	}
	public async generateKeyAndReturn(): Promise<void> {
		await this.utils.click(BOT_SECTION.SELECTORS.GENERATE_KEY_BUTTON);
		// wait until key generate
		await this.page.waitFor(5000);
		//await this.page.waitForFunction(`document.querySelector('body > app-root > div > iox-page-container > div > iox-dashboard > div > div.col-lg-7.col-md-7.col-sm-12.col-xs-12.dashboard-column-left > div:nth-child(1) > div > span').innerText > 0;`);
		//GENERATED_PRIVATE_KEY_TEXT);
		await this.utils.click(BOT_SECTION.SELECTORS.X_BUTTON_ON_GENERATE_KEY_ALERT);
		await this.goToBotsPage();
	}



}
