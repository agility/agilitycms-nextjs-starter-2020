import React, { Component, useState } from 'react';
import Link from 'next/link';
import Header from "components/headers/light.js";


const GlobalHeader = (props) => {
	const { globalHeaderProps, sitemapNode, page } = props;

	const globalHeaderItem = globalHeaderProps.contentItem;

	const renderLinks = (kind) => {

		if (!globalHeaderProps.sitemap) return null;


		let links = globalHeaderProps.sitemap.map(node => {

			let path = node.path;
			let href = "/[...slug]"
			if (path === "/") href = "/"

			if (kind === "mobile") {

				//MOBILE MENU ITEMS

				return (
					<Link key={node.pageID + '-m'} href={href} as={path}>
						<a onClick={() => setIsMobileMenuExpanded(false)} className="-m-3 p-3 flex items-center space-x-3 rounded-md hover:bg-gray-50 transition ease-in-out duration-150">
							<svg className="flex-shrink-0 h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
							</svg>
							<div className="text-base leading-6 font-medium text-gray-900 ">
								{node.menuText}
							</div>
						</a>
					</Link>
				)
			} else {

				//DESKTOP MENU ITEMS

				let className = "text-base leading-6 font-medium text-gray-500 hover:text-gray-900 focus:outline-none focus:text-gray-900 transition ease-in-out duration-150"

				return (
					<Link key={node.pageID} href={href} as={path}>
						<a className={className}>{node.menuText}</a>
					</Link>
				)
			}

		})
		return links;

	}

	return (
		<Header/>
	)

}

GlobalHeader.getCustomInitialProps = async function (props) {

	const api = props.agility;
	const languageCode = props.languageCode;
	const channelName = props.channelName;
	let contentItem = null;
	let topLevelSitemap = [];

	try {
		//get the global header
		let contentItemList = await api.getContentList({
			referenceName: "globalheader",
			languageCode: languageCode
		});

		if (contentItemList && contentItemList.length) {
			contentItem = contentItemList[0];

		}
	} catch (error) {
		if (console) console.error("Could not load global header item.", error);
	}


	try {
		//get the nested sitemap
		let sitemap = await api.getSitemapNested({
			channelName: channelName,
			languageCode: languageCode,
		});

		//get rid of the children, we only care about the top-level
		sitemap = sitemap.forEach(s => {
			if (s.path == '/home') {
				s.path = '/'
			}
			s.children = [];
			topLevelSitemap.push(s);
		})


	} catch (error) {
		if (console) console.error("Could not load nested sitemap.", error);
	}

	return {
		contentItem,
		sitemap: topLevelSitemap
	}
}


export default GlobalHeader