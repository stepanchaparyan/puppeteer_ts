module.exports = {
    DASHBOARD: {
        SELECTORS: {
            MESSAGES_PAST_7_DAYS_TEXT_DIV: 'body > app-root > div > iox-page-container > div > iox-dashboard > div > div.col-lg-7.col-md-7.col-sm-12.col-xs-12.dashboard-column-left > div:nth-child(1) > div',
            MESSAGES_PAST_7_DAYS_MESSAGES: 'body > app-root > div > iox-page-container > div > iox-dashboard > div > div.col-lg-7.col-md-7.col-sm-12.col-xs-12.dashboard-column-left > div:nth-child(1) > div > div:nth-child(1)',
            MESSAGES_PAST_7_DAYS_NUMBER: 'body > app-root > div > iox-page-container > div > iox-dashboard > div > div.col-lg-7.col-md-7.col-sm-12.col-xs-12.dashboard-column-left > div:nth-child(1) > div > span',
            MESSAGES_PAST_7_DAYS_TEXT: 'body > app-root > div > iox-page-container > div > iox-dashboard > div > div.col-lg-7.col-md-7.col-sm-12.col-xs-12.dashboard-column-left > div:nth-child(1) > div > div:nth-child(3)',
            MESSAGES_PAST_30_DAYS_TEXT_DIV: 'body > app-root > div > iox-page-container > div > iox-dashboard > div > div.col-lg-7.col-md-7.col-sm-12.col-xs-12.dashboard-column-left > div:nth-child(2) > div',
            MESSAGES_PAST_30_DAYS_MESSAGES: 'body > app-root > div > iox-page-container > div > iox-dashboard > div > div.col-lg-7.col-md-7.col-sm-12.col-xs-12.dashboard-column-left > div:nth-child(2) > div > div:nth-child(1)',
            MESSAGES_PAST_30_DAYS_NUMBER: 'body > app-root > div > iox-page-container > div > iox-dashboard > div > div.col-lg-7.col-md-7.col-sm-12.col-xs-12.dashboard-column-left > div:nth-child(2) > div > span',
            MESSAGES_PAST_30_DAYS_TEXT: 'body > app-root > div > iox-page-container > div > iox-dashboard > div > div.col-lg-7.col-md-7.col-sm-12.col-xs-12.dashboard-column-left > div:nth-child(2) > div > div:nth-child(3)',
            SESSIONS_PAST_30_DAYS_TEXT_DIV: 'body > app-root > div > iox-page-container > div > iox-dashboard > div > div.col-lg-7.col-md-7.col-sm-12.col-xs-12.dashboard-column-left > div:nth-child(4) > div',
            SESSIONS_PAST_30_DAYS_SESSIONS: 'body > app-root > div > iox-page-container > div > iox-dashboard > div > div.col-lg-7.col-md-7.col-sm-12.col-xs-12.dashboard-column-left > div:nth-child(4) > div > div:nth-child(1)',
            SESSIONS_PAST_30_DAYS_NUMBER: 'body > app-root > div > iox-page-container > div > iox-dashboard > div > div.col-lg-7.col-md-7.col-sm-12.col-xs-12.dashboard-column-left > div:nth-child(4) > div > span',
            SESSIONS_PAST_30_DAYS_TEXT: 'body > app-root > div > iox-page-container > div > iox-dashboard > div > div.col-lg-7.col-md-7.col-sm-12.col-xs-12.dashboard-column-left > div:nth-child(4) > div > div:nth-child(3)',
            BOTS_COUNT_DIV: 'body > app-root > div > iox-page-container > div > iox-dashboard > div > div.col-lg-7.col-md-7.col-sm-12.col-xs-12.dashboard-column-left > div:nth-child(3) > div',
            BOTS_COUNT_TEXT: 'body > app-root > div > iox-page-container > div > iox-dashboard > div > div.col-lg-7.col-md-7.col-sm-12.col-xs-12.dashboard-column-left > div:nth-child(3) > div > div',
            PLATFORM_STATUS_DIV:  'body > app-root > div > iox-page-container > div > iox-dashboard > div > div.col-lg-7.col-md-7.col-sm-12.col-xs-12.dashboard-column-left > div.col-lg-12.col-md-12.col-sm-12.col-xs-12 > div',
            PLATFORM_STATUS_DIV_TEXT: 'body > app-root > div > iox-page-container > div > iox-dashboard > div > div.col-lg-7.col-md-7.col-sm-12.col-xs-12.dashboard-column-left > div.col-lg-12.col-md-12.col-sm-12.col-xs-12 > div > div.platform-status-title.dashboard-item-cornered',
            PLATFORMS_LIST: 'body > app-root > div > iox-page-container > div > iox-dashboard > div > div.col-lg-7.col-md-7.col-sm-12.col-xs-12.dashboard-column-left > div.col-lg-12.col-md-12.col-sm-12.col-xs-12 > div > div.platform-status-fields.dashboard-item-cornered > div',
            HAVING_TROUBLES: 'body > app-root > div > iox-page-container > div > iox-dashboard > div > div.col-lg-7.col-md-7.col-sm-12.col-xs-12.dashboard-column-left > div.col-lg-12.col-md-12.col-sm-12.col-xs-12 > div > div.platform-status-contact',
            CONTACT_US: 'body > app-root > div > iox-page-container > div > iox-dashboard > div > div.col-lg-7.col-md-7.col-sm-12.col-xs-12.dashboard-column-left > div.col-lg-12.col-md-12.col-sm-12.col-xs-12 > div > div.platform-status-contact > a',
            ONE_DIV_FROM_LINKED_PAGE: '#root > div > div > div.sc-iujRgT.iDFEBX > main > div.sc-hgHYgh.bnwXKX.sc-bMvGRv.fJKHca > form > input'
        },
        BOT: {
            FULL_BOT: 'body > app-root > div',
            NAME: 'body > app-root > div > iox-chat-window > div > div > div.panel-heading.top-bar > div > h3',
            BYIOX_LINK: 'body > app-root > div > iox-chat-window > div > div > div.panel-heading.top-bar > div > a > img',
            QUESTION_FIRST_ANSWER_TWO: 'body > app-root > div > iox-chat-window > div > div > div.ans-container-base > chat-select > div.chat-select > div > div > button:nth-child(2)'
        }
    }
};