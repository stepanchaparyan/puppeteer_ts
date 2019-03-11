import * as args from 'minimist';
import * as CREDS from '../../creds';
import {LOGIN_PAGE} from '../helpers/constants/loginPageConstants.js';
const argv = args(process.argv.slice(2));

export default class LoginPage {
	private page: any;
		private QA: any = 'https://qa-app.iox.bot';
		private PROD: any = 'https://app.iox.bot';
	private environment: any;

		constructor(page) {
				this.page = page;
				this.environment = argv._[1] === 'QA' ? this.QA : this.PROD;
		}
		public async open() {
				return this.page.goto(`${this.environment}`);
		}
		public async logIn() {
				await this.page.waitForSelector(LOGIN_PAGE.SELECTORS.EMAIL);
				await this.page.type(LOGIN_PAGE.SELECTORS.EMAIL, CREDS.usernameS);
				await this.page.type(LOGIN_PAGE.SELECTORS.PASSWORD, CREDS.passwordS);
				await this.page.click(LOGIN_PAGE.SELECTORS.LOGIN_BUTTON);
				await this.page.waitFor(500);
		}
}
