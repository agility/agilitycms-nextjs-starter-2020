const getParameterByName = (name, url) => {
	if (!url) url = window.location.href;
	name = name.replace(/[\[\]]/g, '\\$&');
	var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
		results = regex.exec(url);
	if (!results) return null;
	if (!results[2]) return '';
	return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

const handlePreview = () => {

	if (!process.browser) {
		//kickout if this is not being executed in the browser
		return;
	}

	const agilityPreviewKey = getParameterByName(`agilitypreviewkey`)

	if (!agilityPreviewKey) {
		//kickout if we don't have a preview key
		return;
	}

	//redirect this to our preview API route
	const previewAPIRoute = `/api/preview`;

	let previewAPIUrl= `${previewAPIRoute}?slug=${window.location.pathname}&agilitypreviewkey=${agilityPreviewKey}`;

	const dynamicPageContentID = getParameterByName('ContentID') ?? getParameterByName('contentID');

	if(dynamicPageContentID > 0) {
		previewAPIUrl += `&ContentID=${dynamicPageContentID}`;
	}

	//do the redirect
	window.location.href = previewAPIUrl;

}

export {
	handlePreview
}