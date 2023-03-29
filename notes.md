# **Next JS notes**

In Next Js 12,
Using getStaticProps for the [id] page means I am using SSR to fetch that data, and then using getStaticPaths to generate dynamic URLs for each page.

Now this works fine in development however in production I found another issue.

When creating a new movie, and then trying to visit that url, I got 404 error.

The reason for this is Next Js would need to rebuild the page after a new entry is made to the data, so the solution for this was to:

1. Add fallback: true, with a div saying for example Loading... if fallback is true.
2. revalidate after say 10 seconds, from Next Js docs means that Next.js will attempt to re-generate the page:
   - When a request comes in
   - At most once every 10 seconds

This worked fine in production.
