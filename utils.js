const moment = require("moment");
const faker = require("faker");
const chalk = require("chalk");
const _ = require("lodash");

const { config } = require("./lib/config");
const CUSTOM = require("./lib");

custom = new CUSTOM(faker);

const domains = config.readDomainsFromFile();

const fake = faker.fake;
const unique = faker.unique;
const random = faker.random;
const helpers = faker.helpers;
const name = faker.name;
const address = faker.address;
const company = faker.company;
const finance = faker.finance;
const image = faker.image;
const lorem = faker.lorem;
const hacker = faker.hacker;
const interner = faker.internet;
const database = faker.database;
const phone = faker.phone;
const date = faker.date;
const commerce = faker.commerce;
const system = faker.system;
const git = faker.git;
const vehicle = faker.vehicle;
const music = faker.music;

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

const randomValueFromDomain = (domain, _probability) => {
  values = domains.domains.filter((d) => d.name === domain)[0].values || [];
  let propability = _probability || 0;
  return faker.random.number({ min: 0, max: 100, precision: 1 }) <= propability
    ? values[0]
    : faker.random.arrayElement(values);
};

function returnDataFromGenerator(generator) {
  let returnObject;
  try {
    returnObject = eval("() => { let self=this; return {" + generator + "}}");
  } catch (e) {
    console.log(chalk.red("Error during parsing of data : " + e.message));
    process.exit(1);
  }
  //console.log(returnObject());
  return returnObject;
}

returnDataFromGenerator = returnDataFromGenerator.bind(this);

exports.utils = {
  formatDate,
  formatDateTime,
  returnDataFromGenerator,
  randomValueFromDomain,
  getData,
};
