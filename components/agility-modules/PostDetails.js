import tw from "twin.macro";
import truncate from 'truncate-html'

import { Container, ContentWithPaddingXl } from "components/misc/Layouts";
import { SectionHeading, Subheading as SubheadingBase } from "components/misc/Headings.js";
const HeadingRow = tw.div`flex`;
const Heading = tw(SectionHeading)`text-gray-900 mb-10`;
const DateField = tw.div``;
const Author  = tw.div`font-bold text-lg sm:text-xl lg:text-2xl text-secondary-500 tracking-wide`;
const Category = tw.div`font-medium text-primary-700`;
const About = tw.div`text-center`
const Tag = tw.div`text-gray-700`

const ImageRow = tw.div`my-2`
const Image = tw.img`rounded`

import {RichText} from "./RichTextArea"

import { renderHTML } from "agility/utils"

const PostDetails = ({ dynamicPageItem}) => {

	const post = dynamicPageItem.fields
	const tagNames = post.tags?.map(t => t.fields.title).join(",")
	const dateStr = new Date(post.date).toLocaleString()

	let imageUrl = post.image?.url;
	if (imageUrl) {
		if (post.image.pixelWidth > 1200) {
			imageUrl = `${post.image.url}?w=1200`
		}
	}

	return (
		<Container>
			<ContentWithPaddingXl>
				<HeadingRow>
					<Heading>{post.title}</Heading>
				</HeadingRow>
				<About>
					<Category>{ post.category?.fields.title }</Category>
					<Author>{ post.author?.fields.name }</Author>
					<DateField>{  dateStr }</DateField>
					<Tag>{ tagNames }</Tag>
				</About>
				{ imageUrl &&
					<ImageRow>
						<Image src={imageUrl} alt={post.image.label} />
					</ImageRow>
				}

				<RichText dangerouslySetInnerHTML={renderHTML(post.content)}></RichText>
			</ContentWithPaddingXl>
		</Container>

	)
}


PostDetails.getCustomInitialProps = async function ({item, agility, languageCode, channelName, pageInSitemap, dynamicPageItem}) {

	const api = agility;

	try {

		if (! dynamicPageItem.seo.metaDescription || dynamicPageItem.seo.metaDescription.trim() === "") {
			const description = truncate(dynamicPageItem.fields.content, { length: 160, decodeEntities: true, stripTags: true, reserveLastWord: true })
			dynamicPageItem.seo.metaDescription = description;
		}

		if (dynamicPageItem.fields.image) {
			if (dynamicPageItem.fields.image.pixelWidth > 1200) {
				dynamicPageItem.seo.ogImage =  `${dynamicPageItem.fields.image.url}?w=1200`
			} else {
				dynamicPageItem.seo.ogImage =  dynamicPageItem.fields.image.url
			}
		}

	} catch (error) {
		if (console) console.error(error);
	}
}

export default PostDetails