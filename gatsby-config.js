module.exports = {
  siteMetadata: {
    siteUrl: "https://www.yourdomain.tld",
    title: "tanficial-blog",
  },
  plugins: [
    "gatsby-plugin-offline",
    "gatsby-plugin-styled-components",
    "gatsby-plugin-image",
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-sitemap",
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        icon: `${__dirname}/static/favicon.png`,
      },
    },
    "gatsby-plugin-sharp",
    {
      resolve: "gatsby-plugin-typography",
      options: {
        pathToConfigModule: `${__dirname}/src/utils/typography`,
      },
    },
    "gatsby-transformer-sharp",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        path: `${__dirname}/src/assets`,
        name: "assets",
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        path: `${__dirname}/content`,
        name: "content",
      },
    },
    {
      resolve: "gatsby-transformer-remark",
      options: {
        plugins: [
          "gatsby-remark-embed-video",
          "gatsby-remark-autolink-headers",
          "gatsby-remark-prismjs",
          "gatsby-remark-responsive-iframe",
          "gatsby-remark-copy-linked-files",
          "gatsby-remark-smartypants",
          {
            resolve: `gatsby-remark-images`,
            options: {
              linkImagesToOriginal: false,
            }
          },
          "gatsby-remark-images-medium-zoom",
          {
            resolve: `gatsby-remark-emojis`,
            options: {
              active: true,
              class: 'emoji-icon',
              escapeCharacter: '#',
              size: 64,
              styles: {
                display: 'inline',
                margin: '0',
                'margin-top': '1px',
                position: 'relative',
                top: '5px',
                width: '25px'
              }
            }
          },
        ]
      }
    }
  ],
};
