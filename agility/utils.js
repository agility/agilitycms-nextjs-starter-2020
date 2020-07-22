const renderHTML = (html) => {
	if (!html) return { __html: "" };
	return { __html: cleanHTML(html) };
}

const cleanHTML = (html) => {
	if (!html) return ""

	//fix '~' in links in HTML
	return html.replace(/href="~\//gi, 'href="/')
}

const asyncForEach = async (array, callback) => {
	for (let index = 0; index < array.length; index++) {
		await callback(array[index], index, array);
	}
}

module.exports = {
	renderHTML,
	cleanHTML,
	asyncForEach
}