const { utils } = require("./utils");
const faker = require("faker");

let argv = utils.readCommandLine();

utils.printArgumentValues(argv);

//Define number of repetitions
const numberOfExecutions = argv.repeat || 2;

//Define start ID
const startId = argv.startid || 1;

//Define the function that return all the data for each repition

//Define the template
let dataGenerator;

if (argv.generator) {
  dataGenerator = utils.readGeneratorFromFile(argv.generator);
  //console.log(
  //  "Object dataGenerator=",
  //  utils.returnDataFromGenerator(dataGenerator, 4)
  //);
} else {
  dataGenerator = utils.readGeneratorFromFile("generic.generator");
}

const template = utils.readTemplateFromFile(argv.template || "customers.tpl");

// Start procesing and print the results
let output;
for (i = 0; i < numberOfExecutions; i++) {
  if (!dataGenerator) {
    output = faker.helpers.mustache(template, utils.getData(startId + i));
    console.log(output);
  } else {
    output = faker.helpers.mustache(
      template,
      utils.returnDataFromGenerator(dataGenerator, startId + i)()
    );
    console.log(output);
  }
}
