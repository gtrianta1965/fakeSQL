const faker = require("faker");
console.log("Touch point");
var randomName = faker.name.findName();

let data = {
  name: "George",
  age: 55,
  city: faker.address.city,
};

function getData() {
  let str = "George";
  return {
    firstName: faker.name.firstName().replace("a", "@"),
    lastName: faker.name.lastName,
    company: str.replace("G", "3"),
  };
}

let template = "Hi my name is {{name}}. I live in {{city}}. {{faker.city}}";

let result = faker.helpers.mustache(template, data);

console.log("Template=", result);
console.log(randomName);
let id =
  faker.helpers.replaceSymbols("??") + faker.helpers.replaceSymbols("#######");

console.log("Αριθμός Ταυτότητας:", id);

result = faker.fake("a random female name is {{name.firstName(0)}}");

template = "Hello my name is {{firstName}} {{lastName}}. I work in {{company}}";
for (i = 0; i < 10; i++) {
  console.log(faker.helpers.mustache(template, getData()));
}
console.log("Faker.fake=", result);

console.log("type=", typeof faker.name.firstName());

a = "//This is a comment";
if (a.match(/^\/\//)) console.log("Begins OK");
