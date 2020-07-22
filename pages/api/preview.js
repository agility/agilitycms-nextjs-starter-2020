import { validatePreview } from '../../agility/agility.node'

// A simple example for testing it manually from your browser.
// If this is located at pages/api/preview.js, then
// open /api/preview from your browser.
export default async (req, res) => {

	//validate our preview key, also validate the requested page to preview exists
	const validationResp = await validatePreview({
		agilityPreviewKey: req.query.agilitypreviewkey,
		slug: req.query.slug
	});

	if (validationResp.error) {
		return res.status(401).end(`${validationResp.message}`)
	}

	//enable preview mode
	res.setPreviewData({})

	// Redirect to the slug
	res.writeHead(307, { Location: req.query.slug })
	res.end()

}