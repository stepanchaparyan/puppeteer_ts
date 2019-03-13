import { expect } from 'chai';
import launchPuppeteer from '../launchPuppeteer';
import SideMenu from '../src/sideMenu/sideMenuPage';
import LoginPage from '../src/loginSection/loginPage';

let browser;
let page;
let loginPage;
let sideMenu;
const viewport = { width: 920, height: 1080 };

describe('Side Menu', () => {
	before(async () => {
		browser = await launchPuppeteer();
		page = await browser.newPage();
		await page.setViewport(viewport);
		sideMenu = new SideMenu(page);
		loginPage = new LoginPage(page);
		await loginPage.open();
		await loginPage.logIn();
	});
	after(async () => {
		await browser.close();
	});

	context('Menu panel', () => {
		it('C426 - Check the Left side Menu panel styles state - Bots', async () => {
			expect(await sideMenu.getBotSectionTitle()).to.equal('Bots');
			expect(await sideMenu.getBotSectionURL()).to.equal('bots');
			expect(await sideMenu.getBotSectionIconText()).to.equal('Bots\n');
		});
		it('C426 - Check the Left side Menu panel styles state - Dashboard', async () => {
			expect(await sideMenu.getDashboardSectionTitle()).to.equal('Dashboard');
			expect(await sideMenu.getDashboardSectionURL()).to.equal('dashboard');
			expect(await sideMenu.getDashboardSectionIconText()).to.equal('Dashboard\n');
		});
		it('C426 - Check the Left side Menu panel styles state - Knowledge', async () => {
			expect(await sideMenu.getKnowledgeSectionTitle()).not.to.equal('Knowledge');
			expect(await sideMenu.getKnowledgeSectionURL()).not.to.equal('knowledge');
			expect(await sideMenu.getKnowledgeSectionIconText()).to.equal('Knowledge\n');
			expect(await sideMenu.knowledgeSectionIsDisbled()).to.equal(true);
		});
		it('C426 - Check the Left side Menu panel styles state - API Connector', async () => {
			expect(await sideMenu.getApiConnectorSectionTitle()).to.equal('Api Connector');
			expect(await sideMenu.getApiConnectorSectionURL()).to.equal('connector');
			expect(await sideMenu.getApiConnectorSectionIconText()).to.equal('API Connector\n');
		});
		it('C426 - Check the Left side Menu panel styles state - Help', async () => {
			expect(await sideMenu.getHelpSectionTitle()).to.equal('Help');
			expect(await sideMenu.getHelpSectionURL()).to.equal('help');
			expect(await sideMenu.getHelpSectionIconText()).to.equal('Help\n');
		});
	});

});
