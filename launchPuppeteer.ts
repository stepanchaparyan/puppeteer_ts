import * as puppeteer from 'puppeteer';

const defaultOptions = {
    headless: false,
    //args: ['--start-maximized'],
    //ignoreHTTPSErrors: false
};

export default async (options = undefined) => {
    const puppeteerOptions = (options === undefined) ? defaultOptions : options;
    return await puppeteer.launch(puppeteerOptions);
};
