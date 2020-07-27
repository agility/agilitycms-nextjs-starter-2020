import React from "react";
import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro"; //eslint-disable-line

import LogoImage from "../../images/logo.svg";
import { ReactComponent as FacebookIcon } from "../../images/facebook-icon.svg";
import { ReactComponent as TwitterIcon } from "../../images/twitter-icon.svg";
import { ReactComponent as YoutubeIcon } from "../../images/youtube-icon.svg";
import { ReactComponent as AgilityIcon } from "../../images/agility-logo.svg";

const Container = tw.div`relative bg-gray-200 -mx-8 -mb-8 px-8`;
const FiveColumns = tw.div`max-w-screen-xl mx-auto py-16 lg:py-20 flex flex-wrap justify-between`;

const Column = tw.div`md:w-1/5`;
const WideColumn = tw(Column)`text-center md:text-left w-full md:w-2/5 mb-10 md:mb-0`;

const ColumnHeading = tw.h5`font-bold`;

const LinkList = tw.ul`mt-4 text-sm font-medium`;
const LinkListItem = tw.li`mt-3`;
const Link = tw.a`border-b-2 border-transparent hocus:text-primary-500 hocus:border-primary-500 pb-1 transition duration-300`;

const LogoContainer = tw.div`flex items-center justify-center md:justify-start`;
const LogoImg = tw.img`w-8 mr-2`;
const LogoText = tw.h5`text-xl font-black text-primary-500`;

const CompanyDescription = tw.p`mt-4 max-w-xs font-medium text-sm mx-auto md:mx-0 md:mr-4 `;

const SocialLinksContainer = tw.div`mt-4 `;
const SocialLink = styled.a`
  ${tw`cursor-pointer inline-block p-2 rounded-full bg-gray-700 text-gray-100 hover:bg-gray-900 transition duration-300 mr-4`}
  svg {
	${tw`w-4 h-4`}
  }
`;

const defaultProps = {
	siteName: "Sitename Inc",
	siteDescription: "This is the site description",
	column2Title: "Column 2 Title",
	column3Title: "Column 3 Title",
	column4Title: "Column 4 Title",
	facebookURL: "https://facebook.com",
	twitterURL: "https://twitter.com",
	youTubeURL: "https://youtube.com",
	column2Links: [{href: "/blog", target: "_self", text: "Blog"}],
	column3Links: [{href: "#", target: "_self", text: "Column 3 Link"}],
	column4Links: [{href: "#", target: "_self", text: "Column 4 Link"}],

}

export default (props) => {
	if (! props.siteName) props = null
	const vals = props || defaultProps;

  return (
	<Container>
	  <FiveColumns>
		<WideColumn>
		  <LogoContainer>
			<LogoText>{vals.siteName}</LogoText>
		  </LogoContainer>
		  <CompanyDescription>
			{vals.siteDescription}
		  </CompanyDescription>
		  <SocialLinksContainer>
			<SocialLink href={vals.facebookURL}>
			  <FacebookIcon />
			</SocialLink>
			<SocialLink href={vals.twitterURL}>
			  <TwitterIcon />
			</SocialLink>
			<SocialLink href={vals.youTubeURL}>
			  <YoutubeIcon />
			</SocialLink>
			<SocialLink href="https://agilitycms.com" title="Powered by Agility CMS">
			  <AgilityIcon />
			</SocialLink>
		  </SocialLinksContainer>
		</WideColumn>
		<Column>
			<ColumnHeading>{vals.column2Title}</ColumnHeading>
			<LinkList>
			{ vals.column2Links.map((link, index) => (
				<LinkListItem key={`col2-${index}`}>
					<Link href={link.href} target={link.target}>{link.text}</Link>
				</LinkListItem>
			)) }
			</LinkList>
		</Column>
		<Column>
		  <ColumnHeading>{vals.column3Title}</ColumnHeading>
		  <LinkList>
		  { vals.column3Links.map((link, index) => (
				<LinkListItem key={`col3-${index}`}>
					<Link href={link.href} target={link.target}>{link.text}</Link>
				</LinkListItem>
			)) }
		  </LinkList>
		</Column>
		<Column>
		  <ColumnHeading>{vals.column4Title}</ColumnHeading>
		  <LinkList>
		  { vals.column4Links.map((link, index) => (
				<LinkListItem key={`col4-${index}`}>
					<Link href={link.href} target={link.target}>{link.text}</Link>
				</LinkListItem>
			)) }
		  </LinkList>
		</Column>
	  </FiveColumns>
	</Container>
  );
};
