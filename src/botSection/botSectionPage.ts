import { BOT_SECTION } from './botsSectionConstants';
import { SIDEMENU } from '../sideMenuSection/sideMenuConstants';
import Utils from '../helpers/utils';
import LoginPage from '../loginSection/loginPage';
import { IFRAME } from '../botSection/iframeConstants';

export default class BotSection {
	private page: any;
	private utils: any;
	private loginPage: any;
	constructor(page) {
		this.page = page;
		this.utils = new Utils(page);
		this.loginPage = new LoginPage(page);
	}

	public async createFlowBot(botName: string): Promise<void> {
		await this.utils.waitForSelector(SIDEMENU.SELECTORS.BOTS);
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
	public async createFlowBots(botName: string, count: number = 1): Promise<void> {
		for (let i = 0; i < count; i++) {
			await this.createFlowBot(botName);
		}
	}

	public async deleteBot(botName: string): Promise<void> {
		await this.page.waitFor(500);
		await this.utils.click(SIDEMENU.SELECTORS.BOTS);
		await this.utils.reload();
		await this.clickOnBotDeleteButton(botName);
		await this.utils.click(BOT_SECTION.SELECTORS.YES_BUTTON_ON_DELETE);
		await this.page.waitFor(500); //?
	}
	public async deleteTrainedBot(botName: string): Promise<void> {
		await this.page.waitFor(2000);//!
		await this.utils.click(SIDEMENU.SELECTORS.BOTS);
		await this.clickOnBotDeleteButton(botName);
		await this.page.waitForSelector(BOT_SECTION.SELECTORS.DELETE_TRAINED_BOT_INPUT);
		await this.page.type(BOT_SECTION.SELECTORS.DELETE_TRAINED_BOT_INPUT, 'delete');
		await this.page.waitForSelector(BOT_SECTION.SELECTORS.DELETE_TRAINED_BOT_DELETE_BUTTON);
		await this.page.click(BOT_SECTION.SELECTORS.DELETE_TRAINED_BOT_DELETE_BUTTON, { delay: 50 });
		await this.page.waitFor(1000);//!
	}
	public async deleteFlowBots(botName: string, count: number = 1): Promise<void> {
		for (let i = 0; i < count; i++) {
			await this.deleteBot(botName);
			await this.utils.reload();
		}
	}

	public async integrateBotToGoogle(botName: string): Promise<void> {
		await this.clickOnBotUpdateButton(botName); //
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
	public async trainBot(botName: string): Promise<void> {
		await this.utils.goToBotsPage();//
		await this.clickOnBotUpdateButton(botName); //
		await this.page.waitFor(1000); //! 
		await this.page.waitForSelector(BOT_SECTION.SELECTORS.RUN);
		await this.page.click(BOT_SECTION.SELECTORS.RUN);
		await this.page.waitForSelector(BOT_SECTION.SELECTORS.TRAIN);
		await this.page.click(BOT_SECTION.SELECTORS.TRAIN);
		await this.page.waitForSelector(BOT_SECTION.SELECTORS.PROGRESS_BAR, { timeout: 300000, hidden: true });
	}

	public async clickOnNoButtonOnDeleteModal(botName): Promise<void> {
		await this.page.waitFor(1000)
		await this.utils.goToBotsPage();
		await this.clickOnBotDeleteButton(botName);
		await this.utils.click(BOT_SECTION.SELECTORS.NO_BUTTON_ON_DELETE);
	}
	public async clickOnCancelButtonOnTrainedBotDeleteModal(): Promise<void> {
		await this.utils.click(BOT_SECTION.SELECTORS.CANCEL_BUTTON_ON_DELETE);
	}
	public async clickOnBotDeleteButton(botName: string): Promise<void> {
		const botIsExist = await this.botIsExist(botName);
		if (botIsExist) {
			const botNumber = await this.utils.getCorrespondingBotNumber(botName);
			await this.page.waitForSelector(`body > app-root > div > iox-page-container > div > iox-bots > div > div:nth-child(${botNumber}) > iox-bot-item > div > div.bot-content > div.action-buttons.btn-group > button:nth-child(3) > i`);
			await this.page.click(`body > app-root > div > iox-page-container > div > iox-bots > div > div:nth-child(${botNumber}) > iox-bot-item > div > div.bot-content > div.action-buttons.btn-group > button:nth-child(3) > i`);
		} else {
			throw new Error(`There is not bot with name ${botName}`)
		}
	}
	public async clickOnBotUpdateButton(botName: string): Promise<void> {
		const botNumber = await this.utils.getCorrespondingBotNumber(botName);
		await this.page.waitForSelector(`body > app-root > div > iox-page-container > div > iox-bots > div > div:nth-child(${botNumber}) > iox-bot-item > div > div.bot-content > div.action-buttons.btn-group > button:nth-child(1) > i`);
		await this.page.click(`body > app-root > div > iox-page-container > div > iox-bots > div > div:nth-child(${botNumber}) > iox-bot-item > div > div.bot-content > div.action-buttons.btn-group > button:nth-child(1) > i`);
	}
	public async clickOnCreateBotButton(): Promise<void> {
		await this.page.waitFor(500); //!
		await this.utils.reload();
		const botsCount = await this.page.$$eval(BOT_SECTION.SELECTORS.ALL_BOTS, (bots) => bots.length);
		await this.page.waitForSelector(`body > app-root > div > iox-page-container > div > iox-bots > div > div:nth-child(${botsCount}) > button`);
		await this.page.click(`body > app-root > div > iox-page-container > div > iox-bots > div > div:nth-child(${botsCount}) > button`);
	}

	public async botIsExist(botName: string): Promise<boolean> {
		await this.page.click(SIDEMENU.SELECTORS.BOTS);
		await this.utils.reload();
		const botNumber = await this.utils.getCorrespondingBotNumber(botName);
		const botIsExist = (await this.page.$(`body > app-root > div > iox-page-container > div > iox-bots > div > div:nth-child(${botNumber}) > iox-bot-item > div > div.bot-content > div.action-buttons.btn-group > button:nth-child(3) > i`)) !== null;
		// back to this Bot page
		// if (botIsExist) {
		// 	await this.clickOnBotUpdateButton(botName);
		// }
		return botIsExist;
	}
	public async botIsTrained(botName: string): Promise<boolean> {
		await this.utils.click(SIDEMENU.SELECTORS.BOTS);
		await this.page.waitFor(1000); //!500
		const botNumber = await this.utils.getCorrespondingBotNumber(botName);
		await this.page.waitFor(1000); //!
		const checkbox = await this.page.$(`body > app-root > div > iox-page-container > div > iox-bots > div > div:nth-child(${botNumber}) > iox-bot-item > div > div.bot-content > div.status-bar > i`);
		const className = await checkbox.getProperty('className');
		const classNameIncludescheck = String(className).includes('check');
		return classNameIncludescheck;
	}

	public async getBotCount(botName: string): Promise<number> {
		await this.utils.reload();
		await this.page.click(SIDEMENU.SELECTORS.BOTS);
		await this.page.waitFor(1000);
		const allBotsCount = await this.page.$$eval(BOT_SECTION.SELECTORS.ALL_BOTS, (bots) => bots.length);
		let botCount = 0;
		for (let i = 1; i < allBotsCount; i++) {
			if (await this.page.$eval(`body > app-root > div > iox-page-container > div > iox-bots > div > div:nth-child(${i}) > iox-bot-item > div > div.bot-content > div.bot-name`, (bot) => bot.innerText) === botName) {
				botCount++; 
			}
		}
		return botCount;
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
	public async deleteTrainedBotAndGetTextFromAlert(botName: string): Promise<string> {
		await this.page.waitFor(2000);//!
		await this.utils.click(SIDEMENU.SELECTORS.BOTS);
		await this.clickOnBotDeleteButton(botName);
		const text = await this.page.$eval(BOT_SECTION.SELECTORS.DELETE_ALERT_TEXT, (text) => text.innerText);
		await this.page.waitForSelector(BOT_SECTION.SELECTORS.DELETE_TRAINED_BOT_INPUT);
		await this.page.type(BOT_SECTION.SELECTORS.DELETE_TRAINED_BOT_INPUT, 'delete');
		await this.page.waitForSelector(BOT_SECTION.SELECTORS.DELETE_TRAINED_BOT_DELETE_BUTTON);
		await this.page.click(BOT_SECTION.SELECTORS.DELETE_TRAINED_BOT_DELETE_BUTTON, { delay: 50 });
		await this.page.waitFor(1000);//!
		return await text;
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
			await this.createFlowBot(botName);
			await this.createLocationQuestion();
		}
	}

	public async getBotsCountFromDashboard(selector: string): Promise<number> {
		await this.utils.goToDashboardPage();
		await this.page.waitForSelector(selector, { visible: true });
		let botsCountText = await this.page.$eval(selector, (text) => text.innerText);
		const botsCountBefore = botsCountText.substr(0, 2);
		return await botsCountBefore;
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

	public async acceptChatBotAgreement(): Promise<boolean> {
		const botUrl = await this.getBotUrl('clickOnGoogle');
		await this.page.goto(botUrl);
		await this.utils.click(IFRAME.SELECTORS.MAIN_BUTTON);
		await this.utils.click(IFRAME.SELECTORS.AGREEMENT_CHECKBOX);
		await this.utils.click(IFRAME.SELECTORS.AGREEMENT_CONFIRM_BUTTON);
		await this.page.goBack();
		return true;
	}

	public async getBotUrl(botName: string): Promise<string> {
		await this.utils.click(SIDEMENU.SELECTORS.BOTS);
		const botNumber = await this.utils.getCorrespondingBotNumber(botName);
		const linkOfBot = await this.page.$(`body > app-root > div > iox-page-container > div > iox-bots > div > div:nth-child(${botNumber}) > iox-bot-item > div > div.bot-content > div.copy-area-container > div > div > a`);
		const botHref = await linkOfBot.getProperty('href');
		const botUrlHome = botHref._remoteObject.value;
		const botUrlChat = botUrlHome.replace('home', 'chat');
		return botUrlChat;
	}

	
	public async checkButtonIsDisabledOrNo(selector: any): Promise<boolean> {
		const buttonIsDisabled = (await this.page.$(selector)) !== null;
		return buttonIsDisabled;
	}
	public async checkDeleteButtonIsDisableOrNo(botname:any): Promise<boolean> {
		await this.utils.goToBotsPage();
		await this.clickOnBotDeleteButton(botname);
		const buttonIsDisabled = await this.checkButtonIsDisabledOrNo(BOT_SECTION.SELECTORS.DISABLED_DELETE_BUTTON);
		return buttonIsDisabled;
	}
	public async checkDeleteButtonIsDisableOrNoAfterWrongWord(): Promise<boolean> {
		const buttonIsDisabled = await this.checkButtonIsDisabledOrNo(BOT_SECTION.SELECTORS.DISABLED_DELETE_BUTTON);
		return buttonIsDisabled;
	}

	public async updateInitialQuestionToFreeTextQuestion(): Promise<void> {
		await this.page.waitFor(500);
		await this.utils.click(SIDEMENU.SELECTORS.BOTS);
		await this.clickOnBotUpdateButton('C73');
		await this.utils.click(BOT_SECTION.SELECTORS.EDIT_FIRST_QUESTION);
		await this.utils.click(BOT_SECTION.SELECTORS.REMOVE_DEFAULT_QUESTION);
		await this.utils.type(BOT_SECTION.SELECTORS.ENTER_QUESTION_INPUT, 'What is your name?');
		await this.page.waitFor(500);
		await this.utils.click(BOT_SECTION.SELECTORS.QUESTION_SAVE_BUTTON);
		await this.page.waitFor(500);
	}
	public async getTextFromFirstQuestion(): Promise<boolean> {
		await this.utils.click(SIDEMENU.SELECTORS.BOTS);
		await this.clickOnBotUpdateButton('C73');
		await this.page.waitForSelector(BOT_SECTION.SELECTORS.FIRST_QUESTION);
		const text = await this.page.$eval(BOT_SECTION.SELECTORS.FIRST_QUESTION, (text) => text.innerText);
		await this.deleteBot('C73');
		return text;
	}

	public async check_Magento(): Promise<void> {
		await this.utils.click(SIDEMENU.SELECTORS.API_CONNECTOR_MAGENTO_CHECKBOX);
	}
	public async generateKeyAndReturn(): Promise<void> {
		await this.page.waitFor(500);
		// generate key 
		await this.utils.click(BOT_SECTION.SELECTORS.GENERATE_KEY_BUTTON);
		await this.page.waitForFunction( () => document.querySelector('body > modal-container > div > div > div.modal-body.modal-body-magento > div.ng-star-inserted > div:nth-child(5) > textarea'), 'RSA');
		await this.utils.click(BOT_SECTION.SELECTORS.X_BUTTON_ON_GENERATE_KEY_ALERT);
		// return to Bots page
		await this.page.waitFor(2000); //! 
		await this.utils.reload();
		await this.utils.goToDashboardPage();
		await this.utils.goToBotsPage();
		await this.page.waitFor(1000); //! 
	}
	public async tryDeleteIntegratedBot(botname: string): Promise<void> {
		await this.page.waitFor(1000); //!
		await this.utils.goToDashboardPage();
		await this.utils.goToBotsPage();
		await this.clickOnBotDeleteButton(botname);
	}
	//! title update
	public async clickOnOKButton(): Promise<void> {
		await this.utils.click(BOT_SECTION.SELECTORS.OK_BUTTON_ON_ALERT_FOR_DELETE_INTEGRATED_BOT);
	}

	public async deActivateMagentoAndDeleteBot(botName): Promise<void> {
		await this.page.waitFor(1000);
		await this.utils.goToApiConnectorPage();
		await this.check_Magento();
		await this.utils.goToBotsPage();
		await this.clickOnBotUpdateButton(botName);
		await this.page.waitFor(2000);
		await this.utils.goToIntegratePage();
		await this.page.waitFor(1500);
		await this.utils.click(BOT_SECTION.SELECTORS.CHECKBOX_MAGENTO);
		await this.deleteBot(botName);
	}

	public async activateMagento(botName): Promise<void> {
		await this.page.waitFor(1000);
		await this.clickOnBotUpdateButton(botName);
		await this.page.waitFor(1000); //!
		await this.utils.goToIntegratePage();
		await this.page.waitFor(1500);
		await this.utils.click(BOT_SECTION.SELECTORS.CHECKBOX_MAGENTO); 
		await this.page.waitFor(1000);
		await this.utils.reload();
	}

	public async deleteUnneccesoryAllBots(): Promise<void> {
		await this.page.waitFor(1000);
		await this.utils.goToBotsPage();
		// check bots count
		const allBotsCount = await this.page.$$eval(BOT_SECTION.SELECTORS.ALL_BOTS, (bots) => bots.length);
		for (let i = 1; i < allBotsCount; i++) {
			const firstBotName = await this.utils.getText('body > app-root > div > iox-page-container > div > iox-bots > div > div:nth-child(1) > iox-bot-item > div > div.bot-content > div.bot-name');
			await this.utils.reload();
			await this.page.waitForSelector(`body > app-root > div > iox-page-container > div > iox-bots > div > div:nth-child(1) > iox-bot-item > div > div.bot-content > div.action-buttons.btn-group > button:nth-child(3) > i`);
			await this.page.click(`body > app-root > div > iox-page-container > div > iox-bots > div > div:nth-child(1) > iox-bot-item > div > div.bot-content > div.action-buttons.btn-group > button:nth-child(3) > i`);
			// get first bot name
			if (await this.botIsTrained(firstBotName) == true) {
				await this.deleteTrainedBot(firstBotName);
			}
			await this.deleteBot(firstBotName);
		}	
	}
	
}
