## Getting Started

Please first clone and start the server at this repo https://github.com/renato76/movies-api-strapi

Then to run the frontend:

```bash
yarn

yarn dev

```
# **Next Movies**

# **Aim / Goals** 🚀
The aim of this project was to practice using Next JS with TypeScript, and also to implement and practice using React Testing Library for unit / integration testing.
I have recently discovered React Query, and I really like the way it allows you to fetch, synchronize, update, and cache data, so I have used this for all API requests in this project.


# **Overview** ☀️

I set this project up using Next JS, TypeScript and React JS for the frontend, which consumes an API created with Strapi Headless CMS.

I used React Query for fetching data from the API. For add / update a movie, I added invalidateQueries() into the onSuccess of the mutate function which will refetch the latest data after a user successfully adds or updates new movie.

I used Formik to create the form for adding / updating a movie.

API Functionality includes: Fetch All Movies, Fetch One Movie, Add A Movie, Update A Movie.

For Authentication, I used Next Auth and implemented Social Login for Google and GitHub account users.

# **Next Steps** 🎯

- The plan is to have full CRUD functionality, so I will be adding "Delete a movie" functionality which will only be available to Authorized and Authenitcated users. I will add JWT token to the Headers in the fetch and modify the Strapi API to receive requests in such way.

- Refactor to use Next JS 13 Server / Client Components.

- Form fields validation.

- Web Accessibility for screen readers, checks on headings, lists, links, site navigation, images, form validation.

- Unit & Integration tests using React Testing Library

- Cypress E2E tests.

- Gitlab CI/CD Pipeline.

- Deployment on AWS.

# **Screenshots** ⭐️

## **Homepage:** 
<img src="./src/styles/images/homepage.png" width="1200">
<pre>
</pre>

## **Movie Details:** 
<img src="./src/styles/images/movie-details.png" width="1200">
<pre>
</pre>

## **Add a Movie Form:** 
<img src="./src/styles/images/create-movie.png" width="1200">
<pre>
</pre>

## **Naxt Auth:** 
<img src="./src/styles/images/next-auth.png" width="1200">
<pre>
</pre>

## **React Query:** 
<img src="./src/styles/images/react-query.png" width="1200">
<pre>
</pre>

## **Strapi API:** 
<img src="./src/styles/images/strapi-api.png" width="1200">
<pre>
</pre>

## **Testing API with Insomnia:**
<img src="./src/styles/images/insomnia-api-testing.png" width="1200">
<pre>
</pre>

