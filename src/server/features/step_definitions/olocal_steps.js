const { expect } = require("chai");
const { By, until } = require("selenium-webdriver");
const {
  Given,
  When,
  Then,
  setWorldConstructor,
} = require("@cucumber/cucumber");

// Given steps
Given("I am on {string}", async function (url) {
  await this.connection();
  (await this.page?.goto(url, { waitUntil: "load", timeout: 77700000 })) ??
    this.driver?.get(url);
  const tag = await this.tag;
  this.domain = "";
  if (["Payot", "SmsGagnant"].includes(tag)) {
    this.domain = url;
  }
});

// When steps
When(
  "I am waitting {int} seconds",
  { timeout: 777000 * 1000 },
  async function (seconds) {
    await this.waitForSeconds(seconds);
  },
);
When(
  "I display all events du site",
  { timeout: 777000 * 1000 },
  async function () {
    const tag = await this.tag;
    const { scriptNbUrlEvents, selectorToBeCounted, clickMoreEvents } =
      this.world.scriptByWebsite()[tag];
    let nbEvents =
      (await this.page?.evaluate(
        (scriptNbUrlEvents) => eval(scriptNbUrlEvents),
        scriptNbUrlEvents(selectorToBeCounted),
      )) ??
      (await this.driver?.executeScript(
        scriptNbUrlEvents(selectorToBeCounted),
      ));
    let nbAddEvents = 0;

    while (true) {
      if (!clickMoreEvents) {
        (await this.page?.evaluate(() => {
          window.scrollTo(0, document.body.scrollHeight);
        })) ??
          (await this.driver?.executeScript(
            `window.scrollTo(0, document.body.scrollHeight);`,
          ));
      } else {
        (await this.page?.evaluate(() => {
          const moreEvents = document.querySelector("#MainContent_linkbtPlus");
          if (moreEvents) {
            moreEvents.click();
          }
        })) ??
          (await this.driver?.executeScript(
            `const moreEvents = document.querySelector("#MainContent_linkbtPlus");
                if(moreEvents){
                    moreEvents.click();
                }`,
          ));
      }
      await this.waitForSeconds(7);

      nbAddEvents =
        (await this.page?.evaluate(
          (scriptNbUrlEvents) => eval(scriptNbUrlEvents),
          scriptNbUrlEvents(selectorToBeCounted),
        )) ??
        (await this.driver?.executeScript(
          scriptNbUrlEvents(selectorToBeCounted),
        ));

      if (nbEvents === nbAddEvents) {
        break;
      }

      nbEvents = nbAddEvents;
    }
  },
);

When(
  "I crawl all elements {string}",
  { timeout: 777000 * 1000 },
  async function (selector) {
    const tag = await this.tag;
    console.log(tag);

    const {
      scriptGetTitle,
      scriptGetSubTitle,
      scriptGetDate,
      scriptGetPlace,
      scriptGetImage,
      scriptGetStyle,
      scriptGetPrice,
      scriptGetDescription,
      scriptListUrlEvents,
    } = this.world.scriptByWebsite()[tag];

    const urlEvents =
      (await this.page?.evaluate(
        (scriptListUrlEvents) => eval(scriptListUrlEvents),
        scriptListUrlEvents(selector),
      )) ?? (await this.driver.executeScript(scriptListUrlEvents(selector)));

    console.log(urlEvents);
    const Events = [];

    for (let url of urlEvents) {
      try {
        (await this.page?.goto(this.domain + url)) ??
          (await this.driver?.get(this.domain + url));
        if (tag === "VilleDeLausanne") {
          await this.waitForSeconds(7);
        }
        const event = {
          id: this.domain + url,
          title:
            (await this.page?.evaluate(
              (scriptGetTitle) => eval(scriptGetTitle),
              scriptGetTitle,
            )) ?? (await this.driver.executeScript(scriptGetTitle ?? "")),
          subtitle:
            (await this.page?.evaluate(
              (scriptGetSubTitle) => eval(scriptGetSubTitle),
              scriptGetSubTitle,
            )) ?? (await this.driver.executeScript(scriptGetSubTitle ?? "")),
          date:
            (await this.page?.evaluate(
              (scriptGetDate) => eval(scriptGetDate),
              scriptGetDate,
            )) ?? (await this.driver.executeScript(scriptGetDate)),
          place:
            (await this.page?.evaluate(
              (scriptGetPlace) => eval(scriptGetPlace),
              scriptGetPlace,
            )) ?? (await this.driver.executeScript(scriptGetPlace)),
          price:
            (await this.page?.evaluate(
              (scriptGetPrice) => eval(scriptGetPrice),
              scriptGetPrice,
            )) ?? (await this.driver.executeScript(scriptGetPrice ?? "")),
          style:
            (await this.page?.evaluate(
              (scriptGetStyle) => eval(scriptGetStyle),
              scriptGetStyle,
            )) ?? (await this.driver.executeScript(scriptGetStyle ?? "")),
          image:
            (await this.page?.evaluate(
              (scriptGetImage) => eval(scriptGetImage),
              scriptGetImage,
            )) ?? (await this.driver.executeScript(scriptGetImage)),
          description:
            (await this.page?.evaluate(
              (scriptGetDescription) => eval(scriptGetDescription),
              scriptGetDescription,
            )) ?? (await this.driver.executeScript(scriptGetDescription)),
          info: "",
        };
        Events.push(event);
      } catch (e) {
        console.log(e);
        break;
      }
    }

    this.world.resultJson = JSON.stringify(Events, null, 2);
  },
);

When("I scroll to bottom to load all events", async function () {
  await this.page.evaluate(() => {
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

Then(
  "I should see {string} Element",
  { timeout: 777000 * 1000 },
  async function (selector) {
    await this.driver.wait(until.elementLocated(By.css(selector)), 10000);
  },
);

Then("Crawl is finished", async function () {
  const tag = await this.tag;
  console.log(`${tag} crawl is finished `);
});
