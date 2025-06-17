# Welcome to Fruitful Discussions!

# Table of Contents (to have links taking people to each section)
- About
- Testing and Test Coverage
- How to Install and Run
- Documentation
- Feedback and Contributions
- Credits
- Contact
- Links

# About

**What is Fruitful Discussions?**

- INSERT ANSWER, a summary of what the project is
- Fruitful Discussions is a project I completed during the Northcoders course. Using databases seeded earlier in the course, I built an API for the purpose of accessing application data programatically. The intention here is to mimic the building of a real world backend service (such as Reddit) which should provide this information to the Front End architecture. 


**How do I get access to the hosted version?**

- Here is a link! https://nc-news-project-t1h4.onrender.com/

# Testing and Test Coverage

**include sections and tables for testing**

**Where can I find the tests and how do I run them?**
- The tests are located in the __tests__ folder and were separated in to testing the utility functions, the seeding, and the app which handled any requests to the API.
- The principle of Test Driven Development (TDD) was followed throughout and the Jest framework was used, along with the Supertest library. 
- To run all of the tests, you can run the command "npm run test", or "npm t" for short, followed by the file you wish to see. For example, "npm t app", "npm t seed", "npm t utils". Please see the scripts in the package JSON to see more options.
- To filter by test within each file, add .only or .skip to whichever tests you wish to filter.

| File    | Link | Tests |
| :------:| :---:| :----:|
| App     |      |  39   |
| Seed    |      |  40   |
| Utils   |      |  7    |
| Total   |      |  86   |


# How to Install and Run (maybe do this in code which can be copied)

**1 - Ensure that you have the required versions of Node.js and Postgres**

- These were my versions when I created the project so these are what I suggest:
- Node.js / v22.14.0
- Postgres / 17.4

**2 - Set up the .env files**

- In the root of the directory create 2 .env files, one called ".env.test" and another called ".env.development".
- In each of these files, write the environmental variable, "PGDATABASE" and set its value to the name of the database it should interact with.
- In this case, this means .env.test should be populated with "PGDATABASE=nc_news_test and .env.development should be populated with "PGDATABASE=nc_news"

**3 - Fork and clone the repository**

- Git clone:
- https://github.com/loafdimension/seeding-nc-news.git (https)


**4 - Install the required dependencies**

- Run "npm install" and this will install the required dependencies fron the packag.json.

**5 - Seed the local database**

- Run the following commands in this 0rder:
- "npm run setup-dbs"
- Either "npm run seed-dev" (for development data), or "npm run seed-prod" (for production data)

# Documentation

**as a user**
- link to the endpoints documentation and explanation 
- make a table summarising the available endpoints


# Feedback and Contributions

**as a contributor**
- make any changes you see fit, be kind and offer feedback and make a pull request
- i struggled in these areas / am interested in the following new features if anybody wishes to have a try, please do and make a pull request
- provide links to the issues page on github
- provide link to discussion page on github
- open issues, feature ideas, how to contribute, discussion

# Credits

**Who worked on this project and how was it created?**
- me, credit to NC and staff and all that jazz
- whoever helps me to design the logo

# Contact

**link to github loaf dimension message**

# Links

- https://www.contributor-covenant.org/

- https://docs.github.com/en/communities/setting-up-your-project-for-healthy-contributions/setting-guidelines-for-repository-contributors

- https://choosealicense.com/

- https://shields.io/ 