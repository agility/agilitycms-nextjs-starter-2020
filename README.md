# Next.js + Agility CMS
This is sample Next.js starter site that uses Agility CMS and aims to be a foundation for building fully static sites using Next.js and Agility CMS.

> NextJS Preview is now supported on Vercel!

[Live Website Demo](https://agilitycms-nextjs-starter-2020.vercel.app)

[New to Agility CMS? Signup for a free account](https://agilitycms.com/free)


## About This Website
- connected to a sample Agility CMS instance to get content and pages
- uses the `getStaticProps` function from Next.js to allow for full static site generation
- supports full page management
- provides a functional structure that dynamically routes each page based on the request, loads a page template dynamically, and also dynamically loads and renders appropriate Agility CMS modules (as React components)

### Built on Treact Components

This website uses components licensed from the [Treact](https://treact.owaiskhan.me) library. There are over 50 easily customizable modern React UI Templates and Components built using TailwindCSS which are also lightweight and simple to setup.

## Get Started
Sign up for the [Agility CMS NextJS Starter](https://account.agilitycms.com/sign-up?product=agility-free) instance.

1. Clone this repository
2. Run `npm install` or `yarn install`
3. Run `npm run dev` or `yarn dev`
4. Rename the .env.example file to `.env.local` and place your API Keys from your Agility account into it.

## Deploy
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.co/import/project?template=https://github.com/agility/agilitycms-nextjs-starter-2020)

☝️ Deploy this starter repo in just minutes with [Vercel](https://vercel.com/). It will prompt you to enter your `AGILITY_GUID`, , `AGILITY_API_FETCH_KEY`, `AGILITY_API_PREVIEW_KEY`, and `AGILITY_SECURITY_KEY`.

# Notes
## How to Properly Link to an interior Page
Note the use of the <Link> component with the [...slug] page.

``` javascript
import Link from 'next/link';

//where '[...slug]' is the catch-all dynamic page we have (pages/[...slug].js)
// and '/posts' is the actual real page path for the page
<Link href="[...slug]" as="/posts"><a>{item.fields.title}</a></Link>
```

## How to Preview Content?
Since this is a static app, how can editors preview content in realtime as they are making edits in Agility CMS? Vercel supports this out to the box! Just [point your preview url in Agility CMS](https://help.agilitycms.com/hc/en-us/articles/360003855612-Adding-a-Domain-Configuration-for-a-Web-Server) to the address of your site deployed in Vercel, and it should work out in preview mode when you click "Preview" in Agility CMS.

## Feedback and Questions

If you have feedback or questions about this starter, please use the [Github Issues](https://github.com/agility/agilitycms-nextjs-starter-2020/issues)  on this repo, or create a post on the [Agility Developer Community](https://help.agilitycms.com/hc/en-us/community/topics).



