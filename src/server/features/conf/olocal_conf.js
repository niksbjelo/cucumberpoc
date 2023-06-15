const world = require("../support/world");
const { Builder } = require("selenium-webdriver");
const pw = require("playwright");
const chrome = require("selenium-webdriver/chrome");
const path = require("path");
const {
  setWorldConstructor,
  setDefaultTimeout,
} = require("@cucumber/cucumber");
require("dotenv").config();

class CustomWorld {
  isPlayWright = false;
  world = world;
  async waitForSeconds(seconds) {
    return new Promise((resolve) => setTimeout(resolve, seconds * 1000));
  }
  async goToURLAndWait(url) {
    await this.page?.goto(url, { waitUntil: "load" });
    await this.page?.waitForSelector("body");
    console.log("Page displayed successfully.");
  }

  async connection() {
    if (this.isPlayWright) {
      this.browser = await pw.chromium.connectOverCDP(
        process.env.BACKEND_BROWSERLESS,
      );
      this.context = await this.browser.newContext();
      this.page = await this.context.newPage();
    } else {
      // const chromeCapabilities = webdriver.Capabilities.chrome();
      // chromeCapabilities.set("browserless:token", "YOUR-API-TOKEN");
      // chromeCapabilities.set("goog:chromeOptions", {
      //   args: [
      //     "--disable-background-timer-throttling",
      //     "--disable-backgrounding-occluded-windows",
      //     "--disable-breakpad",
      //     "--disable-component-extensions-with-background-pages",
      //     "--disable-dev-shm-usage",
      //     "--disable-extensions",
      //     "--disable-features=TranslateUI,BlinkGenPropertyTrees",
      //     "--disable-ipc-flooding-protection",
      //     "--disable-renderer-backgrounding",
      //     "--enable-features=NetworkService,NetworkServiceInProcess",
      //     "--force-color-profile=srgb",
      //     "--hide-scrollbars",
      //     "--metrics-recording-only",
      //     "--mute-audio",
      //     "--headless",
      //     "--no-sandbox",
      //   ],
      // });

      // const driver = new webdriver.Builder()
      //   .forBrowser("chrome")
      //   .withCapabilities(chromeCapabilities)
      //   // Specify browserless for the server
      //   .usingServer("https://chrome.browserless.io/webdriver")
      //   .build();
      let driverChrome;

      switch (process.platform) {
        case "linux":
          driverChrome = "linux-chromedriver";
          break;
        case "darwin":
          driverChrome = "mac-chromedriver";
          break;
        case "win32":
          driverChrome = "win-chromedriver.exe";
          break;
        default:
          driverChrome = "win-chromedriver.exe";
          break;
      }
      const driverPath = path.join(
        __dirname,
        "src",
        "server",
        "features",
        "drivers",
        "chrome",
        "111",
        driverChrome,
      );
      const options = new chrome.Options();
      options.addArguments(
        // "--disable-background-timer-throttling",
        //     "--disable-backgrounding-occluded-windows",
        //     "--disable-breakpad",
        //     "--disable-component-extensions-with-background-pages",
        //     "--disable-dev-shm-usage",
        //     "--disable-extensions",
        //     "--disable-features=TranslateUI,BlinkGenPropertyTrees",
        //     "--disable-ipc-flooding-protection",
        //     "--disable-renderer-backgrounding",
        //     "--enable-features=NetworkService,NetworkServiceInProcess",
        //     "--force-color-profile=srgb",
        //     "--hide-scrollbars",
        //     "--metrics-recording-only",
        //     "--mute-audio",
        "--headless",
        "--no-sandbox",
      );
      const service = new chrome.ServiceBuilder(driverPath).build(); // set the path to your chromedriver executable here

      this.driver = new Builder()
        .forBrowser("chrome")
        .setChromeOptions(options)
        .withCapabilities({
          browserName: "chrome",
          "goog:chromeOptions": {
            w3c: false,
          },
        })
        .build();
      this.driver.manage().setTimeouts({
        implicit: 10000,
        pageLoad: 70000,
      });
    }
  }
}

setWorldConstructor(CustomWorld);
setDefaultTimeout(777000 * 1000);
module.exports = this.world;
