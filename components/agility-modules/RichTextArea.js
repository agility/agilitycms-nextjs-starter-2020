import React, { Component } from 'react';
import { renderHTML } from 'agility/utils'
import tw from "twin.macro";
import styled from "styled-components";

import { Container, ContentWithPaddingLg } from "components/misc/Layouts";
export const RichText = tw.div`prose prose-sm sm:prose lg:prose-lg xl:prose-xl`

export const RichTextXX = styled.div`
${tw`text-lg  text-gray-800`}
p {
  ${tw`mt-2 leading-loose`}
}
h1 {
  ${tw`text-3xl font-bold mt-10`}
}
h2 {
  ${tw`text-2xl font-bold mt-8`}
}
h3 {
  ${tw`text-xl font-bold mt-6`}
}
ul {
  ${tw`list-disc list-inside`}
  li {
	${tw`ml-2 mb-3`}
	p {
	  ${tw`mt-0 inline leading-normal`}
	}
  }
}
`;

//TODO: add tailwinds/typography support in here when twin.macro supports it...
//export const RichTextContainer = tw.div`textStyles`;

export default (props) => {

	return (
		<Container>
			<ContentWithPaddingLg>
				<RichText dangerouslySetInnerHTML={renderHTML(props.fields.textblob)}></RichText>
			</ContentWithPaddingLg>
		</Container>
	);

}
