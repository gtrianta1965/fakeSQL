## fakeit by G30

### Create SQL statement that produce random date (based on faker library)

Uses three important libraries:

- faker (https://fakerjsdocs.netlify.app/)
- lodash (\_) (https://lodash.com/docs/#identity)
- moment (https://momentjs.com/docs/)

Other libraries:

- mustache (template parsing)
- chalk (color the output)
- yargs (parse command line arguments)

#### Created 02/01/2021

This module creates SQL statements for inserting fake data to table. It can be used also for other purposes e.g.

- Create XML / JSON file
- Create sample realistic documents
- Create repeated commands
- Create Excel files
- Produce random data sets for statical analysis
- ... And more

1. Create the template file in templates directory (e.g. EMployees.tpl)
   Simple edit index.js :

- Define object returned (edit function getData)
- Define number of statements (constant numberOfExecutions)
- Define template (load it with utils.readTemplateFromFile)

Create the script by running:

`npm start --silent > fileName

e.g. `npm start --silent > insert_customers.sql

If you want to pass command line arguments then execute via node:

node index.js --template products.tpl --repeat 12 --generator generic.generator --startid 1

or using combined configuration

node index.js --config samlle_customers.conf --repeat 12 --startid 1 --silent > output.txt

Inspect the data before run templates with --dd option.

## Create your own generators

You can create your own data generators. Take a look at generic.generator to get the idea of defining the field and values

### Packaging

For packaging I used pkg (https://github.com/vercel/pkg)
Installation (globally) : npm install -g pkg

From the project folder execute:
pkg index.js

The above command generates three files:

- index-linux
- index-macos
- index-win.exe

or pkg index.js --output fakeit

Creates one single file fakeit.exe

Create the following directories under the root folder of the executable:

- config
- config/generators
- config/templates

Get help by running :
fakeit --help

#### 04/01/2021 Added Mustache for template engine. faker.helpers.mustache is not used any more.

#### 05/01/2021 Added combined configuration with data and templates in the same file

Use the --config option to load a text file that combine data, template, text before, text after. Samples are included.
