const moment = require("moment");
const faker = require("faker");
var fs = require("fs");

const TEMPLATES_PATH = "templates";
const GENERATORS_PATH = "data-generators";

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
    }).argv;
}

const printArgumentValues = (argv) => {
  console.log("====== Command Line Options ==========");
  console.log("Template from command line:", argv.template);
  console.log("Executions from command line:", argv.repeat);
  console.log("Data generator from command line:", argv.generator);
  console.log("Start ID from command line:", argv.startid);
  console.log("=============== Data =================");
};

function getData(id) {
  return {
    id: id,
    firstName: faker.name.firstName().replace("'", "''"),
    lastName: faker.name.lastName().replace("'", "''"),
    company: faker.company.companyName().replace("'", "''"),
    lastTransactionDate: faker.date.past(3, new Date()),
    birthDate: utils.formatDateTime(faker.date.past(50, new Date())),
    identificationType: faker.random.arrayElement([
      "passport",
      "id",
      "drive license",
      "other",
    ]),
    identification: faker.helpers.replaceSymbols("???-######-?"),
    isActive: utils.active,
    isActiveProb: utils.yesNoWithProbability,
    yesNo: utils.yesNo,
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

const yesNo = () => faker.random.arrayElement(["YES", "NO"]);
const active = () => faker.random.arrayElement(["Active", "Inactive"]);

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
      "There was an uncaught error, check the --template command line option",
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
      "There was an uncaught error, check the --generator command line option",
      e.message
    );
    process.exit(1); //mandatory (as per the Node.js docs)
  }
};

const returnDataFromGenerator = (generator, i) => {
  let id = i;

  let returnObject = eval(
    "() => { let self=this; return {" + generator + ", id : id}}"
  );
  //console.log(returnObject());
  return returnObject;
};

exports.utils = {
  formatDate,
  formatDateTime,
  yesNo: yesNo,
  active,
  yesNoWithProbability,
  readTemplateFromFile,
  readGeneratorFromFile,
  returnDataFromGenerator,
  readCommandLine,
  printArgumentValues,
  getData,
};
