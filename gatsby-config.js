module.exports = {
  siteMetadata: {
    title: `ecl-ssg`,
    siteUrl: `https://ecl-ssg.netlify.app`,
    description: `Starter for gatsby using  ecl-webcomponents`,
    customTheme: 'ec',
  },
  // More easily incorporate content into your pages through automatic TypeScript type generation and better GraphQL IntelliSense.
  // If you use VSCode you can also use the GraphQL plugin
  // Learn more at: https://gatsby.dev/graphql-typegen
  graphqlTypegen: true,
  plugins: [
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `EclWebcomponents`,
        start_url: `/`,
        background_color: `#ffffff`,
        display: `standalone`,
        icon: `src/images/icon.png`,
      },
    },
    {
      resolve: "gatsby-plugin-netlify-cms",
      options: {
        manualInit: true,
        modulePath: `${__dirname}/src/cms/cms.js`,
        enableIdentityWidget: true,
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "page",
        path: `${__dirname}/src/pages`,
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "home",
        path: `${__dirname}/src/pages/home`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'menu',
        path: `${__dirname}/src/pages/menu`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'site-header',
        path: `${__dirname}/src/pages/site-header`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'footer',
        path: `${__dirname}/src/pages/footer`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `cmsImages`,
        path: `${__dirname}/static/images`,
      },
    },
    `gatsby-plugin-image`,
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    "gatsby-transformer-remark",
    {
      resolve: 'gatsby-plugin-i18n',
      options: {        
        langKeyDefault: 'en',
        useLangKeyLayout: false,
        localizedPaths: {
          'en': '/en/',
        },
        languageLabels: {
          'en': 'English',
        },
        markdownRemark: {
          postPage: 'src/pages/index.tsx',
          query: `
          {
            allMarkdownRemark {
                edges {
                node {
                  fields {
                  slug,
                  langKey
                  }
                }
              }
            }
          }
          `
        }
      }
    }
  ]
};