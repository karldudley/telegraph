# Telegraph - 24 Hour Challenge - by Michael & Karl

## Project Overview

For this project we wanted to produce an anonymous message board where the posts persisted even if the server restarted. The technology we chose to solve this was MongoDB Atlas, a cloud-based, non-relational database. The server app was built using node.js and a range of dependencies such as Express (for routing), Mongoose (to connect to MongoDB) and EJS (for server side rendering). It was deployed on [Heroku](https://telegraph-futureproof.herokuapp.com/). We planned the project using Trello.

## Installation and usage

Users should be able to input their title, name and story. Upon entering data, users should be able to submit their post and view all posts on a separate page.

### To run the app you have a few options:
1. Go to the deployed [site](https://telegraph-futureproof.herokuapp.com/) on Heroku (*Easiest Option*)
2. Run it in Docker - `docker compose up`
3. Run it locally - `npm install && npm run start`

## Changelog

- Install middleware
- Create ejs and css files 
- Create app.js.
- Connect mongodb via mongoose
- Set view engine to ejs
- Set up middlewares
- Add routes/ paths for index, about, create and 404 
- Create docker-conpose.yaml file
- Deploy to Heroku
- Update styling

## Bugs

- Incorrect ejs syntax. Fixed by amending syntax
- Incorrect route names. Fixed by changing url
- Wouldn't initally run from docker file. Fixed after refresh
