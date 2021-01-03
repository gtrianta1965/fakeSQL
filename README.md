## fakeSQL by G30

### Create SQL statement that produce random date (based on faker library)

#### Created 02/01/2021

This module creates SQL statements for inserting fake data to table.

1. Create the template file in templates directory (e.g. EMployees.tpl)
   Simple edit index.js :

- Define object returned (edit function getData)
- Define number of statements (constant numberOfExecutions)
- Define template (load it with utils.readTemplateFromFile)

Create the script by running:

`npm start --silent > fileName

e.g. `npm start --silent > insert_customers.sql

If you want to pass command line arguments then execute via node:

`node index.js --template products.tpl --repeat 12 --generator generic.generator

## Create your own generators

You can create your own data generators. Take a look at generic.generator to get the idea of defining the field and values
