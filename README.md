# NC News Seeding

# Instructions for how to set up the .env files

**What files need to be created?**

- In the root of the directory create 2 .env files, one called ".env.test" and another called ".env.development".

**What values need to be added for a developer to connect to both databases locally?**

- In each of these files, write the environmental variable, "PGDATABASE" and set its value to the name of the database it should interact with.
- In this case, this means .env.test should be populated with "PGDATABASE=nc_news:test and .env.development should be populated with "PGDATABASE=nc_news"
