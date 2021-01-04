const { utils } = require("./utils");
const chalk = require("chalk");
const Mustache = require("mustache");

process.on("uncaughtException1", (error) => {
  console.log(chalk.red(error));
  process.exit(1);
});

let argv = utils.readCommandLine();

utils.printArgumentValues(argv);

//Define number of repetitions
const numberOfExecutions = argv.repeat || 2;

//Define start ID
const startId = argv.startid || 1;

//Define the function that return all the data for each repition

//Define the generator
let dataGenerator = argv.generator || "generic.generator";
dataGenerator = utils.readGeneratorFromFile(dataGenerator);

//Define the template
const template = utils.readTemplateFromFile(argv.template || "customers.tpl");

if (argv.dd) {
  console.log(
    "Generator data (id is set to 1)",
    utils.returnDataFromGenerator(dataGenerator, 1)()
  );
  process.exit(0);
}

// Start procesing and print the results
let output;
for (i = 0; i < numberOfExecutions; i++) {
  if (!dataGenerator) {
    output = Mustache.render(template, utils.getData(startId + i));
  } else {
    output = Mustache.render(
      template,
      utils.returnDataFromGenerator(dataGenerator, startId + i)()
    );
    console.log(chalk.green(output));
  }
}
