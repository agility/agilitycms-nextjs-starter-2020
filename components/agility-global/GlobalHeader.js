import React, { Component, useState } from 'react';
import Link from 'next/link';
import Header, { NavLink, NavLinks, PrimaryLink, LogoLink } from "components/headers/light";


const GlobalHeader = (props) => {
	const { globalHeaderProps, sitemapNode, page } = props;

	const globalHeaderItem = globalHeaderProps.contentItem;
	let siteName = globalHeaderItem?.fields.siteName || "Agility Starter 2020"
	let logo = globalHeaderItem?.fields.logo || nulll

	const renderLinks = (kind) => {

		if (!globalHeaderProps.sitemap) return null;


		let links = globalHeaderProps.sitemap.map(node => {

			let path = node.path;
			let href = "/pages/[...slug]"
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

	const logoLink = (
		<Link href={'/'}><LogoLink>
		{ logo &&
			<img src={logo.url} alt={logo.label} />
		}
		{siteName}
		</LogoLink></Link>
	  );

	const links = [
		<NavLinks key={1}>
			{ globalHeaderProps.links.map(link => (
				<Link key={link.path} href={`/[...slug]`} as={link.path}><NavLink>{link.text}</NavLink></Link>
			)) }
			{
				globalHeaderItem.fields.primaryCTA &&
				<PrimaryLink href={globalHeaderItem.fields.primaryCTA.href} target={globalHeaderItem.fields.primaryCTA.target}>{globalHeaderItem.fields.primaryCTA.text}</PrimaryLink>
			}
		</NavLinks>
	]

	return (
		<Header {...{links, logoLink}} />
	)

}

GlobalHeader.getCustomInitialProps = async function (props) {

	const api = props.agility;
	const languageCode = props.languageCode;
	const channelName = props.channelName;
	let contentItem = null;
	let links = [];

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

		//grab the top level links that are visible on menu
		links = sitemap
			.filter(node => node.visible.menu)
			.map(node => {
				return {
					text: node.menuText || node.title,
					path: node.path
				}
			})

	} catch (error) {
		if (console) console.error("Could not load nested sitemap.", error);
	}

	return {
		contentItem,
		links
	}
}


export default GlobalHeader