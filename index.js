import puppeteer from "puppeteer";
import * as cron from "node-cron";
const users = [
  {
    username: "21becsd009",
    password: "852003",
  },
  {
    username: "21becsd065",
    password: "11122002",
  },
  //   {
  //     username: "21becsd031",
  //     password: "11122002",
  //   },
];
const capture = async ({ username, password }) => {
  const browser = await puppeteer.launch({
    defaultViewport: {
      height: 1080,
      width: 1980,
    },
  });
  const page = await browser.newPage();

  await page.goto(
    "http://karpagam.edu.in/Automation/studentOnline.do?param=login&Id=1"
  );

  await page.type("#rollNo", "21becsd009");
  await page.type("#password", "852003");
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

// cron.schedule("0 2 * * 1-6", () => {
//   users.forEach((user) => {
//     capture({
//       username: user.username,
//       password: user.password,
//     });
//   });
// });

users.forEach(async (user) => {
  await capture({
    username: user.username,
    password: user.password,
  });
});
