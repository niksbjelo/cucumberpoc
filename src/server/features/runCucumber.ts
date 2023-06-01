import {
  type ISupportCodeLibrary,
  loadConfiguration,
  loadSupport,
  runCucumber,
  type IRunOptions,
} from "@cucumber/cucumber/api";

export const cucumber = {
  api: {
    LiveMusicProduction: async () => {
      return await runCrawl("@LiveMusicProduction", "./cucumber.js", false);
    },
    LiveMusicProduction1: async () => {
      return await runCrawl("@test", "./cucumber.js", false);
    },
  },
};
let supportBuilt: ISupportCodeLibrary;
let confCucumber: IRunOptions;

export async function runCrawl(
  tag: string,
  configFile: string,
  failFast: boolean,
) {
  const environment = { cwd: process.cwd() };
  const { runConfiguration } = await loadConfiguration(
    { file: configFile, provided: { failFast } },
    environment,
  );
  const { sources } = runConfiguration;

  sources.tagExpression = tag;

  if (!supportBuilt) {
    const support = await loadSupport(runConfiguration, environment);
    confCucumber = { ...runConfiguration, support, sources };
  } else {
    confCucumber = { ...runConfiguration, support: supportBuilt, sources };
  }

  const { success, support } = await runCucumber(confCucumber, environment);

  supportBuilt = support;

  const { World } = support;

// Accéder à l'objet 'world' depuis le support code
 console.log(new World())
  return success;
}
