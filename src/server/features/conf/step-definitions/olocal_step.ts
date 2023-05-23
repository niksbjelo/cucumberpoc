import { expect } from "chai";
import {
  Given,
  When,
  Then,
} from "@cucumber/cucumber";
import {
  type IRunOptions,
  type IRunResult,
  runCucumber,
} from "@cucumber/cucumber/api";
import { Builder, By, until, Capabilities } from "selenium-webdriver";
import * as fs from "fs";

//export async function CustomWorld(this: IWorld<Builder>) {
const chromeCapabilities = Capabilities.chrome();
chromeCapabilities.setBrowserName("chrome");
chromeCapabilities.set(
  "browserless:token",
  process.env.BACKEND_BROWSERLESS_TOKEN as string,
);
//chromeCapabilities.setAcceptInsecureCerts(true);
chromeCapabilities.set("goog:chromeOptions", {
  w3c: false,
  args: [
    "--disable-dev-shm-usage",
    "--headless",
    "--no-sandbox",
    "--disable-gpu",
    "--window-size=1920,1080",
  ],
});
const driver = new Builder()
  .usingServer(process.env.BACKEND_BROWSERLESS_URL as string)
  .forBrowser("chrome")
  .withCapabilities(chromeCapabilities)
  .build();

void driver.manage().setTimeouts({
  implicit: 10000,
  pageLoad: 70000,
});

type Event = {
  id: string;
  title: string;
  date: string;
  place: string;
  image?: string;
  description?: string;
  info?: string;
};

export async function runCrawl() {
  // Given steps
  Given("I am on {string}", async function (url: string) {
    await driver.get(url);
  });

  Given("I am on the homepage", async function () {
    await driver.get("/");
  });

  Given("I am on the {string} page", async function (page: string) {
    await driver.get(page);
  });

  // When steps
  When("I click on {string}", async function (string: string) {
    await driver.findElement(By.css(string)).click();
  });
  When(
    "I wait for {int} seconds",
    { timeout: 60 * 1000 },
    async function (seconds) {
      await new Promise((resolve) => setTimeout(resolve, seconds * 1000));
    },
  );

  When(
    "I enter {string} into the {string} field",
    async function (value: string, fieldName: string) {
      await driver.findElement(By.css(`[name="${fieldName}"]`)).sendKeys(value);
    },
  );

  When(
    "I select {string} from the {string} dropdown",
    async function (option: string, selector: string) {
      await driver
        .findElement(
          By.xpath(
            `//select[@id='${selector}']//option[contains(text(), "${option}")]`,
          ),
        )
        .click();
    },
  );

  When("I check the {string} checkbox", async function (checkboxName: string) {
    await driver.findElement(By.css(`[name="${checkboxName}"]`)).click();
  });

  When("I click the {string} button", async function (buttonText: string) {
    const button = await driver.findElement(
      By.xpath(`//button[contains(text(), "${buttonText}")]`),
    );
    await button.click();
  });

  When("I click on {string} link", async function (linkText: string) {
    const link = await driver.findElement(
      By.xpath(`//a[contains(text(), "${linkText}")]`),
    );
    await link.click();
  });

  When(
    "I crawl in element {string} all elements {string}",
    async function (selector: string, selectors: string) {
      const currentUrl = await driver.getCurrentUrl();
      const listEvent: Element[] = await driver.executeScript(`
    return document.querySelectorAll("${selector} > ${selectors}")
  `);
      const events: Event[] = [];

      listEvent.map(async (elem: Element) => {
        await driver.executeScript(`
      const elem = ${elem};
      elem.click()

    `);

        const event: Event = {
          id: (await driver.getCurrentUrl()) ?? "",
          title: await driver.executeScript(`
    return document.querySelector(".performance__title").textContent
  `),
          date: await driver.executeScript(`
    return document.querySelector(".performance__controls__head").textContent.split('|')[0].replaceAll(/(\\n|\\t)/g, '').trim()
  `),
          place: await driver.executeScript(`
    return document.querySelector(".performance__controls__head").textContent.split('|')[1].replaceAll(/(\\n|\\t)/g, '').trim()
  `),
          image: await driver.executeScript(`
    return document.querySelector(".performance__info__pic > img").getAttribute('src')
  `),
          description: await driver.executeScript(`
    return document.querySelector(".performance__info__content").textContent.replaceAll(/(\\n|\\t)/g, '').trim()
  `),
          info: "",
        };

        events.push(event);
        console.log(events);
        await driver.get(currentUrl);
      });

      fs.writeFile(
        "./LiveMusicProd.json",
        JSON.stringify(events),
        function (err) {
          if (err) throw err;
        },
      );
    },
  );

  // Then steps

  Then("I log {string}", function (message) {
    console.log(message);
  });

  Then("I should be on {string}", async function (url) {
    const currentUrl = await driver.getCurrentUrl();
    expect(currentUrl).to.equal(url);
  });

  Then("I should be on homepage", async function () {
    const currentUrl = await driver.getCurrentUrl();
    expect(currentUrl).to.equal("/");
  });

  Then("I should be on the {string} page", async function (page) {
    const currentUrl = await driver.getCurrentUrl();
    expect(currentUrl).to.contain(page);
  });

  Then("I should see {string}", async function (text: string) {
    const elem = await driver.findElement(By.css("body"));
    const test = await driver.wait(
      until.elementTextContains(elem, text),
      10000,
    );
    const pageText = await test.getText();
    expect(pageText).to.contain(text);
  });

  Then("I should see {string} Element", async function (elementName: string) {
    const elementPresent = await driver
      .findElement(By.css(elementName))
      .isDisplayed();
    expect(elementPresent).to.be.true;
  });

  Then(
    "I should see {string} and {string} it's value",
    async function (elementName: string, elementValue: string) {
      const elementPresent = await driver
        .findElement(By.css(`${elementName}="${elementValue}"`))
        .isDisplayed();
      expect(elementPresent).to.be.true;
    },
  );

  Then(
    "the {string} should have {string} attribute with value {string}",
    async function (
      elementName: string,
      attributeName: string,
      attributeValue: string,
    ) {
      const actualAttributeValue = await driver
        .findElement(
          By.css(`${elementName}[${attributeName}="${attributeValue}"]`),
        )
        .getAttribute(attributeName);
      expect(actualAttributeValue).to.equal(attributeValue);
    },
  );

  Then(
    "the new page should display with URL {string}",
    async function (url: string) {
      const currentUrl = await driver.getCurrentUrl();
      expect(currentUrl).to.equal(url);
    },
  );

  Then("I should see the URL {string}", async function (url: string) {
    const currentUrl = await driver.getCurrentUrl();
    expect(currentUrl).to.equal(url);
  });
  const configuration: IRunOptions = {
    sources: {
      defaultDialect: "en",
      paths: ["../../LiveMusicProduction.feature"],
      names: [],
      tagExpression: "",
      order: "",
    },
    support: {
      requireModules: [],
      requirePaths: ["../support/hook.js"],
      importPaths: [],
    },
    runtime: {
      parallel: 1,
      dryRun: false,
      failFast: false,
      filterStacktraces: true,
      retry: 0,
      retryTagFilter: "",
      strict: true,
      worldParameters: "",
    },
    formats: {
      stdout: "",
      files: {},
      publish: false,
      options: {},
    },
  };

  try {
    const result: IRunResult = await runCucumber(configuration);
    console.log("Test run completed successfully:", result);
  } catch (error) {
    console.error("Test run encountered an error:", error);
  }
}
