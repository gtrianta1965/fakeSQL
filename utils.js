const moment = require("moment");
const faker = require("faker");
var fs = require("fs");

const TEMPLATES_PATH = "templates";
const GENERATORS_PATH = "data-generators";

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
};
