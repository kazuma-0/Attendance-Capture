import puppeteer from "puppeteer";
import * as cron from "node-cron";
import dotenv from "dotenv";
dotenv.config();
const users = JSON.parse(process.env.USERS);
const capture = async ({ username, password }) => {
  const browser = await puppeteer.launch({
    headless: false,
    executablePath: "/usr/bin/google-chrome",
    defaultViewport: {
      height: 1080,
      width: 1980,
    },
  });
  const page = await browser.newPage();

  await page.goto(
    "http://karpagam.edu.in/Automation/studentOnline.do?param=login&Id=1"
  );

  await page.type("#rollNo", username);
  await page.type("#password", password);
  await page.click("[value=Login");
  await page.waitForNetworkIdle();
  await page.evaluate(() => {
    document
      .querySelector(
        "#mnuStudent > ul > li:nth-child(1) > ul > li:last-child > a"
      )
      .click();
  });
  await page.waitForNetworkIdle();
  await page.click('[value="Overall Attendance Details"]');
  await page.waitForNetworkIdle();
  const date = new Date();
  await page.screenshot({
    path: `screenshots/${username}-${date
      .toDateString()
      .replaceAll(" ", "-")}.png`,
  });
  await browser.close();
};
cron.schedule("0 2 * * 1-6", () => {
  users.forEach((user) => {
    capture({
      username: user.username,
      password: user.password,
    });
  });
});

users.forEach((user) => {
  capture({
    username: user.username,
    password: user.password,
  });
});
