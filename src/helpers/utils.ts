import { BOT_SECTION } from '../botSection/botsSectionConstants';
import { SIDEMENU } from '../sideMenuSection/sideMenuConstants';

export default class Utils {
	private page: any;
	constructor(page) {
		this.page = page;
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

	public async reload(): Promise<void> {
		await this.page.reload({ waitUntil: 'load' });
		await this.page.waitFor(1000);
	}

	public async getText(selector): Promise<string> {
		await this.page.waitForSelector(selector, {visible: true});
		const text = await this.page.$eval(selector, (text) => text.innerText);
		return text;
	}

	public async goToDashboardPage(): Promise<void> {
		await this.click(SIDEMENU.SELECTORS.DASHBOARD);
	}
	public async goToBotsPage(): Promise<void> {
		await this.click(SIDEMENU.SELECTORS.BOTS);
	}
	public async goToIntegratePage(): Promise<void> {
		await this.page.click(BOT_SECTION.SELECTORS.INTEGRATE, { delay: '200' });
	}
	public async goToApiConnectorPage(): Promise<void> {
		await this.page.waitFor(1000);
		await this.click(SIDEMENU.SELECTORS.API_CONNECTOR);
	}

	public async getCorrespondingBotNumber(botName: string): Promise<any> {
		let i;
		const botsCount = await this.getElementsCount(BOT_SECTION.SELECTORS.ALL_BOTS);
		for (i = 1; i < botsCount; i++) {
			const nextBotSelector = `body > app-root > div > iox-page-container > div > iox-bots > div > div:nth-child(${i}) > iox-bot-item > div > div.bot-content > div.bot-name`;
			const nextBotName = await this.getText(nextBotSelector);
			if (nextBotName === botName) {
				break;
			}			
		}
		return i;
	}

	public async getElementsCount(selector: string): Promise<number> {
		const count = await this.page.$$eval(selector, (bots) => bots.length);
		return await count;
	}

	public async becomeDeActivatedMagento(): Promise<void> {
		// check that if the Magento activated
		await this.page.waitFor(1000);
		await this.goToApiConnectorPage();
		await this.page.waitFor(SIDEMENU.SELECTORS.API_CONNECTOR_MAGENTO_Q_MARK);
		const checkbox = await this.page.$(SIDEMENU.SELECTORS.API_CONNECTOR_MAGENTO_Q_MARK);
		let className = await checkbox.getProperty('className');
		let isDisabled = String(className).includes('disable');
		if (isDisabled === false) {
			await this.page.click(SIDEMENU.SELECTORS.API_CONNECTOR_MAGENTO_CHECKBOX);
			await this.page.waitFor(1000);
		}
	}

	
}

