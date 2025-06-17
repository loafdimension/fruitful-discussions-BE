# Welcome to Fruitful Discussions!

# Table of Contents

- [About](#about)
- [Testing and Test Coverage](#testing-and-test-coverage)
- [How to Install and Run](#how-to-install-and-run)
- [Documentation](#documentation)
- [Feedback and Contributions](#feedback-and-contributions)
- [Credits](#credits)
- [Contact](#contact)
- [Links](#links)

# About

**What is Fruitful Discussions?**

- Fruitful Discussions is a project I completed during the Northcoders course. Using databases seeded earlier in the course, I built an API for the purpose of accessing application data programatically. The intention here is to mimic the building of a real world backend service (such as Reddit) which should provide this information to the Front End architecture.

**How do I get access to the hosted version?**

- Here is a link! https://nc-news-project-t1h4.onrender.com/

# Testing and Test Coverage

**Where can I find the tests and how do I run them?**

- The tests are located in the **tests** folder and were separated in to testing the utility functions, the seeding, and the app which handled any requests to the API.
- The principle of Test Driven Development (TDD) was followed throughout and the Jest framework was used, along with the Supertest library.
- To run all of the tests, you can run the command "npm run test", or "npm t" for short, followed by the file you wish to see. For example, "npm t app", "npm t seed", "npm t utils". Please see the scripts in the package JSON to see more options.
- To filter by test within each file, add .only or .skip to whichever tests you wish to filter.

| File  | Link | Tests |
| :---: | :--: | :---: |
|  App  |      |  39   |
| Seed  |      |  40   |
| Utils |      |   7   |
| Total |      |  86   |

# How to Install and Run

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

**As a user**

- [See information on available endpoints](./endpoints.json)

# Feedback and Discussions

**As a contributor**

- Be kind, and please do offer feedback and suggestions for improvement.
- [Discussions](https://github.com/loafdimension/fruitful-discussions-BE/discussions)
- Fruitful Discussions is a work in progress and I will be refactoring based on any provided feedback, as well as adding new features which can be seen via the issues page.
- [Open an issue / View current issues](https://github.com/loafdimension/seeding-nc-news/issues)

# Credits

**Who worked on this project and how was it created?**

- I created and worked on this project alone, but using Northcoders resources and with support from all of their wonderful staff.

# Contact

- If you have any questions or feedback, and would like to contact me, please feel free to reach out via LinkedIn or GitHub Discussions.
- [Linkedin](https://www.linkedin.com/in/morgan-hewitt-8a68041ab/)
- [Discussions](https://github.com/loafdimension/fruitful-discussions-BE/discussions)
