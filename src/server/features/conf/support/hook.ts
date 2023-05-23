import { After, Before, type ITestCaseHookParameter } from "@cucumber/cucumber";

Before(function () {
/* */
});

After(async function (scenario:ITestCaseHookParameter) {
  if (scenario?.result?.status === "FAILED") {
    await this.driver.quit();
  }
});
