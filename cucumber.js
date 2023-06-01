// cucumber.js
let common = [
  'src/server/features/**/*.feature',                // Specify our feature files
  //'--require-module ts-node/register',    // Load TypeScript module
  '--require src/server/features/**/*.js',   // Load step definitions
  '--format progress-bar',                // Load custom formatter
  '--format @cucumber/pretty-formatter' // Load custom formatter
].join(' ');

module.exports = {
  default: common
};
