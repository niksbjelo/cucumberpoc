const { After, Before} = require("@cucumber/cucumber");

Before(function () {

});

After(async function (scenario) {
    await this.browser.close();
});
