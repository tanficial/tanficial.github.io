const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`);

exports.onCreateNode = ({ node, getNode, actions }) => {
    const { createNodeField } = actions;
    if (node.internal.type === "MarkdownRemark") {
        const slug = createFilePath({ node, getNode });
        createNodeField({
            node,
            name: "slug",
            value: slug
        })
    }
}

exports.createPages = async ({ graphql, actions }) => {
    // **Note:** The graphql function call returns a Promise
    // see: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise for more info
    const { createPage } = actions
    const result = await graphql(`
        query {
          allMarkdownRemark {
            edges {
              node {
                fields {
                  slug
                }
              }
            }
          }
        }
      `)

    result.data.allMarkdownRemark.edges.forEach(({ node }) => {
        createPage({
            path: node.fields.slug,
            component: path.resolve(`./src/templates/Post.jsx`),
            context: {
                // Data passed to context is available
                // in page queries as GraphQL variables.
                slug: node.fields.slug,
            },
        })
    })

    const slugs = result.data.allMarkdownRemark.edges
        .map(({ node }) => node.fields.slug.split("/")[1])
        .filter((slug, index, slugList) => slugList.indexOf(slug) === index);

    slugs.forEach(slug => {
        createPage({
            path: `/${slug}`,
            component: path.resolve(`./src/templates/CategoryPage.jsx`),
            context: {
                category: slug
            }
        })
    })
}