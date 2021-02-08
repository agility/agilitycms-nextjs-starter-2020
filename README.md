# Next.js + Agility CMS
This is sample Next.js starter site that uses Agility CMS and aims to be a foundation for building fully static sites using Next.js and Agility CMS.

> NextJS Preview is now supported on Vercel!

[Live Website Demo](https://agilitycms-nextjs-starter-2020.vercel.app)

[New to Agility CMS? Signup for a free account](https://agilitycms.com/free)


## About This Website
- Connected to a sample Agility CMS instance to get content and pages
- Uses the `getStaticProps` function from Next.js to allow for full static site generation
- Supports full page management
- Supports preview mode
- Uses `revalidate` tag with Vercel to enable incremental static builds
- Provides a functional structure that dynamically routes each page based on the request, loads a page template dynamically, and also dynamically loads and renders appropriate Agility CMS modules (as React components)

### Built on Treact Components

This website uses components licensed from the [Treact](https://treact.owaiskhan.me) library. There are over 50 easily customizable modern React UI Templates and Components built using TailwindCSS which are also lightweight and simple to setup.

## Get Started
Sign up for the [Agility CMS NextJS Starter](https://account.agilitycms.com/sign-up?product=agility-free) instance.

1. Clone this repository
2. Run `npm install` or `yarn install`
3. Run `npm run dev` or `yarn dev`
4. Rename the .env.local.example file to `.env.local`
5. Retrieve your `GUID`, `API Keys (Preview/Fetch)` and `Security Key` from Agility CMS and place them in your `.env.local` file

[How to Retreive your `GUID` and `API Keys`](https://help.agilitycms.com/hc/en-us/articles/360031919212-Retrieving-your-API-Key-s-Guid-and-API-URL-)

- `AGILITY_GUID` should be the **Instance GUID** field
- `AGILITY_API_FETCH_KEY` should be the **Live API Key** field
- `AGILITY_API_PREVIEW_KEY` should be the **Preview API Key** field - this is used when the site is in [Preview Mode](https://nextjs.org/docs/advanced-features/preview-mode) and allows your site to pull the latest content, regardless of whether it is published or not.
- `AGILITY_SECURITY_KEY` should be the **Security Key** field that can be found in [**Settings** > **Global Security**](https://help.agilitycms.com/hc/en-us/articles/360029220591-How-to-Retrieve-an-Instance-s-Security-Key) - this is used to communicate between the CMS and your site to validate [Preview Mode](https://nextjs.org/docs/advanced-features/preview-mode)

## Running Locally (Development Mode)
When running your site in development mode, you will see the latest content in real-time from the CMS.
### yarn
1. `yarn install`
2. `yarn dev`

To update content locally without restarting your dev server, run `yarn cms-pull`

### npm
1. `npm run install`
2. `npm run dev`

To update content locally without restarting your dev server, run `npm run cms-pull`


## Running Locally (Production Mode)
When running your site in production mode, you will see published content (only) in real-time from the CMS.

### yarn
1. `yarn build`
2. `yarn start`

### npm
1. `npm run build`
2. `npm run start`

## Deploy
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/import/git?c=1&amp;s=https://github.com/agility/agilitycms-nextjs-starter-2020&amp;env=AGILITY_GUID,AGILITY_API_FETCH_KEY,AGILITY_API_PREVIEW_KEY,AGILITY_SECURITY_KEY&amp;envDescription=API%20Keys%20required%20by%20Agility%20CMS&amp;)

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
Since this is a static app, how can editors preview content in realtime as they are making edits in Agility CMS? Vercel supports this out to the box! Just [point your preview url in Agility CMS](https://help.agilitycms.com/hc/en-us/articles/360003855612-Adding-a-Domain-Configuration-for-a-Web-Server) to the address of your site deployed in Vercel, and it will enable preview mode when you click "Preview" in Agility CMS.

## Feedback and Questions

If you have feedback or questions about this starter, please use the [Github Issues](https://github.com/agility/agilitycms-nextjs-starter-2020/issues)  on this repo, or create a post on the [Agility Developer Community](https://help.agilitycms.com/hc/en-us/community/topics).



