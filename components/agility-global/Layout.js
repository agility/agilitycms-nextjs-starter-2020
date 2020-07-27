import PreviewBar from './PreviewBar'
import GlobalHeader from './GlobalHeader'
import GlobalFooter from './GlobalFooter'
import { useRouter } from 'next/router'
import Head from 'next/head'
import dynamic from 'next/dynamic'
import tw from "twin.macro"

const MainElem = tw.main`p-8`;

import AnimationRevealPage from "helpers/AnimationRevealPage"

export default function Layout(props) {
	const { page, sitemapNode, dynamicPageItem } = props

	// If the page is not yet generated, this will be displayed
	// initially until getStaticProps() finishes running
	const router = useRouter()
	if (router.isFallback) {
		return <div>Loading...</div>
	}

	const AgilityPageTemplate = dynamic(() => import('components/agility-pageTemplates/' + props.pageTemplateName));

	if (dynamicPageItem?.seo?.metaDescription) {
		page.seo.metaDescription = dynamicPageItem.seo.metaDescription
	}

	return (
		<>
			<Head>
				<title>{sitemapNode?.title} - Agility CMS Sample Blog</title>
				<meta name="viewport" content="initial-scale=1.0, width=device-width" />
				<meta name="description" content={page.seo.metaDescription} />
				{ dynamicPageItem?.seo?.ogImage &&
					<meta property="og:image" content={dynamicPageItem.seo.ogImage} />
				}
				<link rel="stylesheet" href="/prose.css" />

			</Head>
			<PreviewBar {...props} />
			<MainElem>
			{/* <AnimationRevealPage disabled> */}
				<GlobalHeader {...props} />
				<AgilityPageTemplate {...props} />
				<GlobalFooter {...props} />
			{/* </AnimationRevealPage> */}
			</MainElem>

		</>
	)
}

