import {
  type ISupportCodeLibrary,
  loadConfiguration,
  loadSupport,
  runCucumber,
  type IRunOptions,
} from "@cucumber/cucumber/api";

type CucumberApi = {
  [key: string]: (section?: string) => Promise<string | boolean>;
};

export const cucumber: { api: CucumberApi } = {
  api: {
    LiveMusicProduction: async () => {
      return await runCrawl("@LiveMusicProduction", "./cucumber.js", false);
    },
    VilleDeLausanne: async () => {
      return await runCrawl("@VilleDeLausanne", "./cucumber.js", false);
    },
    OpusOne: async () => {
      return await runCrawl("@OpusOne", "./cucumber.js", false);
    },
    Payot: async (section) => {
      return await runCrawl(`${section ?? ""}`, "./cucumber.js", false);
    },
    SmsGagnant: async () => {
      return await runCrawl(`@SmsGagnant`, "./cucumber.js", false);
    },
  },
};

let supportGenerated: ISupportCodeLibrary | null;
let confCucumber: IRunOptions;
type ScriptByWebsite = {
  [key: string]: {
    scriptNbUrlEvents?: (selectors: string) => string;
    scriptListUrlEvents?: (selectors: string) => string;
    scriptGetTitle?: string;
    scriptGetSubTitle?: string;
    scriptGetDate?: string;
    scriptGetPlace?: string;
    scriptGetImage?: string;
    scriptGetDescription?: string;
    scriptGetInfo?: string;
  };
};
type World = {
  world: {
    resultJson: string;
    scriptByWebsite: () => ScriptByWebsite;
  };
};
export async function runCrawl(
  tag: string,
  configFile: string,
  failFast: boolean,
): Promise<string | boolean> {
  const environment = { cwd: process.cwd() };
  const { runConfiguration } = await loadConfiguration(
    { file: configFile, provided: { failFast } },
    environment,
  );
  const { sources } = runConfiguration;

  sources.tagExpression = tag;

  if (!supportGenerated) {
    const support = await loadSupport(runConfiguration, environment);
    confCucumber = { ...runConfiguration, support, sources };
  } else {
    confCucumber = { ...runConfiguration, support: supportGenerated, sources };
  }

  const { success, support } = await runCucumber(confCucumber, environment);
  supportGenerated = support;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  const W = new support.World() as World;

  return success ? W.world.resultJson : success;
}
