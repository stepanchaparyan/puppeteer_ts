import { expect } from 'chai';
import launchPuppeteer from '../launchPuppeteer';
import Dashboard from '../src/dashboardSection/dashboardPage';
import LoginPage from '../src/loginSection/loginPage';
import Utils from '../src/helpers/utils';

let browser: any;
let page: any;
let loginPage: any;
let dashboard: any;
let utils: any;
const viewport: any = { width: 1020, height: 1080 };

describe('Dashboard page elements', () => {
	before(async () => {
		browser = await launchPuppeteer();
		page = await browser.newPage();
		await page.setViewport(viewport);
		dashboard = new Dashboard(page, browser);
		loginPage = new LoginPage(page);
		utils = new Utils(page);
		await loginPage.open();
		await loginPage.logIn();
	});
	after(async () => {
		await browser.close();
	});
	context('Full page', () => {
		it('page title is Dashboard', async () => {
			expect(await dashboard.pageTitle()).to.equal('Dashboard');
		});
	});

	context('Check - Messages Past 7 Days section', () => {
		it('messages past 7 days div exist', async () => {
			expect(await dashboard.messagesPast7DaysExist()).to.equal(true);
		});
		it('messages past 7 days div - messages', async () => {
			expect(await dashboard.messagesPast7DaysMessages()).to.equal('MESSAGES');
		});
		it('accept Agreememnt', async () => {
			expect(await utils.acceptChatBotAgreement()).to.equal(true);
		});
		it('messages past 7 days div - number', async function() {
			this.retries(5);
			expect(await dashboard.messagesPast7DaysNumber()).to.equal(true);
		});
		it('messages past 7 days div - past 7 days', async () => {
			expect(await dashboard.messagesPast7DaysText()).to.equal('Past 7 Days');
		});
	});

	context('Check - Messages Past 30 Days section', () => {
		it('messages past 30 days div exist', async () => {
			expect(await dashboard.messagesPast30DaysExist()).to.equal(true);
		});
		it('messages past 30 days div - messages', async () => {
			expect(await dashboard.messagesPast30DaysMessages()).to.equal('MESSAGES');
		});
		it('messages past 30 days div - number', async function() {
			this.retries(5);
			expect(await dashboard.messagesPast30DaysNumber()).to.equal(true);
		});
		it('messages past 30 days div - past 30 days', async () => {
			expect(await dashboard.messagesPast30DaysText()).to.equal('Past 30 Days');
		});
	});

	context('Check - Sessions Past 30 Days section', () => {
		it('sessions past 30 days div - exist', async () => {
			expect(await dashboard.sessionsPast30DaysExist()).to.equal(true);
		});
		it('sessions past 30 days div - sessions', async () => {
			expect(await dashboard.sessionsPast30DaysSessions()).to.equal('SESSIONS');
		});
		it('sessions past 30 days div - number', async function() {
			this.retries(5);
			expect(await dashboard.sessionsPast30DaysNumber()).to.equal(true);
		});
		it('sessions past 30 days div - past 30 days', async () => {
			expect(await dashboard.sessionsPast30DaysText()).to.equal('Past 30 Days');
		});
	});

	context('Check - Bots Count section', () => {
		it('bots count div - Exist', async () => {
			expect(await dashboard.botsCountDivExist()).to.equal(true);
		});
		it('bots count text', async () => {
			expect(await dashboard.botsCountDivText()).to.include('out of 10 bots used');
		});
		it('bots count', async () => {
			expect(await dashboard.botsCount()).to.equal(true);
		});
	});

	context('Check - platform Status section ', () => {
		it('platform status text', async () => {
			expect(await dashboard.platformStatusText()).to.equal(' Platform Status');
		});
		it('platforms list', async () => {
			expect(await dashboard.platformsList()).to.deep.equal([ ' Core', ' Api', ' Email', ' WebChat', ' SMS', ' Facebook', ' WhatsApp', ' Slack' ]);
		});
		it('having troubles text', async () => {
			expect(await dashboard.troublesText()).to.equal(' Having troubles? Contact us.');
		});
		it('contact us link', async () => {
			expect(await dashboard.contactUsLink()).to.equal('https://ioxlab.atlassian.net/servicedesk/customer/portals');
		});
	});

	context('Check - ChatBot', () => {
		it('chatBotTitle', async () => {
			expect(await dashboard.chatBotTitle()).to.equal('Bob');
		});
		it('chatBotByIOX_URL', async () => {
			expect(await dashboard.chatBotByIOX_URL()).to.equal('https://www.ioxchatbot.com/home');
		});
	});
});
