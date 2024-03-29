## Getting Started

Please first clone and start the server at this repo https://github.com/renato76/movies-api-strapi

Then to run the frontend:

```bash
yarn

yarn dev

```

# **Next Movies**

https://next-movies-frontend.vercel.app/

</br>

# **Overview** ☀️

I set this project up using Next JS, TypeScript and React JS for the frontend, which consumes an API created with Strapi Headless CMS.

I used React Query for fetching data from the API.

I used Formik to create the form for adding / updating a movie.

Current API Functionality includes:

- read all
- read one
- create one
- update one

For Authentication, I used Next Auth and implemented Email Authentication, plus Social Login for Google and GitHub account users. The login feature obtains a JWT Token from Strapi and stores this in either Next Auth Session for Social login or in Cookies for Email login.

The backend or Strapi API has been deployed to Heroku with a Postgres Database. The frontend has been deployed to Vercel.

# **Tech Stack** 🚀

- React
- Next.js 13
- TypeScript
- Next Auth
- Tailwind CSS
- Formik
- React Testing Library
- Cypress
- GitLab
- Postgres
- Heroku
- Vercel

# **Next Steps** 🎯

- Reviews Section displaying user reviews.

- Add a Review feature available for authenticated users.

- Refactor to use Next JS 13 Server / Client Components.

- Form fields validation.

- Improvements to Web Accessibility, Performance, SEO, Best Practices etc. Use Lighthouse to generate a report.

- Unit & Integration tests using React Testing Library

- Cypress E2E tests.

- Gitlab CI/CD Pipeline.

# **Screenshots** ⭐️

**Homepage:**
<img src="./src/styles/images/homepage.png" width="1200">

</br>

**Movie Details:**
<img src="./src/styles/images/movie-details.png" width="1200">

</br>

**Add a Movie Form:**
<img src="./src/styles/images/create-movie.png" width="1200">

</br>

**Sign In Form:**
<img src="./src/styles/images/signin.png" width="1200">

</br>

**React Query:**
<img src="./src/styles/images/react-query.png" width="1200">

</br>

**Strapi API:**
<img src="./src/styles/images/strapi-api.png" width="1200">

</br>

**Testing API with Insomnia:**
<img src="./src/styles/images/insomnia-api-testing.png" width="1200">

</br>

**Lighthouse Score:**
<img src="./src/styles/images/lighthouse.png" width="1200">
