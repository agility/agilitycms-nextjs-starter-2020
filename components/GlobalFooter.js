import React, { Component, useState } from 'react';
import Link from 'next/link';
import Footer from "components/footers/SimpleFiveColumn.js";


const GlobalFooter = (props) => {
	const { globalFooterProps, sitemapNode, page } = props;

	const globalFooterItem = globalFooterProps.contentItem;

	return (
		<Footer/>
	)

}

GlobalFooter.getCustomInitialProps = async function (props) {

	const api = props.agility;
	const languageCode = props.languageCode;
	const channelName = props.channelName;
	let contentItem = null;

	try {
		//get the global footer
		let contentItemList = await api.getContentList({
			referenceName: "globalfooter",
			languageCode: languageCode
		});

		if (contentItemList && contentItemList.length) {
			contentItem = contentItemList[0];

		}
	} catch (error) {
		if (console) console.error("Could not load global footer item.", error);
	}

	return {
		contentItem
	}
}


export default GlobalFooter