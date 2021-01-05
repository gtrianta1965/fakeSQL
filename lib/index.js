/**
 *
 * @namespace custom
 */
function Custom(faker) {
  var self = this;

  self.faker = faker;
  self.data = require("./local");

  self.doit = function () {
    console.log("Do it man");
    return "Do it!!!";
  };

  self.fortune500 = function () {
    f500 = faker.random.arrayElement(self.data.fortune500);
    return f500;
  };
}

module["exports"] = Custom;
