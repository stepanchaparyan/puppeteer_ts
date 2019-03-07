import {DASHBOARD} from '../helpers/constants/dashboardConstants.js';
import {NAVBAR} from '../helpers/constants/navbarConstants.js';
import {BOT_SECTION} from '../helpers/constants/botsSectionConstants.js';
import {IFRAME} from '../helpers/constants/iframeConstants.js';
import Utils from '../helpers/utils';

export default class Dashboard {
    private browser: any;
    private page: any;
    private utils: any;
    
    constructor(page, browser) {
        this.browser = browser;
        this.page = page;
        this.utils = new Utils(page);
    }
    async pageTitle() : Promise<string> {
        return await this.page.title();
    }
    async fourDivsColorsUI() : Promise<boolean> {
        await this.page.click(NAVBAR.SELECTORS.DASHBOARD);
        const options = {x: 300, y: 110, width: 160, height: 290};
        const noDiff = await this.utils.compareScreenshotsWithClip('dashboard','fourDivColors', options);
        return await noDiff;
    }

    async messagesPast7DaysExist() : Promise<boolean> {
        await this.page.click(NAVBAR.SELECTORS.DASHBOARD);
        return await this.page.$(DASHBOARD.SELECTORS.MESSAGES_PAST_7_DAYS_TEXT_DIV) !== null;
    }
    async messagesPast7DaysMessages() : Promise<string> {
        await this.page.click(NAVBAR.SELECTORS.DASHBOARD);
        return await this.page.$eval(DASHBOARD.SELECTORS.MESSAGES_PAST_7_DAYS_MESSAGES, text => text.innerText);
    }
    async messagesPast7DaysText() : Promise<string> {
        await this.page.click(NAVBAR.SELECTORS.DASHBOARD);
        return await this.page.$eval(DASHBOARD.SELECTORS.MESSAGES_PAST_7_DAYS_TEXT, text => text.innerText);
    }
    async messagesPast7DaysNumber() : Promise<boolean> {
        await this.page.click(NAVBAR.SELECTORS.DASHBOARD);
        await this.page.waitFor(1000);
        const messagesCountBefore = await this.page.$eval(DASHBOARD.SELECTORS.MESSAGES_PAST_7_DAYS_NUMBER, text => text.innerText);
        await this.page.click(NAVBAR.SELECTORS.BOTS);
        const botNumber = await this.utils.getCorrespondingBotNumber('clickOnGoogle');
        await this.page.waitForSelector(`body > app-root > div > iox-page-container > div > iox-bots > div > div:nth-child(${botNumber}) > iox-bot-item > div > div.img-container > img`);
        await this.page.click(`body > app-root > div > iox-page-container > div > iox-bots > div > div:nth-child(${botNumber}) > iox-bot-item > div > div.img-container > img`);
        await this.page.waitForSelector(BOT_SECTION.SELECTORS.RUN);
        await this.page.click(BOT_SECTION.SELECTORS.RUN);
        // wait for iframe loading
        await this.page.waitFor(3000);
        const frame = await this.page.frames().find(frame => frame.name() === 'responsiveFrame');
        const mainButton = await frame.$(IFRAME.SELECTORS.MAIN_BUTTON);
        await mainButton.click();
        await this.page.waitFor(1000);
        const agreement_checkbox = await frame.$(IFRAME.SELECTORS.AGREEMENT_CHECKBOX);
        await agreement_checkbox.click();
        const agreement_confirm_button = await frame.$(IFRAME.SELECTORS.AGREEMENT_CONFIRM_BUTTON);
        await agreement_confirm_button.click();
        await this.page.waitFor(2000);
        const google_button = await frame.$(IFRAME.SELECTORS.GOOGLE);
        await google_button.click();
        await this.page.waitFor(1500);
        await this.page.click(NAVBAR.SELECTORS.DASHBOARD);
        await this.page.waitFor(1000);
        const messagesCountAfter = await this.page.$eval(DASHBOARD.SELECTORS.MESSAGES_PAST_7_DAYS_NUMBER, text => text.innerText);
        // console.log('before', messagesCountBefore);
        // console.log('after ', messagesCountAfter);
        const addedOneMessage = Number(messagesCountBefore) + 1 === Number(messagesCountAfter) ? true : false;
        return await addedOneMessage;
    }

    async messagesPast30DaysExist() : Promise<boolean> {
        await this.page.click(NAVBAR.SELECTORS.DASHBOARD);
        return await this.page.$(DASHBOARD.SELECTORS.MESSAGES_PAST_30_DAYS_TEXT_DIV) !== null;
    }
    async messagesPast30DaysMessages() : Promise<string> {
        await this.page.click(NAVBAR.SELECTORS.DASHBOARD);
        return await this.page.$eval(DASHBOARD.SELECTORS.MESSAGES_PAST_30_DAYS_MESSAGES, text => text.innerText);
    }
    async messagesPast30DaysText() : Promise<string> {
        await this.page.click(NAVBAR.SELECTORS.DASHBOARD);
        return await this.page.$eval(DASHBOARD.SELECTORS.MESSAGES_PAST_30_DAYS_TEXT, text => text.innerText);
    }
    async messagesPast30DaysNumber() : Promise<boolean> {
        await this.page.click(NAVBAR.SELECTORS.DASHBOARD);
        await this.page.waitFor(1000);
        const messagesCountBefore = await this.page.$eval(DASHBOARD.SELECTORS.MESSAGES_PAST_30_DAYS_NUMBER, text => text.innerText);
        await this.page.click(NAVBAR.SELECTORS.BOTS);
        const botNumber = await this.utils.getCorrespondingBotNumber('clickOnGoogle');
        await this.page.waitForSelector(`body > app-root > div > iox-page-container > div > iox-bots > div > div:nth-child(${botNumber}) > iox-bot-item > div > div.img-container > img`);
        await this.page.click(`body > app-root > div > iox-page-container > div > iox-bots > div > div:nth-child(${botNumber}) > iox-bot-item > div > div.img-container > img`);
        await this.page.waitForSelector(BOT_SECTION.SELECTORS.RUN);
        await this.page.click(BOT_SECTION.SELECTORS.RUN);
        // wait for iframe loading
        await this.page.waitFor(3000);
        const frame = await this.page.frames().find(frame => frame.name() === 'responsiveFrame');
        const mainButton = await frame.$(IFRAME.SELECTORS.MAIN_BUTTON);
        await mainButton.click();
        await this.page.waitFor(2000);
        const google_button = await frame.$(IFRAME.SELECTORS.GOOGLE);
        await google_button.click();
        await this.page.waitFor(1500);
        await this.page.click(NAVBAR.SELECTORS.DASHBOARD);
        await this.page.waitFor(1000);
        const messagesCountAfter = await this.page.$eval(DASHBOARD.SELECTORS.MESSAGES_PAST_30_DAYS_NUMBER, text => text.innerText);
        // console.log('before', messagesCountBefore);
        // console.log('after ', messagesCountAfter);
        const addedOneMessage = Number(messagesCountBefore) + 1 === Number(messagesCountAfter) ? true : false;
        return await addedOneMessage;
    }

    async sessionsPast30DaysExist() : Promise<boolean>{
        await this.page.click(NAVBAR.SELECTORS.DASHBOARD);
        return await this.page.$(DASHBOARD.SELECTORS.SESSIONS_PAST_30_DAYS_TEXT_DIV) !== null;
    }
    async sessionsPast30DaysSessions() : Promise<string>{
        await this.page.click(NAVBAR.SELECTORS.DASHBOARD);
        return await this.page.$eval(DASHBOARD.SELECTORS.SESSIONS_PAST_30_DAYS_SESSIONS, text => text.innerText);
    }
    async sessionsPast30DaysText() : Promise<string>{
        await this.page.click(NAVBAR.SELECTORS.DASHBOARD);
        return await this.page.$eval(DASHBOARD.SELECTORS.SESSIONS_PAST_30_DAYS_TEXT, text => text.innerText);
    }
    async sessionsPast30DaysNumber() : Promise<boolean>{
        await this.page.click(NAVBAR.SELECTORS.DASHBOARD);
        await this.page.waitFor(1000);
        const messagesCountBefore = await this.page.$eval(DASHBOARD.SELECTORS.SESSIONS_PAST_30_DAYS_NUMBER, text => text.innerText);
        await this.page.click(NAVBAR.SELECTORS.BOTS);
        const botNumber = await this.utils.getCorrespondingBotNumber('clickOnGoogle');
        await this.page.waitForSelector(`body > app-root > div > iox-page-container > div > iox-bots > div > div:nth-child(${botNumber}) > iox-bot-item > div > div.img-container > img`);
        await this.page.click(`body > app-root > div > iox-page-container > div > iox-bots > div > div:nth-child(${botNumber}) > iox-bot-item > div > div.img-container > img`);
        await this.page.waitForSelector(BOT_SECTION.SELECTORS.RUN);
        await this.page.click(BOT_SECTION.SELECTORS.RUN);
        // wait for iframe loading
        await this.page.waitFor(3000);
        const frame = await this.page.frames().find(frame => frame.name() === 'responsiveFrame');
        const mainButton = await frame.$(IFRAME.SELECTORS.MAIN_BUTTON);
        await mainButton.click();
        await this.page.waitFor(2000);
        const google_button = await frame.$(IFRAME.SELECTORS.GOOGLE);
        await google_button.click();
        await this.page.waitFor(1500);
        await this.page.click(NAVBAR.SELECTORS.DASHBOARD);
        await this.page.waitFor(1000);
        const messagesCountAfter = await this.page.$eval(DASHBOARD.SELECTORS.SESSIONS_PAST_30_DAYS_NUMBER, text => text.innerText);
        // console.log('before', messagesCountBefore);
        // console.log('after ', messagesCountAfter);
        const addedOneMessage = Number(messagesCountBefore) + 1 === Number(messagesCountAfter) ? true : false;
        return await addedOneMessage;
    }

    async botsCountDivExist() : Promise<boolean> {
        await this.page.click(NAVBAR.SELECTORS.DASHBOARD);
        return await this.page.$(DASHBOARD.SELECTORS.BOTS_COUNT_DIV) !== null;
    }
    async botsCountDivText() : Promise<string> {
        await this.page.click(NAVBAR.SELECTORS.DASHBOARD);
        return await this.page.$eval(DASHBOARD.SELECTORS.BOTS_COUNT_TEXT, text => text.innerText);
    }
    async botsCount() : Promise<boolean> {
        await this.page.click(NAVBAR.SELECTORS.DASHBOARD);
        await this.page.waitFor(1000);
        const botsCountText = await this.page.$eval(DASHBOARD.SELECTORS.BOTS_COUNT_TEXT, text => text.innerText);
        const botsCount = botsCountText.substr(0,2);
        await this.page.click(NAVBAR.SELECTORS.BOTS);
        const botsCountsReal = await this.page.$$eval(BOT_SECTION.SELECTORS.ALL_BOTS, bots => bots.length);
        const botsCountIsRight = Number(botsCountsReal) - 1 === Number(botsCount) ? true : false;
        return await botsCountIsRight;
    }

    async platformStatusDivUI() : Promise<boolean> {
        await this.page.click(NAVBAR.SELECTORS.DASHBOARD);
        await this.page.waitFor(1000);
        const platformStatusDiv = await this.page.$(DASHBOARD.SELECTORS.PLATFORM_STATUS_DIV);
        const noDiff = await this.utils.compareScreenshots('dashboard','platformStatus', platformStatusDiv);
        return await noDiff;
    }
    async platformStatusText() : Promise<string> {
        await this.page.click(NAVBAR.SELECTORS.DASHBOARD);
        return await this.page.$eval(DASHBOARD.SELECTORS.PLATFORM_STATUS_DIV_TEXT, text => text.innerText);
    }
    async platformsList() : Promise<any> {
        let platforms = [];
        const tweets = await this.page.$$(DASHBOARD.SELECTORS.PLATFORMS_LIST);
        for (let i = 0; i < tweets.length; i++) {
        const platform = await (await tweets[i].getProperty('innerText')).jsonValue();
        platforms.push(platform);
        }
        return await platforms;
    } 
    async troublesText() : Promise<string> {
        await this.page.click(NAVBAR.SELECTORS.DASHBOARD);
        return await this.page.$eval(DASHBOARD.SELECTORS.HAVING_TROUBLES, text => text.innerText);
    }
    async contactUsLink() : Promise<string> {
        await this.page.click(NAVBAR.SELECTORS.DASHBOARD);
        await this.page.click(DASHBOARD.SELECTORS.CONTACT_US);
        await this.page.waitFor(1000);
        const url = this.page.url();
        await this.page.goBack();
        return await url;
    }

    async chatBotUI() : Promise<boolean> {
        await this.page.click(NAVBAR.SELECTORS.DASHBOARD);
        await this.page.waitFor(4000); // wait for iframe loading
        const frame = await this.page.frames().find(frame => frame.url() === 'https://app.iox.bot/iox-chatbot/chatwindow');
        const frameDiv = await frame.$(DASHBOARD.BOT.FULLBOT);
        await this.utils.compareScreenshots('dashboard', 'dashboardChatBot', frameDiv);
        return await true;
    }
    async chatBotTitle() : Promise<string> {
        await this.page.click(NAVBAR.SELECTORS.DASHBOARD);
        const frame = await this.page.frames().find(frame => frame.url() === 'https://app.iox.bot/iox-chatbot/chatwindow');
        const botName = await frame.$eval(DASHBOARD.BOT.NAME, name => name.innerText);
        return await botName;
    }
    async chatBotByIOXURL() : Promise<string> {
        await this.page.click(NAVBAR.SELECTORS.DASHBOARD);
        const frame = await this.page.frames().find(frame => frame.url() === 'https://app.iox.bot/iox-chatbot/chatwindow');
        const byIOXButton = await frame.$(DASHBOARD.BOT.BYIOXLINK);
        await byIOXButton.click();
        await this.page.waitFor(2000);
        const pages = await this.browser.pages();
        const url = await pages[2].url();
        return await url;
    }
    async chatBotConversation() : Promise<boolean> {
        await this.page.click(NAVBAR.SELECTORS.DASHBOARD);
        // wait for iframe loading
        await this.page.waitFor(2000);
        const frame = await this.page.frames().find(frame => frame.url() === 'https://app.iox.bot/iox-chatbot/chatwindow');
        const optionTwo = await frame.$(DASHBOARD.BOT.QUESTION_FIRST_ANSWER_TWO);
        await optionTwo.click();
        await this.page.waitFor(2500);
        const frameDiv = await frame.$(DASHBOARD.BOT.FULLBOT);
        await this.utils.compareScreenshots('dashboard','dashboardChatBotStepTwo', frameDiv);
        return await true;
    }

}