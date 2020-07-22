import React, { Component } from 'react';
import { renderHTML } from 'agility/utils'

export default (props) => {

	return (
		<section className="max-w-screen-xl mx-auto px-4 sm:px-6 py-6">
			<div dangerouslySetInnerHTML={renderHTML(props.fields.textblob)}></div>
		</section>
	);

}
