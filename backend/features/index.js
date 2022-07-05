const fs = require("fs/promises");
const path = require("path");
const basename = path.basename(__filename);
const currentDir = __dirname;

const { readdir } = fs;

async function enableFeatures(expressApp) {
  const files = await readdir(currentDir);
  const featureDirs = files.filter((file) => {
    return file.indexOf(".") !== 0 && file !== basename;
  });
  //   console.log(featureDirs);
  featureDirs.map(async (featureDir) => {
    // add route to app
    const dir = path.join(currentDir, featureDir);
    const files = await readdir(dir);
    const routeFile = files.filter((file) => file === "routes.js")[0];

    if (routeFile != undefined) {
      require(path.join(dir, routeFile))(expressApp);
    }
  });
}

module.exports = {
  enableFeatures,
};
