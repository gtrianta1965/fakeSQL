const { utils } = require("./utils");
const faker = require("faker");
const { fake } = require("faker");
let argv = require("yargs/yargs")(process.argv.slice(2)).argv;

console.log("====== Command Line Options ==========");
console.log("Template from command line:", argv.template);
console.log("Executions from command line:", argv.repeat);
console.log("Data generator from command line:", argv.generator);
console.log("Start ID from command line:", argv.startid);
console.log("=============== Data =================");

//Define number of repetitions
const numberOfExecutions = argv.repeat || 2;

//Define start ID
const startId = argv.startid || 1;

//Define the function that return all the data for each repition

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

//Define the template
let dataGenerator;

if (argv.generator) {
  dataGenerator = utils.readGeneratorFromFile("generic.generator");
  //console.log(
  //  "Object dataGenerator=",
  //  utils.returnDataFromGenerator(dataGenerator, 4)
  //);
}

const template = utils.readTemplateFromFile(argv.template || "customers.tpl");

// Start procesing and print the results
let output;
for (i = 0; i < numberOfExecutions; i++) {
  if (!dataGenerator) {
    output = faker.helpers.mustache(template, getData(startId + i));
    console.log(output);
  } else {
    output = faker.helpers.mustache(
      template,
      utils.returnDataFromGenerator(dataGenerator, startId + i)()
    );
    console.log(output);
  }
}
