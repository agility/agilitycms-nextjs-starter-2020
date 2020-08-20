import React, { Component } from 'react';
import { getAgilityPageProps, getAgilityPaths } from 'agility/agility.node'
import { handlePreview } from 'agility/agility.browser'
import Layout from 'components/agility-global/Layout'

class AgilityPage extends Component {
	render() {
		handlePreview();

		//this runtime error ONLY hapens in preview mode...
		if (this.props.previewError) {
			return <div>
				<div>{this.props.previewError}</div>
			</div>
		}

		return (
			<Layout {...this.props} />
		)
	}
}

export async function getStaticProps(context) {

	try {

		const props = await getAgilityPageProps({ context });
		return {
			props: props,
			revalidate: 1 //will refresh page every 1 second on Vercel
		}
	} catch (e) {
		return {
			props: { previewError: e, stack: e }
		}
	}
}

export async function getStaticPaths() {
	const paths = await getAgilityPaths();
	return {
		paths: paths,
		fallback: true
	}
}

export default AgilityPage

