import { BOT_SECTION } from '../botSection/botsSectionConstants';
import Utils from '../helpers/utils';
import { SIDEMENU } from '../sideMenu/sideMenuConstants';

export default class FlowBot {
	private page: any;
	private utils: any;

	constructor(page) {
		this.page = page;
		this.utils = new Utils(page);
	}

	public async createBotByImportantActionDoc(): Promise<boolean> {
		await this.page.click(SIDEMENU.SELECTORS.BOTS);
		await this.utils.clickOnCreateBotButton();
		await this.utils.click(BOT_SECTION.SELECTORS.CREATE_FLOW_BOT);
		await this.utils.click(BOT_SECTION.SELECTORS.CREATE_BOT_CONTINUE);
		await this.utils.click(BOT_SECTION.SELECTORS.CREATE_WEB_CHAT_BOT);
		await this.utils.type(BOT_SECTION.SELECTORS.BOT_NAME_INPUT, 'testBotIA');
		await this.utils.click(BOT_SECTION.SELECTORS.CREATE_BOT_BUTTON_AFTER_TYPE_NAME);

		// * Free text
		await this.page.waitFor(800);
		await this.utils.click(BOT_SECTION.SELECTORS.EDIT_FIRST_QUESTION);
		await this.utils.click(BOT_SECTION.SELECTORS.REMOVE_DEFAULT_QUESTION);
		await this.utils.type(BOT_SECTION.SELECTORS.ENTER_QUESTION_INPUT, 'What is your name?');
		await this.utils.click(BOT_SECTION.SELECTORS.ADD_ON);
		await this.utils.select(BOT_SECTION.SELECTORS.CHOOSE_QUESTION_TYPE, 'Freetext Feedback');
		await this.utils.click(BOT_SECTION.SELECTORS.QUESTION_SAVE_BUTTON);

		// * Options
		await this.page.waitFor(500);
		await this.utils.click(BOT_SECTION.SELECTORS.ADD_SUB_DIALOG);
		await this.utils.type(BOT_SECTION.SELECTORS.ENTER_QUESTION_INPUT, 'Would you like to continue?');
		await this.utils.click(BOT_SECTION.SELECTORS.QUESTION_SAVE_BUTTON, { delay: 100 });
		await this.page.waitFor(500);
		await this.utils.click(BOT_SECTION.SELECTORS.CREATE_ANSWER_Q4);
		await this.page.waitFor(500);
		await this.utils.type(BOT_SECTION.SELECTORS.ADD_NEW_ANSWER_INPUT, 'Yes');
		await this.utils.click(BOT_SECTION.SELECTORS.SAVE_NEW_ANSWER);
		await this.page.waitFor(500);
		await this.utils.click(BOT_SECTION.SELECTORS.CREATE_ANSWER_Q4);
		await this.page.waitFor(500);
		await this.utils.type(BOT_SECTION.SELECTORS.ADD_NEW_ANSWER_INPUT, 'No');
		await this.utils.click(BOT_SECTION.SELECTORS.SAVE_NEW_ANSWER);

		// * Multiple options
		await this.page.waitFor(500);
		await this.utils.click(BOT_SECTION.SELECTORS.ADD_SUB_DIALOG);
		await this.utils.type(BOT_SECTION.SELECTORS.ENTER_QUESTION_INPUT, 'You are a man or woman?');
		await this.utils.click(BOT_SECTION.SELECTORS.ADD_ON);
		await this.page.waitFor(500);
		await this.utils.select(BOT_SECTION.SELECTORS.CHOOSE_QUESTION_TYPE, 'Multiple Options');
		await this.utils.click(BOT_SECTION.SELECTORS.QUESTION_SAVE_BUTTON);
		await this.page.waitFor(500);
		await this.utils.click(BOT_SECTION.SELECTORS.CREATE_ANSWER_Q5);
		await this.page.waitFor(500);
		await this.utils.type(BOT_SECTION.SELECTORS.ADD_NEW_ANSWER_INPUT, 'Boy - Man');
		await this.utils.click(BOT_SECTION.SELECTORS.SAVE_NEW_ANSWER);
		await this.page.waitFor(500);
		await this.utils.click(BOT_SECTION.SELECTORS.CREATE_ANSWER_Q5);
		await this.page.waitFor(500);
		await this.utils.type(BOT_SECTION.SELECTORS.ADD_NEW_ANSWER_INPUT, 'Girl - Woman');
		await this.utils.click(BOT_SECTION.SELECTORS.SAVE_NEW_ANSWER);

		// ? new question for boy
		await this.page.waitFor(500);
		await this.utils.click(BOT_SECTION.SELECTORS.QUESTION_ON_ANSWER_BOY);
		await this.utils.type(BOT_SECTION.SELECTORS.ENTER_QUESTION_INPUT, 'How old are you?');
		await this.utils.click(BOT_SECTION.SELECTORS.ADD_ON);
		await this.utils.select(BOT_SECTION.SELECTORS.CHOOSE_QUESTION_TYPE, 'Freetext Feedback');
		await this.page.waitFor(500);
		await this.utils.click(BOT_SECTION.SELECTORS.SAVE_NEW_ANSWER);

		// * DataPicker
		await this.page.waitFor(500);
		await this.utils.click(BOT_SECTION.SELECTORS.ADD_SUB_DIALOG);
		await this.utils.type(BOT_SECTION.SELECTORS.ENTER_QUESTION_INPUT, 'When is your birthday?');
		await this.utils.click(BOT_SECTION.SELECTORS.ADD_ON);
		await this.utils.select(BOT_SECTION.SELECTORS.CHOOSE_QUESTION_TYPE, 'Datepicker');
		await this.utils.click(BOT_SECTION.SELECTORS.QUESTION_SAVE_BUTTON);

		// * Location
		await this.page.waitFor(500);
		await this.utils.click(BOT_SECTION.SELECTORS.ADD_SUB_DIALOG);
		await this.utils.type(BOT_SECTION.SELECTORS.ENTER_QUESTION_INPUT, 'Where are you from?');
		await this.utils.click(BOT_SECTION.SELECTORS.ADD_ON);
		await this.utils.select(BOT_SECTION.SELECTORS.CHOOSE_QUESTION_TYPE, 'Location picker');
		await this.page.waitFor(500);
		await this.utils.click(BOT_SECTION.SELECTORS.QUESTION_SAVE_BUTTON);

		// new question for girl
		await this.page.waitFor(500);
		await this.utils.click(BOT_SECTION.SELECTORS.QUESTION_ON_ANSWER_GIRL);
		await this.page.waitFor(500);
		await this.utils.type(BOT_SECTION.SELECTORS.FILL_WITH_EXISTING_QUESTION, 'Where are you from?');
		await this.utils.click(BOT_SECTION.SELECTORS.QUESTION_SAVE_BUTTON);

		// * URL
		await this.page.waitFor(500);
		await this.utils.click(BOT_SECTION.SELECTORS.ADD_SUB_DIALOG);
		await this.utils.type(BOT_SECTION.SELECTORS.ENTER_QUESTION_INPUT, 'This is the form for your profile:');
		await this.utils.click(BOT_SECTION.SELECTORS.ADD_ON);
		await this.utils.select(BOT_SECTION.SELECTORS.CHOOSE_QUESTION_TYPE, 'URL Generator');
		await this.utils.type(BOT_SECTION.SELECTORS.URL_INPUT_FOR_MAIN_URL, 'https://google.com');
		await this.utils.click(BOT_SECTION.SELECTORS.ADD_NEW_URL_PARAMETER);
		await this.utils.type(BOT_SECTION.SELECTORS.URL_INPUT_FOR_PATH_PARAMETER1, 'freetext_option_1');
		await this.utils.click(BOT_SECTION.SELECTORS.ADD_NEW_URL_PARAMETER);
		await this.utils.click(BOT_SECTION.SELECTORS.URL_CHECK_QUERY);
		await this.utils.type(BOT_SECTION.SELECTORS.URL_INPUT_FOR_PATH_PARAMETER2, 'datepicker_option_1');
		await this.utils.click(BOT_SECTION.SELECTORS.QUESTION_SAVE_BUTTON);

		// * Slider custom
		await this.page.waitFor(500);
		await this.page.click(BOT_SECTION.SELECTORS.ADD_SUB_DIALOG);
		await this.page.type(BOT_SECTION.SELECTORS.ENTER_QUESTION_INPUT, 'Please choose your IQ level from 1 to 100');
		await this.page.click(BOT_SECTION.SELECTORS.ADD_ON);
		await this.page.select(BOT_SECTION.SELECTORS.CHOOSE_QUESTION_TYPE, 'Slider');
		await this.page.click(BOT_SECTION.SELECTORS.SLIDER_MAX_VALUE_INPUT);
		await this.page.keyboard.down('Backspace');
		await this.page.keyboard.down('Backspace');
		await this.page.type(BOT_SECTION.SELECTORS.SLIDER_MAX_VALUE_INPUT, '100');
		await this.page.click(BOT_SECTION.SELECTORS.SLIDER_MIN_VALUE_INPUT);
		await this.page.keyboard.down('Backspace');
		await this.page.keyboard.down('Backspace');
		await this.page.type(BOT_SECTION.SELECTORS.SLIDER_MIN_VALUE_INPUT, '0');
		await this.page.click(BOT_SECTION.SELECTORS.SLIDER_STEP_INPUT);
		await this.page.keyboard.down('Backspace');
		await this.page.keyboard.down('Backspace');
		await this.page.type(BOT_SECTION.SELECTORS.SLIDER_STEP_INPUT, '10');
		await this.page.click(BOT_SECTION.SELECTORS.SLIDER_DEFAULT_INPUT);
		await this.page.keyboard.down('Backspace');
		await this.page.keyboard.down('Backspace');
		await this.page.type(BOT_SECTION.SELECTORS.SLIDER_DEFAULT_INPUT, '50');
		await this.page.click(BOT_SECTION.SELECTORS.SLIDER_CUSTOM_VALUE_CHECKER);
		await this.page.type(BOT_SECTION.SELECTORS.SLIDER_CUSTOM_FROM_1, '1');
		await this.page.type(BOT_SECTION.SELECTORS.SLIDER_CUSTOM_TO_1, '20');
		await this.page.type(BOT_SECTION.SELECTORS.SLIDER_CUSTOM_VALUE_1, 'too stupped');
		await this.page.click(BOT_SECTION.SELECTORS.SLIDER_CUSTOM_ADD_1);
		await this.page.type(BOT_SECTION.SELECTORS.SLIDER_CUSTOM_FROM_2, '21');
		await this.page.type(BOT_SECTION.SELECTORS.SLIDER_CUSTOM_TO_2, '40');
		await this.page.type(BOT_SECTION.SELECTORS.SLIDER_CUSTOM_VALUE_2, 'stupped');
		await this.page.click(BOT_SECTION.SELECTORS.SLIDER_CUSTOM_ADD_2);
		await this.page.type(BOT_SECTION.SELECTORS.SLIDER_CUSTOM_FROM_3, '41');
		await this.page.type(BOT_SECTION.SELECTORS.SLIDER_CUSTOM_TO_3, '60');
		await this.page.type(BOT_SECTION.SELECTORS.SLIDER_CUSTOM_VALUE_3, 'normal');
		await this.page.click(BOT_SECTION.SELECTORS.SLIDER_CUSTOM_ADD_3);
		await this.page.type(BOT_SECTION.SELECTORS.SLIDER_CUSTOM_FROM_4, '61');
		await this.page.type(BOT_SECTION.SELECTORS.SLIDER_CUSTOM_TO_4, '80');
		await this.page.type(BOT_SECTION.SELECTORS.SLIDER_CUSTOM_VALUE_4, 'clever');
		await this.page.click(BOT_SECTION.SELECTORS.SLIDER_CUSTOM_ADD_4);
		await this.page.type(BOT_SECTION.SELECTORS.SLIDER_CUSTOM_FROM_5, '81');
		await this.page.type(BOT_SECTION.SELECTORS.SLIDER_CUSTOM_TO_5, '100');
		await this.page.type(BOT_SECTION.SELECTORS.SLIDER_CUSTOM_VALUE_5, 'super clever');
		await this.page.type(BOT_SECTION.SELECTORS.SLIDER_CUSTOM_DEFAULT_VALUE, '50');
		await this.page.click(BOT_SECTION.SELECTORS.QUESTION_SAVE_BUTTON);

		// * Slider
		await this.page.waitFor(500);
		await this.page.click(BOT_SECTION.SELECTORS.ADD_SUB_DIALOG);
		await this.page.type(BOT_SECTION.SELECTORS.ENTER_QUESTION_INPUT, 'Please mark the bot from 1 to 10');
		await this.page.click(BOT_SECTION.SELECTORS.ADD_ON);
		await this.page.select(BOT_SECTION.SELECTORS.CHOOSE_QUESTION_TYPE, 'Slider');
		await this.page.click(BOT_SECTION.SELECTORS.SLIDER_MAX_VALUE_INPUT);
		await this.page.keyboard.down('Backspace');
		await this.page.keyboard.down('Backspace');
		await this.page.type(BOT_SECTION.SELECTORS.SLIDER_MAX_VALUE_INPUT, '10');
		await this.page.click(BOT_SECTION.SELECTORS.SLIDER_MIN_VALUE_INPUT);
		await this.page.waitFor(1000);
		await this.page.keyboard.down('Backspace');
		await this.page.keyboard.down('Backspace');
		await this.page.keyboard.down('Backspace');
		await this.page.type(BOT_SECTION.SELECTORS.SLIDER_MIN_VALUE_INPUT, '1');
		await this.page.click(BOT_SECTION.SELECTORS.SLIDER_STEP_INPUT);
		await this.page.keyboard.down('Backspace');
		await this.page.keyboard.down('Backspace');
		await this.page.type(BOT_SECTION.SELECTORS.SLIDER_STEP_INPUT, '1');
		await this.page.click(BOT_SECTION.SELECTORS.SLIDER_DEFAULT_INPUT);
		await this.page.keyboard.down('Backspace');
		await this.page.keyboard.down('Backspace');
		await this.page.type(BOT_SECTION.SELECTORS.SLIDER_DEFAULT_INPUT, '5');
		await this.page.click(BOT_SECTION.SELECTORS.QUESTION_SAVE_BUTTON);

		// * Search
		// await this.page.waitFor(500);
		// await this.page.click(BOT_SECTION.SELECTORS.ADD_SUB_DIALOG);
		// await this.page.type(BOT_SECTION.SELECTORS.ENTER_QUESTION_INPUT, 'This is the result of our demo bot');
		// await this.page.click(BOT_SECTION.SELECTORS.ADD_ON);
		// await this.page.waitFor(500);
		// await this.page.select(BOT_SECTION.SELECTORS.CHOOSE_QUESTION_TYPE, 'Search');
		// await this.page.waitFor(1500);
		// const input = await this.page.$(BOT_SECTION.SELECTORS.SEARCH_UPLOAD_FILE);
		// await input.uploadFile('./ioxTest.xlsx');

		// await this.utils.compareScreenshots('flowBot', 'bot4');
		// await this.page.waitFor(1500);
		// await this.page.click(BOT_SECTION.SELECTORS.SEARCH_ADD_BUTTON);
		// await this.utils.compareScreenshots('flowBot', 'bot5');
		// await this.page.waitFor(1500);
		// await this.page.type(BOT_SECTION.SELECTORS.SEARCH_SELECT_PARAMETER_INPUT, 'freetext_option_1');
		// await this.page.type(BOT_SECTION.SELECTORS.SEARCH_SELECT_COLUMN_INPUT, 'NAME');
		// await this.page.type(BOT_SECTION.SELECTORS.SEARCH_RESULT_MESSAGE_INPUT, 'This is your selected name: $NAME');

		// await this.page.click(BOT_SECTION.SELECTORS.QUESTION_SAVE_BUTTON);

		// //? only for screenshots
		// await this.page.waitFor(1000);
		// await this.page.click('body > app-root > div > iox-page-container > div > iox-create > div > iox-conversation-tree > div > div.conversation-page > div > tree > tree-internal > ul > li > tree-internal:nth-child(10) > ul > li > div > div.node-value.ng-star-inserted > div > div > button.btn.btn-info.btn-xs.pull-right > span');
		// await this.page.waitFor(1000);
	
		// await this.page.evaluate(() => {
		// 	document.querySelector('body > app-root > div > iox-page-container > div > iox-create > div > iox-conversation-tree > div > div.conversation-page > div > tree > tree-internal > ul > li > tree-internal:nth-child(9) > ul > li > tree-internal > ul > li > div > div.node-value.ng-star-inserted > div > div > button.btn.btn-primary.btn-xs.pull-right > span')
		// 	.scrollIntoView();
		// });
		// await this.utils.compareScreenshots('flowBot', 'bot1');

		await this.utils.trainBot();
		await this.utils.deleteTrainedBot('testBotIA');

		return true;
	}

	public async test(): Promise<boolean> {
		await this.utils.click(SIDEMENU.SELECTORS.DROPDOWN);
		await this.utils.click('body > app-root > div > iox-side-menu > div > div.ng-tns-c2-0 > div > div > ul > li:nth-child(2) > a');
		await this.page.waitFor(2000);

		await this.page.waitForFunction(
			'document.querySelector("#profile > iox-registration > div > div > form > div:nth-child(1) > div:nth-child(1) > input").value == "Stepan";');

		return true;
	}
}
