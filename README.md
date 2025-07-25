# Welcome to Fruitful Discussions (Back-End)! 🍓🥝🍍

# Table of Contents 📚

- [About](#about)
- [Testing and Test Coverage](#testing-and-test-coverage)
- [How to Install and Run](#how-to-install-and-run)
- [Documentation](#documentation)
- [Tech Stack](#tech-stack)
- [Feedback and Contributions](#feedback-and-contributions)
- [Credits](#credits)
- [Contact](#contact)

---

<a id="about"></a>

# About 📝

**What is Fruitful Discussions?**

- Fruitful Discussions is a project I completed during the Northcoders bootcamp. Using databases seeded earlier in the course, I built an API for the purpose of accessing application data programatically. The intention here is to mimic the building of a real world backend service (such as Reddit) which should provide this information to the Front End architecture.

**How do I get access to the hosted version?**

- [The FruitFul-Discussions-BE](https://nc-news-project-t1h4.onrender.com/). However, this merely shows information in JSON format when a request is made to that endpoint. To see this data being used in the front end, take a look at [Fruitful-Discussions-FE (GitHub Repository)](https://github.com/loafdimension/fruitful-discussions-FE), and the [Hosted Fruitful-Discussions-FE]().

---

<a id="testing-and-test-coverage"></a>

# Testing and Test Coverage ✅

**Where can I find the tests and how do I run them?**

- The tests are located in the [tests](./__tests__/) folder and were separated in to testing the utility functions, the seeding, and the app which handled any requests to the API.
- The principle of Test Driven Development (TDD) was followed throughout and the Jest framework was used, along with the Supertest library.
- To run all of the tests, you can run the command `npm run test`, or `npm t` for short, followed by the file you wish to see. For example, `npm t app`, `npm t seed`, `npm t utils`. Please see the scripts in the package JSON to see more options.
- To filter by test within each file, add .only or .skip to whichever tests you wish to filter.

|                File                 | Tests |
| :---------------------------------: | :---: |
|   [App](./__tests__//app.test.js)   |  39   |
|  [Seed](./__tests__//seed.test.js)  |  40   |
| [Utils](./__tests__//utils.test.js) |   7   |
|                Total                |  86   |

---

<a id="how-to-install-and-run"></a>

# How to Install and Run 🚀

**1 - Ensure that you have the required versions of Node.js and Postgres**

Verify that you have compatible versions of Node.js and PostgreSQL installed. The project was developed with the following versions:

- Node.js: v22.14.0
- PostgreSQL: 17.4

**2 - Fork and clone the repository**

Git clone: https://github.com/loafdimension/seeding-nc-news.git

**3 - Install the required dependencies**

Once inside the project directory, install the required dependencies from the package.json using `npm install`.

**4 - Set up the Environment Variables**

In the root of the directory create 2 **.env files**:
`.env.test` and `.env.development`.

- In each of these files, write the environmental variable, "PGDATABASE" and set its value to the name of the database it should interact with.
- .env.test should be populated with "PGDATABASE=nc_news_test".
- .env.development should be populated with "PGDATABASE=nc_news".

**5 - Seed the local database**

Set up and seed your local PostgreSQL databases by running the following commands in this order:

- 1 - `npm run setup-dbs`
- 2 - Either `npm run seed-dev` (for development data), or `npm run seed-prod` (for production data)

---

<a id="documentation"></a>

# Documentation 🕮

**API Endpoints**
Below is a comprehensive list of all available API endpoints and their primary functionalities. For detailed request parameters, query options, and full example responses, please refer to the following link:

- [More detailed information on available endpoints](./endpoints.json)

| Method   | Endpoint                             | Description                                                           |
| :------- | :----------------------------------- | :-------------------------------------------------------------------- |
| `GET`    | `/api`                               | Serves a JSON representation of all available API endpoints.          |
| `GET`    | `/api/topics`                        | Serves an array of all topics.                                        |
| `GET`    | `/api/articles`                      | Serves an array of all articles, with optional sorting and filtering. |
| `GET`    | `/api/articles/:article_id`          | Serves an object of a single article, as requested by its ID.         |
| `GET`    | `/api/articles/:article_id/comments` | Serves an array of comments for a given article ID.                   |
| `POST`   | `/api/articles/:article_id/comments` | Posts a new comment to a specified article.                           |
| `PATCH`  | `/api/articles/:article_id`          | Updates the votes on an article by its article_id.                    |
| `DELETE` | `/api/comments/:comment_id`          | Deletes a comment by its comment_id.                                  |
| `GET`    | `/api/users`                         | Serves an array of all users.                                         |

---

<a id="tech-stack"></a>

# Tech Stack 💻

- **Runtime Environment**: Node.js
- **Web Framework**: Express.js
- **Database**: PostgreSQL
- **Database Driver**: PG (node-postgres)
- **Testing Framework**: Jest
- **HTTP Assertion Library**: Supertest
- **Database Seeding/Migration**: PSQL
- **Environment Variables**: Dotenv
---

<a id="feedback-and-contributions"></a>

# Feedback and Contributions 🤝

**As a contributor**

- Be kind, and please do offer feedback and suggestions for improvement.
- [Discussions](https://github.com/loafdimension/fruitful-discussions-BE/discussions)
- Fruitful Discussions is a work in progress and I will be refactoring based on any provided feedback, as well as adding new features which are listed on the issues page.
- [Open an issue / View current issues](https://github.com/loafdimension/seeding-nc-news/issues)

---

<a id="credits"></a>

# Credits 🎥

**Who worked on this project and how was it created?**

- I created and worked on this project alone, but using Northcoders resources and with support from all of their wonderful staff.
- This portfolio project was created as part of a Digital Skills Bootcamp in Software Engineering provided by [Northcoders](https://northcoders.com/)

---

<a id="contact"></a>

# Contact 📞

- If you have any questions or feedback, and would like to contact me, please feel free to reach out via LinkedIn or GitHub Discussions.
- [Linkedin](https://www.linkedin.com/in/morgan-hewitt-8a68041ab/)
- [Discussions](https://github.com/loafdimension/fruitful-discussions-BE/discussions)

---
