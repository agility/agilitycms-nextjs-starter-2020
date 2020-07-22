import PreviewBar from './PreviewBar'
import GlobalHeader from './GlobalHeader'
import { useRouter } from 'next/router'
import Head from 'next/head'
import dynamic from 'next/dynamic'

import AnimationRevealPage from "helpers/AnimationRevealPage"


export default function Layout(props) {
	const { page, sitemapNode } = props


	// If the page is not yet generated, this will be displayed
	// initially until getStaticProps() finishes running
	const router = useRouter()
	if (router.isFallback) {
		return <div>Loading...</div>
	}

	//BUG: when dynamic imports used in this case, the HTML does not output SSR
	const AgilityPageTemplate = dynamic(() => import ('./agility-pageTemplates/' + props.pageTemplateName));
	//const AgilityPageTemplate = require('./agility-pageTemplates/' + props.pageTemplateName + '.js').default;

	return (
		<>
			<Head>
				<title>{sitemapNode.title} - Agility CMS Sample Blog</title>
				<meta name="viewport" content="initial-scale=1.0, width=device-width" />
				<meta name="description" content={page.seo.metaDescription} />
				<link rel="stylesheet" href="https://rsms.me/inter/inter.css" />

			</Head>
			<AnimationRevealPage>
			<PreviewBar {...props} />
				<GlobalHeader {...props} />

				<AgilityPageTemplate {...props} />
			</AnimationRevealPage>
		</>
	)
}

