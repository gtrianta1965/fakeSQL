const moment = require("moment");
const faker = require("faker");
var fs = require("fs");
const chalk = require("chalk");

const TEMPLATES_PATH = "templates";
const GENERATORS_PATH = "data-generators";

const domains = readDomainsFromFile();

function readCommandLine() {
  return require("yargs")(process.argv.slice(2))
    .usage("$0 <cmd> [args]")
    .option("template", {
      alias: "t",
      describe: "Specify the template. Must reside in the templates folder.",
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
    }).argv;
}

const printArgumentValues = (argv) => {
  const log = console.log;
  const info = chalk.yellow;

  log(info("====== Command Line Options =========="));
  log(info("Template from command line:"), argv.template);
  log(info("Executions from command line:"), argv.repeat);
  log(info("Data generator from command line:"), argv.generator);
  log(info("Start ID from command line:", argv.startid));
  log(info("=============== Data =================\n"));
};

function getData(id) {
  return {
    id: id,
    firstName: faker.name.firstName().replace("'", "''"),
    lastName: faker.name.lastName().replace("'", "''"),
    company: faker.company.companyName().replace("'", "''"),
    lastTransactionDate: faker.date.past(3, new Date()),
    birthDate: formatDateTime(faker.date.past(50, new Date())),
    identificationType: faker.random.arrayElement([
      "passport",
      "id",
      "drive license",
      "other",
    ]),
    identification: faker.helpers.replaceSymbols("???-######-?"),
    isActive: active(),
    isActiveProb: yesNoWithProbability,
    yesNo: yesNo,
    productName: faker.commerce.productName,
    balance: faker.random.number({ min: 0, max: 0.99, precision: 0.01 }),
    price: faker.random.number({ min: 100, max: 2000, precision: 0.01 }),
    stock: faker.random.number({ min: 0, max: 300, precision: 1 }),
  };
}

function formatDate(d) {
  return moment(d).format("DD/MM/YYYY");
}

function formatDateTime(d) {
  return moment(d).format("DD/MM/YYYY HH:mm");
}

const yesNoWithProbability = () => {
  return faker.random.number({ min: 0, max: 0.99, precision: 0.01 }) > 0.9
    ? "Inactive"
    : "Active";
};

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

function readDomainsFromFile(fileName) {
  const _fileName = fileName || "domains.txt";
  try {
    let content = fs.readFileSync(GENERATORS_PATH + "/" + _fileName, "utf8");
    return JSON.parse(content);
  } catch (e) {
    console.error(
      chalk.red(
        `There was an uncaught error during reading domains file. Make sure that domains.txt is in ${GENERATOR_PATH} directory`
      ),
      e.message
    );
  }
}

const randomValueFromDomain = (domain) => {
  values = domains.domains.filter((d) => d.name === domain)[0].values || [];
  return faker.random.arrayElement(values);
};

function returnDataFromGenerator(generator, i) {
  let id = i;

  let returnObject = eval(
    "() => { let self=this; return {" + generator + ", id : id}}"
  );
  //console.log(returnObject());
  return returnObject;
}

returnDataFromGenerator = returnDataFromGenerator.bind(this);

exports.utils = {
  formatDate,
  formatDateTime,
  yesNoWithProbability,
  readTemplateFromFile,
  readGeneratorFromFile,
  returnDataFromGenerator,
  randomValueFromDomain,
  readDomainsFromFile,
  readCommandLine,
  printArgumentValues,
  getData,
};
