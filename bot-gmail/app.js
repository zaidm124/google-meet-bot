const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());

async function mailRedirect () {
    const browser = await puppeteer.launch({
        headless: false,
        args: ['--disable-notifications', '--mute-audio', '--enable-automation', '--start-maximized'],
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
    await page.type('input[type="email"]', 'ui20cs74@iiitsurat.ac.in');

    //Next
    await page.waitForSelector('.VfPpkd-vQzf8d');
    await page.click('.VfPpkd-vQzf8d');

    //Type Password
    await page.waitForTimeout(3500);
    await page.waitForSelector('input[type="password"]');
    await page.type('input[type="password"]', 'IIITrocks@surat');

    //Next
    await page.waitForSelector('.VfPpkd-vQzf8d');
    await page.click('.VfPpkd-vQzf8d');

    await page.waitForNavigation();
    await page.waitForSelector('.zA');
    await page.click('.zA');

    await page.waitForSelector('.a3s.aiL a');
    let value;
    let list = await page.evaluate(() =>
        Array.from(document.querySelectorAll('.a3s.aiL a'),
            e => e.href));
    // console.log(list);
    if (list.length) {
        list.map((l) => {
            if (l.includes('meet')) {
                value = l;
            }
        });
    }
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
    await page.waitForTimeout(2000);
    await page.waitForSelector('.l4V7wb.Fxmcue span');
    await page.click('.l4V7wb.Fxmcue span');

}

module.exports = mailRedirect;
