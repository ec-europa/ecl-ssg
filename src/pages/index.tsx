import React from "react";
import { useLocation } from '@reach/router';
import { graphql, PageProps } from "gatsby";
import defineCustomElements from '../components/Utils/define';
import Layout from "../components/Layout";
import stripPTag from "../components/Utils/stripP";
import CustomTheme from "../components/Utils/theme";
import getLang from "../components/Utils/getLang";
import BodyContent from "../templates/BodyContent";
import SocialFollow from "../components/SocialFollow";
import InPageNavigation from "../components/InPageNavigation";
import Breadcrumb from "../components/Breadcrumb";

defineCustomElements();

const Page = ({ data }) => {
  const theme = CustomTheme();
  const { pathname } = useLocation();
  const lang = getLang();
  const path = pathname.split('/')[2] || 'home';
  const nodes = data?.allMarkdownRemark?.nodes || [];
  // Filter the nodes based on the desired language
  let filteredNodes = nodes.filter(node => node.frontmatter.lang === lang && node.fields.slug.includes(`/${lang}/${path}/`));

  if (filteredNodes.length === 0 && nodes.length > 0) {
    return <ecl-spinner
      theme={theme}
      centered
      visible
      overlay
    >
      Loading
    </ecl-spinner>;
  }

  const inPage = filteredNodes[0].frontmatter.inpage;
  const content = filteredNodes[0];
  const body = content.rawMarkdownBody;
  const image = content.frontmatter.image ? content.frontmatter.image.replace('/static', '') : false;
  const contentTop = content.frontmatter.contentTop || "";

  return (
    <>
      <Layout
        pageHeader={
          path !== "home" ? (
            <ecl-page-header 
              header-title={content.frontmatter.title}
            >
              <Breadcrumb theme={theme} />
            </ecl-page-header>
          ) : null
        }
      >
        {contentTop && (
          <BodyContent content={stripPTag(contentTop)} />
        )}
        {inPage ? (
          <>
          <ecl-grid row>
            <ecl-grid columns="3" breakpoint="l">
              <InPageNavigation theme={theme} />
            </ecl-grid>
            <ecl-grid columns="9" breakpoint="l">
              <BodyContent content={stripPTag(body)} />
            </ecl-grid>
          </ecl-grid>
          </>
        ) : (
          <BodyContent
            image={image && <img src={image} alt={content.frontmatter.title} />}
            content={stripPTag(body)} 
          />
        )}
      </Layout>
    </>
  );
};

export const query = graphql`
  query {
    allMarkdownRemark {
      nodes {
        fields {
          slug
        }
        frontmatter {
          lang
          title
          inpage
          contentTop
          image
        }
        rawMarkdownBody
      }
    }
  }
`;

export default Page;
export { Head } from "../components/Head"