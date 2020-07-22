import truncate from 'truncate-html'

import ThreeColSimpleWithImageAndDashedBorder from "components/blogs/ThreeColSimpleWithImageAndDashedBorder"

const PostsListing =  ({customData, fields, page}) => {

	const listingProps = {
		heading: fields.title,
		description: fields.subtitle,
		subheading: fields.preHeader,
		posts: customData.posts,
		readMore: fields.readMoreLabel
	}

	return <ThreeColSimpleWithImageAndDashedBorder {...listingProps}   />
}

const resolvePostUrls = function (sitemap, posts) {
	let dynamicUrls = {};
	posts.forEach(post => {

		Object.keys(sitemap).forEach(path => {
			if (sitemap[path].contentID === post.contentID) {
				dynamicUrls[post.contentID] = path;
			}
		})

	})
	return dynamicUrls;
}

PostsListing.getCustomInitialProps = async function ({agility, channelName, languageCode}) {
	const api = agility;

	try {

		//get sitemap first, need it to find the dynamic urls
		let sitemap = await api.getSitemap({ channelName: channelName, languageCode });

		//then get our posts
		let rawPosts = await api.getContentList({ referenceName: 'posts', languageCode });

		//then get our categories, tags, and authors
		let categories = await api.getContentList({ referenceName: 'categories',languageCode });
		let tags = await api.getContentList({ referenceName: 'tags',languageCode });
		let authors = await api.getContentList({ referenceName: 'authors',languageCode });

		const dynamicUrls = resolvePostUrls(sitemap, rawPosts)

		 let posts = rawPosts.map(post => {

			const categoryID = post.fields.category?.contentid;
			const authorID = post.fields.author?.contentid;

			//TODO: resolve the tags here
			const tagIDStr = post.fields.tags?.sortids;

			const category = categories?.find(c => c.contentID == categoryID);
			const author = authors?.find(a => a.contentID == authorID);

			let imageSrc = post.fields.image?.url
			if (imageSrc !== undefined && imageSrc !== null) {
				imageSrc += "?w=500&q=80"
			} else {
				imageSrc = "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=80"
			}
			const description = truncate(post.fields.content, { length: 160, decodeEntities: true, stripTags: true, reserveLastWord: true })

			const url = dynamicUrls[post.contentID]

			return {
				contentID: post.contentID,
				title: post.fields.title,
				url: url,
				category: category?.fields.title || null,
				author: author?.fields.name || null,
				description,
				imageSrc
			}
		});


		return {
			posts
		};

	} catch (error) {
		if (console) console.error(error);
	}
}

export default PostsListing;