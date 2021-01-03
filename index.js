const faker = require("faker");

//Define number of repetitions
const numberOfExecutions = 2;

//Define the function that return all the data for each repition

function getData(id) {
  return {
    id: id,
    firstName: faker.name.firstName().replace("a", "@"),
    lastName: faker.name.lastName,
    company: faker.company.companyName,
  };
}

//Define the template

const template = `insert into names(ID,FIRST_NAME,LAST_NAME,COMPANY)
 values ({{id}}, '{{firstName}}','{{lastName}}','{{company}}');
 `;

// Start procesing and print the results

for (i = 1; i <= numberOfExecutions; i++) {
  console.log(faker.helpers.mustache(template, getData(i)));
}
