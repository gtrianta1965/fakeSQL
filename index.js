const os = require("os");
const chalk = require("chalk");
const Mustache = require("mustache");

const { utils } = require("./utils");
const { config } = require("./lib/config");

let dataGenerator, template;
let configObject = config.configuration;

process.on("uncaughtException1", (error) => {
  console.log(chalk.red(error));
  process.exit(1);
});

let argv = config.readCommandLine();

config.printArgumentValues(argv);

//Define number of repetitions
const numberOfExecutions = argv.repeat || 2;

//Define start ID
const startId = argv.startid || 1;

//Define the function that return all the data for each repition

if (argv.config) {
  configObject = config.readConfigFile(argv.config);

  dataGenerator = configObject.data.join();
  template = configObject.template.join(os.EOL);

  if (argv.dd) {
    console.log("config object", configObject);
  }
  //process.exit(1);
} else {
  // No config specified. Read template and generator seperately

  //Define the generator
  dataGenerator = argv.generator || "generic.generator";
  dataGenerator = config.readGeneratorFromFile(dataGenerator);

  //Define the template
  template = config.readTemplateFromFile(argv.template || "customers.tpl");
}

// Start procesing and print the results
let output;

//print the header
if (configObject.begin.length > 0) console.log(configObject.begin.join(os.EOL));

for (i = 0; i < numberOfExecutions; i++) {
  let generatedData = {};
  if (!dataGenerator) {
    generatedData = utils.getData(startId + i);
  } else {
    generatedData = utils.returnDataFromGenerator(dataGenerator, startId + i)();
  }
  //inject additional data
  generatedData.executionCurrent = i + 1;
  generatedData.executionLast = numberOfExecutions;

  //if we been asked to dump the data then do it
  if (argv.dd) {
    console.log("Generator data", generatedData);
    process.exit(0);
  }

  output = Mustache.render(template, generatedData);
  console.log(chalk.green(output));
  if (configObject.between.length > 0)
    console.log(configObject.between.join(os.EOL));
}
if (configObject.end.length > 0) console.log(configObject.end.join(os.EOL));
