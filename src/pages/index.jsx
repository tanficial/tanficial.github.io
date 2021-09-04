import * as React from "react"
import { graphql } from "gatsby"

import PostList from "../components/PostList"
import Layout from "../components/Layout"

// https://www.gatsbyjs.com/docs/how-to/routing/client-only-routes-and-user-authentication/
// markup
const IndexPage = ({ data }) => {
  const edges = data.allMarkdownRemark.edges;
  return (
    <Layout>
      <PostList data={edges} />
    </Layout>
  )
}

export const query = graphql`
query {
  allMarkdownRemark(
    sort: { fields: [frontmatter___date], order: DESC }
  ) {
    edges {
      node {
        id
        fields {
          slug
        }
        frontmatter {
          title
          category
          date(formatString: "MMMM. DD. YYYY")
          description
        }
      }
    }
  }
}
`

export default IndexPage