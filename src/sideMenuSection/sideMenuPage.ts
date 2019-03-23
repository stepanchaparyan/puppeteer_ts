import Utils from '../helpers/utils';
import { SIDEMENU } from '../sideMenuSection/sideMenuConstants.js';

export default class SideMenu {
	private page: any;
	private utils: any;

	constructor(page) {
		this.page = page;
		this.utils = new Utils(page);
	}

	public async getBotSectionTitle(): Promise<string> {
		await this.utils.click(SIDEMENU.SELECTORS.BOTS);
		return this.page.title();
	}
	public async getBotSectionURL(): Promise<string> {
		await this.utils.click(SIDEMENU.SELECTORS.BOTS);
		await this.utils.reload();
		const url = this.page.url();
		const endOfUrl = url.substr(url.length - 4);
		return endOfUrl;
	}
	public async getBotSectionIconText(): Promise<string> {
		await this.utils.click(SIDEMENU.SELECTORS.BOTS);
		return this.page.$eval(SIDEMENU.SELECTORS.BOTS, (text) => text.innerText);
	}

	public async getDashboardSectionTitle(): Promise<string> {
		await this.utils.click(SIDEMENU.SELECTORS.DASHBOARD);
		return this.page.title();
	}
	public async getDashboardSectionURL(): Promise<string> {
		await this.utils.click(SIDEMENU.SELECTORS.DASHBOARD);
		await this.utils.reload();
		const url = this.page.url();
		const endOfUrl = url.substr(url.length - 9);
		return endOfUrl;
	}
	public async getDashboardSectionIconText(): Promise<boolean> {
		await this.utils.click(SIDEMENU.SELECTORS.DASHBOARD);
		const text = this.page.$eval(SIDEMENU.SELECTORS.DASHBOARD, (text) => text.innerText);
		return text;
	}

	public async getKnowledgeSectionTitle(): Promise<string> {
		await this.utils.click(SIDEMENU.SELECTORS.KNOWLEDGE);
		return this.page.title();
	}
	public async getKnowledgeSectionURL(): Promise<string> {
		await this.utils.click(SIDEMENU.SELECTORS.KNOWLEDGE);
		await this.utils.reload();
		const url = this.page.url();
		const endOfUrl = url.substr(url.length - 9);
		return endOfUrl;
	}
	public async getKnowledgeSectionIconText(): Promise<boolean> {
		await this.utils.click(SIDEMENU.SELECTORS.KNOWLEDGE);
		const text = this.page.$eval(SIDEMENU.SELECTORS.KNOWLEDGE, (text) => text.innerText);
		return text;
	}
	public async knowledgeSectionIsDisbled(): Promise<boolean> {
		const knowledgeSection = await this.page.$(SIDEMENU.SELECTORS.KNOWLEDGE);
		const className = await knowledgeSection.getProperty('className');
		const classNameNotIncludedEnabled = String(className).includes('site-menu-item-enabled');
		return !classNameNotIncludedEnabled;
	}

	public async getApiConnectorSectionTitle(): Promise<string> {
		await this.utils.click(SIDEMENU.SELECTORS.API_CONNECTOR);
		return this.page.title();
	}
	public async getApiConnectorSectionURL(): Promise<string> {
		await this.utils.click(SIDEMENU.SELECTORS.API_CONNECTOR);
		await this.utils.reload();
		const url = this.page.url();
		const endOfUrl = url.substr(url.length - 9);
		return endOfUrl;
	}
	public async getApiConnectorSectionIconText(): Promise<boolean> {
		await this.utils.click(SIDEMENU.SELECTORS.API_CONNECTOR);
		const text = this.page.$eval(SIDEMENU.SELECTORS.API_CONNECTOR, (text) => text.innerText);
		return text;
	}

	public async getHelpSectionTitle(): Promise<string> {
		await this.utils.click(SIDEMENU.SELECTORS.HELP);
		return this.page.title();
	}
	public async getHelpSectionURL(): Promise<string> {
		await this.utils.click(SIDEMENU.SELECTORS.HELP);
		await this.utils.reload();
		const url = this.page.url();
		const endOfUrl = url.substr(url.length - 4);
		return endOfUrl;
	}
	public async getHelpSectionIconText(): Promise<boolean> {
		await this.utils.click(SIDEMENU.SELECTORS.HELP);
		const text = this.page.$eval(SIDEMENU.SELECTORS.HELP, (text) => text.innerText);
		return text;
	}
}
