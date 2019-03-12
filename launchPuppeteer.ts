import * as puppeteer from 'puppeteer';

const defaultOptions = {
    headless: false,
    //args: ['--start-maximized'],
    //headless: true, ignoreHTTPSErrors: true
};

export default async (options = undefined) => {
    const puppeteerOptions = (options === undefined) ? defaultOptions : options;
    return await puppeteer.launch(puppeteerOptions);
};
