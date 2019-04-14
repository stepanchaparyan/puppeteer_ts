import * as args from 'minimist';
import * as CREDS from '../../settings/creds';
import * as ENVIRONMENTS from '../../settings/environments';
import { LOGIN_PAGE } from './loginPageConstants';
import { SIDEMENU } from '../sideMenuSection/sideMenuConstants';

const argv = args(process.argv.slice(2));

export default class LoginPage {
	private page: any;
	private environment: any;

	constructor(page) {
		this.page = page;
		this.environment = argv._[1] === 'QA' ? ENVIRONMENTS.QA : ENVIRONMENTS.PROD;
	}
	public async open() {
		return this.page.goto(`${this.environment}`);
	}
	public async logIn() {
		await this.page.waitForSelector(LOGIN_PAGE.SELECTORS.EMAIL);
		await this.page.type(LOGIN_PAGE.SELECTORS.EMAIL, CREDS.testingUser);
		await this.page.type(LOGIN_PAGE.SELECTORS.PASSWORD, CREDS.testingPassword);
		await this.page.click(LOGIN_PAGE.SELECTORS.LOGIN_BUTTON);
		await this.page.waitFor(1500);
	}
	public async logOut() {
		await this.page.waitForSelector(SIDEMENU.SELECTORS.DROPDOWN);
		await this.page.click(SIDEMENU.SELECTORS.DROPDOWN);
		await this.page.waitForSelector(SIDEMENU.SELECTORS.LOGOUT);
		await this.page.click(SIDEMENU.SELECTORS.LOGOUT);
	}
}
