import React, { Component } from "react";
import { getAgilityPageProps, getAgilityPaths } from "agility/agility.node";
import { handlePreview } from "agility/agility.browser";
import Layout from "components/agility-global/Layout";

class AgilityPage extends Component {
  render() {
    handlePreview();

    return <Layout {...this.props} />;
  }
}

export async function getStaticProps(context) {
  const props = await getAgilityPageProps({ context });
  return {
    props: props,
    revalidate: 1, //will refresh page every 1 second on Vercel...
  };
}

export async function getStaticPaths() {
  const paths = await getAgilityPaths(false);
  return {
    paths: paths,
    fallback: true,
  };
}

export default AgilityPage;
