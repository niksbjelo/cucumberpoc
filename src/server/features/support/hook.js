const { After, Before } = require("@cucumber/cucumber");

Before(function (scenario) {
  const tags = scenario.pickle.tags.map((tag) => tag.name);
  this.tag = tags[0].replace("@", "");
});

After({ timeout: 777000 * 1000 }, async function (scenario) {
  (await this.browser?.close()) ?? (await this.driver?.quit());
});
