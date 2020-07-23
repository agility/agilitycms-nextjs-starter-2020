import React, { Component } from 'react';
import dynamic from 'next/dynamic'


export default function ContentZone({ name, page, dynamicPageItem }) {
	function RenderModules() {

		let modules = page.zones[name];

		const modulesToRender = modules.map(m => {

			let AgilityModule = dynamic(() => import('components/agility-modules/' + m.moduleName + '.js'))

			return <AgilityModule key={m.item.contentID} page={page} dynamicPageItem={dynamicPageItem} {...m.item} />
		})

		return modulesToRender;
	}


	return (
		<div>
			<RenderModules />
		</div>
	)
}
