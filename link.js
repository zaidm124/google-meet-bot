const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());
const linkFromTheTable = require('./linkFromTimetable');
const mailRedirect = require('./app');
require('dotenv').config();

async function link (meet) {
    const browser = await puppeteer.launch({
        headless: false,
        args: ['--disable-notifications', '--enable-automation', '--start-maximized'],
        ignoreDefaultArgs: false,
    });
    let finalLink = linkFromTheTable();
    const [page] = await browser.pages();
    if (finalLink || meet) {
        await page.goto('https://accounts.google.com');
        const context = browser.defaultBrowserContext();
        await context.clearPermissionOverrides();
        if (finalLink) {
            await context.overridePermissions(`https://meet.google.com/${finalLink}`.origin, ['camera', 'microphone', 'notifications']);
        } else {
            await context.overridePermissions(`https://meet.google.com/${meet}`.origin, ['camera', 'microphone', 'notifications']);
        }

        //Type username
        await page.waitForSelector('input[type="email"]');
        await page.type('input[type="email"]', 'ui20cs74@iiitsurat.ac.in');

        //Next
        await page.waitForSelector('.VfPpkd-vQzf8d');
        await page.click('.VfPpkd-vQzf8d');

        //Type Password
        await page.waitForTimeout(3500);
        await page.waitForSelector('input[type="password"]');
        await page.type('input[type="password"]', 'IIITrocks@surat');

        await page.waitForSelector('.VfPpkd-vQzf8d');
        await page.click('.VfPpkd-vQzf8d');

        await page.waitForNavigation();

    }

    if (!finalLink && !meet) {
        page.close();
        mailRedirect();
    } else if (meet) {

        await page.goto(`https://meet.google.com/${meet}`);
        //Microphone muted
        await page.waitForSelector('.U26fgb.JRY2Pb.mUbCce.kpROve.yBiuPb.y1zVCf.M9Bg4d.HNeRed');
        await page.click('.U26fgb.JRY2Pb.mUbCce.kpROve.yBiuPb.y1zVCf.M9Bg4d.HNeRed');
        //Camera off
        await page.waitForSelector('.U26fgb.JRY2Pb.mUbCce.kpROve.yBiuPb.y1zVCf.M9Bg4d.HNeRed');
        await page.click('.U26fgb.JRY2Pb.mUbCce.kpROve.yBiuPb.y1zVCf.M9Bg4d.HNeRed');

        await page.waitForTimeout(2000);
        await page.waitForSelector('.l4V7wb.Fxmcue span');
        await page.click('.l4V7wb.Fxmcue span');

    } else if (finalLink) {
        await page.goto(`https://meet.google.com/${finalLink}`);
        //Microphone muted
        await page.waitForSelector('.U26fgb.JRY2Pb.mUbCce.kpROve.yBiuPb.y1zVCf.M9Bg4d.HNeRed');
        await page.click('.U26fgb.JRY2Pb.mUbCce.kpROve.yBiuPb.y1zVCf.M9Bg4d.HNeRed');
        //Camera off
        await page.waitForSelector('.U26fgb.JRY2Pb.mUbCce.kpROve.yBiuPb.y1zVCf.M9Bg4d.HNeRed');
        await page.click('.U26fgb.JRY2Pb.mUbCce.kpROve.yBiuPb.y1zVCf.M9Bg4d.HNeRed');

        await page.waitForTimeout(2000);
        await page.waitForSelector('.l4V7wb.Fxmcue span');
        await page.click('.l4V7wb.Fxmcue span');
    }

    // if (finalLink) {
    //     await newPage.goto(`https://meet.google.com/${finalLink}`);
    // } else {
    //     await newPage.goto(`https://meet.google.com/${meet}`);
    // }
}

module.exports = link;
