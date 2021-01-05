const fs = require("fs");
const chalk = require("chalk");

const PROGRAM_VERSION = "v2.0.0";
const PROGRAM_AUTHOR =
  "George Triantafylidis (George.Triantafylidis@gmail.com)";

const CONFIG_PATH = "config";
const TEMPLATES_PATH = `${CONFIG_PATH}/templates`;
const GENERATORS_PATH = `${CONFIG_PATH}/data-generators`;

//define the different section that can be found in config file
const GENERIC_SECTION = "generic";
const DATA_SECTION = "data";
const TEMPLATE_SECTION = "template";
const BEGIN_SECTION = "begin";
const END_SECTION = "end";
const BETWEEN_SECTION = "between";

const SECTIONS = [
  GENERIC_SECTION,
  DATA_SECTION,
  TEMPLATE_SECTION,
  BEGIN_SECTION,
  END_SECTION,
  BETWEEN_SECTION,
];

const configuration = {
  [GENERIC_SECTION]: [],
  [TEMPLATE_SECTION]: [],
  [DATA_SECTION]: [],
  [BEGIN_SECTION]: [],
  [END_SECTION]: [],
  [BETWEEN_SECTION]: [],
};

const getSection = (line) => {
  let found = [], // an array to collect the strings that are found
    rxp = /\[([^}]+)\]/g,
    str = line,
    curMatch;

  while ((curMatch = rxp.exec(str))) {
    if (SECTIONS.indexOf(curMatch[1]) > -1) found.push(curMatch[1]);
  }
  return found;
};

/****************************
 *
 * Public functions
 *
 ****************************/

function readCommandLine() {
  return require("yargs")(process.argv.slice(2))
    .usage("$0 <cmd> [args]")
    .option("template", {
      alias: "t",
      describe: "Specify the template. Must reside in the templates folder.",
    })
    .option("config", {
      alias: "conf",
      describe:
        "Specify a configuration file that contains template and generator." +
        "If you specify a config file do not specify generator and template seperately. They will be ignored",
    })
    .option("generator", {
      alias: "g",
      describe:
        "Specify a generator of data. Must reside in data-generators folder.",
    })
    .option("startid", {
      alias: "s",
      describe:
        "Specify the start id when templates contains the {{id}} substitution.",
    })
    .option("repeat", {
      alias: "r",
      describe: "Specify how many times the template will be called.",
    })
    .option("dumpdata", {
      alias: "dd",
      describe:
        "Displays the data generator values. It does not run the template.",
    })
    .version(`${PROGRAM_VERSION}, Created by ${PROGRAM_AUTHOR}`).argv;
}

const printArgumentValues = (argv) => {
  const log = console.log;
  const info = chalk.yellow;

  log(info("====== Command Line Options =========="));
  log(info("Config from command line:"), argv.config);
  log(info("Template from command line:"), argv.template);
  log(info("Executions from command line:"), argv.repeat);
  log(info("Data generator from command line:"), argv.generator);
  log(info("Start ID from command line:", argv.startid));
  log(info("=============== Data =================\n"));
};

function readConfigFile(filename) {
  let currentSection = GENERIC_SECTION;
  let conf = { ...configuration };

  try {
    var lines = fs
      .readFileSync(`${CONFIG_PATH}/${filename}`, "utf-8")
      .split(/\r?\n/);
  } catch (e) {
    console.log(chalk.red(e.message));
    process.exit(1);
  }
  lines.forEach((line) => {
    let section = "";
    if (line.length > 0) {
      section = getSection(line);
      if (section.length > 0) {
        currentSection = section[0];
      } else {
        //It a normal line so push it to the current sectio
        if (currentSection) conf[currentSection].push(line);
      }
    }
  });

  return conf;
}

function readDomainsFromFile(fileName) {
  const _fileName = fileName || "domains.txt";
  try {
    let content = fs.readFileSync(GENERATORS_PATH + "/" + _fileName, "utf8");
    return JSON.parse(content);
  } catch (e) {
    console.error(
      chalk.red(
        `There was an uncaught error during reading domains file. Make sure that domains.txt is in ${GENERATORS_PATH} directory`
      ),
      e.message
    );
  }
}

const readTemplateFromFile = (fileName) => {
  try {
    let content = fs.readFileSync(TEMPLATES_PATH + "/" + fileName, "utf8");
    return content;
  } catch (e) {
    console.error(
      chalk.red(
        "There was an uncaught error, check the --template command line option"
      ),
      e.message
    );
    process.exit(1); //mandatory (as per the Node.js docs)
  }
};

const readGeneratorFromFile = (fileName) => {
  try {
    let content = fs.readFileSync(GENERATORS_PATH + "/" + fileName, "utf8");
    return content;
  } catch (e) {
    console.error(
      chalk.red(
        "There was an uncaught error, check the --generator command line option"
      ),
      e.message
    );
    process.exit(1); //mandatory (as per the Node.js docs)
  }
};

exports.config = {
  configuration,
  readCommandLine,
  printArgumentValues,
  readConfigFile,
  readDomainsFromFile,
  readGeneratorFromFile,
  readTemplateFromFile,
};
