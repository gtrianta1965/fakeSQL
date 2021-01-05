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
  };

  self.fortune500 = function () {
    console.log("Random Element", self.data.fortune500[2]);
    return "You called fortune500";
  };
}

module["exports"] = new Custom();
