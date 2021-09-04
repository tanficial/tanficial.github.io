import * as React from "react"
import { graphql } from "gatsby"

import PostList from "../components/PostList"
import Layout from "../components/Layout"

const CategoryPage = ({ data }) => {
    const edges = data.allMarkdownRemark.edges;
    return (
        <Layout category={edges[0].node.frontmatter.category}>
            <PostList data={edges} category={edges[0].node.frontmatter.category} />
        </Layout>
    )
}

export const query = graphql`
query($category: String!) {
  allMarkdownRemark(
    filter: {frontmatter: {category: {eq: $category }}}
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

export default CategoryPage