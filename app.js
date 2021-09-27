const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());
require('dotenv').config();

async function mailRedirect () {
    const browser = await puppeteer.launch({
        headless: false,
        args: ['--disable-notifications', '--enable-automation', '--start-maximized'],
        ignoreDefaultArgs: true,
    });
    const [page] = await browser.pages();
    // const acceptBeforeUnload = dialog =>
    //     dialog.type() === 'beforeunload' && dialog.accept()
    // ;
    // page.on('dialog', acceptBeforeUnload);

    const context = browser.defaultBrowserContext();
    await context.clearPermissionOverrides();
    await context.overridePermissions('https://mail.google.com/'.origin, ['camera', 'microphone', 'notifications']);
    await context.overridePermissions(`https://meet.google.com/`.origin, ['camera', 'microphone', 'notifications']);

    await page.goto('https://mail.google.com/');

    //Type username
    await page.waitForSelector('input[type="email"]');
    await page.type('input[type="email"]', process.env.USERID);

    //Next
    await page.waitForSelector('.VfPpkd-vQzf8d');
    await page.click('.VfPpkd-vQzf8d');

    //Type Password
    await page.waitForTimeout(3500);
    await page.waitForSelector('input[type="password"]');
    await page.type('input[type="password"]', process.env.PASSWORD);

    //Next
    await page.waitForSelector('.VfPpkd-vQzf8d');
    await page.click('.VfPpkd-vQzf8d');

    await page.waitForNavigation();
    await page.waitForSelector('.zA');
    await page.click('.zA');

    await page.waitForSelector('.a3s.aiL');
    let value;
    let list = await page.evaluate(() =>
        Array.from(document.querySelectorAll('.a3s.aiL a'),
            e => e.href));
    console.log(list);
    let meetLinks = [];
    if (list.length) {
        list.map((l) => {
            if (l.includes('meet')) {
                meetLinks.push(l);
            }
        });
        value = meetLinks[0];
    }

    console.log(value);
    if (!value) {
        value = 'https://meet.google.com/';
        await page.goto(value);//Redirect to google meet
        await page.waitForNavigation();
    } else {
        await page.goto(value);//Redirect to google meet
        console.log(value);
    }

    //Microphone muted
    await page.waitForSelector('.U26fgb.JRY2Pb.mUbCce.kpROve.yBiuPb.y1zVCf.M9Bg4d.HNeRed');
    await page.click('.U26fgb.JRY2Pb.mUbCce.kpROve.yBiuPb.y1zVCf.M9Bg4d.HNeRed');

    //Camera off
    await page.waitForSelector('.U26fgb.JRY2Pb.mUbCce.kpROve.yBiuPb.y1zVCf.M9Bg4d.HNeRed');
    await page.click('.U26fgb.JRY2Pb.mUbCce.kpROve.yBiuPb.y1zVCf.M9Bg4d.HNeRed');

    //Join Button
    await page.waitForTimeout(2200);
    await page.waitForSelector('.l4V7wb.Fxmcue span');
    await page.click('.l4V7wb.Fxmcue span');

}

module.exports = mailRedirect;
