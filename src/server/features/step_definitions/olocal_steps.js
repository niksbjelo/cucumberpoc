const { expect } = require("chai");
const world = require("../support/world");
const {
  setWorldConstructor,
  Given,
  When,
  Then,
} = require("@cucumber/cucumber");
const { By, Key, until } = require("selenium-webdriver");
const path = require("path");
const fs = require("fs");
const pw = require("playwright");
require("dotenv").config();

class CustomWorld {
  async connection() {
    this.browser = await pw.chromium.connectOverCDP(
      process.env.BACKEND_BROWSERLESS,
    );
    this.context = await this.browser.newContext();
    this.page = await this.context.newPage();
    this.world = world;
  }
}

setWorldConstructor(CustomWorld);

// Given steps
Given("I am on {string}", async function (url) {
  await this.connection();
  await this.page.goto(url);
});

// When steps
When(
  "I crawl in element {string} all elements {string}",
  { timeout: 777 * 1000 },
  async function (selector, selectors) {
    this.world["@LiveMusicProductionJson"] = JSON.stringify([]);
    const currentUrl = this.page?.url();
    const {
      scriptGetTitle,
      scriptGetDate,
      scriptGetPlace,
      scriptGetImage,
      scriptGetDescription,
      scriptListUrlEvents,
    } = this.world.scriptByWebsite()["LiveMusicProduction"];

    const urlEvents = await this.page?.evaluate(
      (scriptListUrlEvents) => eval(scriptListUrlEvents),
      scriptListUrlEvents(selector, selectors),
    );
    console.log(urlEvents);
    const Events = [];

    for (let url of urlEvents) {
      try {
        await this.page?.goto(url);
        const event = {
          id: url,
          title: await this.page?.evaluate(
            (scriptGetTitle) => eval(scriptGetTitle),
            scriptGetTitle,
          ),
          date: await this.page?.evaluate(
            (scriptGetDate) => eval(scriptGetDate),
            scriptGetDate,
          ),
          place: await this.page?.evaluate(
            (scriptGetPlace) => eval(scriptGetPlace),
            scriptGetPlace,
          ),
          image: await this.page?.evaluate(
            (scriptGetImage) => eval(scriptGetImage),
            scriptGetImage,
          ),
          description: await this.page?.evaluate(
            (scriptGetDescription) => eval(scriptGetDescription),
            scriptGetDescription,
          ),
          info: "",
        };

        Events.push(event);

        await this.page?.goto(currentUrl);
      } catch (e) {
        break;
      }
    }
    this.world["@LiveMusicProductionJson"] = JSON.stringify(Events);
    fs.writeFile(
      "./LiveMusicProd.json",
      JSON.stringify(Events),
      function (err) {
        if (err) throw err;
      },
    );
  },
);
When("I scroll to bottom to load all events", async function () {
  await page.evaluate(() => {
    window.scrollTo(0, document.body.scrollHeight);
  });
});

Then("I should see {string}", async function (text) {
  const elem = await this.driver.findElement(By.css("body"));
  const test = await this.driver.wait(
    until.elementTextContains(elem, text),
    10000,
  );
  const pageText = await test.getText();
  expect(pageText).to.contain(text);
});

Then("I should see {string} Element", async function (elementName) {
  const elementPresent = await this.driver
    .findElement(By.css(elementName))
    .isPresent();
  expect(elementPresent).to.be.true;
});
