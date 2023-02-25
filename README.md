## Getting Started

Please first start the server at this repo https://github.com/renato76/movies-api-strapi

Then to run the frontend:

```bash
yarn

yarn dev

```

# **Aim / Goals** 🚀
The aim of this project was to practice using Next JS with TypeScript, and also to implement and practice using React Testing Library for unit / integration testing.
I have recently discovered React Query, and I really like the way it allows you to fetch, synchronize, update, and cache data, so I have used this for all API requests in this project.


# **Overview** ☀️

I set this project up using Next JS, TypeScript and React JS for the frontend, which consumes an API created with Strapi Headless CMS.

I used React Query for fetching all movies, and for creating a movie. For create a movie, also added invalidateQueries() into the onSuccess of the mutate function which refetch the latest data after a user successfully adds a new movie.

I used Formik to create the Add / Update a Movie form.

API Functionality includes: Fetch All Movies, Fetch One Movie, Add A Movie, Update A Movie.

I also added social login with GitHub and Google using Next Auth.

# **Next Steps** 🎯

- The plan is to have full CRUD functionality, so will be adding "Delete a movie" which will only be available to Authorized and Authenitcated users. I will add JWT token to the Headers in the fetch and modify the Strapi API to receive requests in such way.

- Refactor to use Next JS 13 Server / Client Components using the app folder

- Form fields validation.

- Web Accessibility for screen readers, checks on headings, lists, links, site navigation, images, form validation.

- Cypress E2E tests.

- Gitlab CI/CD Pipeline.

# **Screenshots** 🏆

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

