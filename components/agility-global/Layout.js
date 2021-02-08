import PreviewBar from "./PreviewBar";
import GlobalHeader from "./GlobalHeader";
import GlobalFooter from "./GlobalFooter";
import { useRouter } from "next/router";
import SEO from "../seo/SEO";
import dynamic from "next/dynamic";
import tw from "twin.macro";

const MainElem = tw.main`p-8`;

import AnimationRevealPage from "helpers/AnimationRevealPage";
import Error from "next/error";

function Layout(props) {
  const { page, sitemapNode, dynamicPageItem, notFound } = props;

  // If the page is not yet generated, this will be displayed
  // initially until getStaticProps() finishes running
  const router = useRouter();
  if (router.isFallback) {
    return <div>Loading page...</div>;
  }

  if (notFound === true) {
    return <Error statusCode="404" />;
  }

  const AgilityPageTemplate = dynamic(() =>
    import("components/agility-pageTemplates/" + props.pageTemplateName)
  );

  // check if dynamic page for meta description
  if (dynamicPageItem?.seo?.metaDescription) {
    page.seo.metaDescription = dynamicPageItem.seo.metaDescription;
  }

  // check if dynamic page for meta keywords
  if (dynamicPageItem?.seo?.metaKeywords) {
    page.seo.metaKeywords = dynamicPageItem.seo.metaKeywords;
  }

  // check if dynamic page for additional header markup
  if (dynamicPageItem?.seo?.metaHTML) {
    page.seo.metaHTML = dynamicPageItem.seo.metaHTML;
  }

  return (
    <>
      <SEO
        title={sitemapNode?.title}
        description={page.seo.metaDescription}
        keywords={page.seo.metaKeywords}
        ogImage={dynamicPageItem?.seo?.ogImage}
        metaHTML={page.seo.metaHTML}
      />
      <PreviewBar {...props} />
      <MainElem>
        {/* <AnimationRevealPage disabled> */}
        <GlobalHeader {...props} />
        <AgilityPageTemplate {...props} />
        <GlobalFooter {...props} />
        {/* </AnimationRevealPage> */}
      </MainElem>
    </>
  );
}

export default Layout;
