import React from 'react'
import { graphql } from 'gatsby'

import Layout from "../components/Layout"

const postHeadStyle = {
  marginBottom: "20px",
  padding: "20px 0"
}

function Post({ data }) { // this prop(data) will be injected by the GraphQL query we'll write in a bit
  const { markdownRemark: { html, frontmatter } } = data; // data.markdownRemark holds your html, frontmatter data

  return (
    <Layout category={frontmatter.category}>
      {/* frontmatter 정보 */}
      <div id="post_header" style={postHeadStyle}>
        <h1 style={{ fontSize: "2rem", margin: "0" }}>{frontmatter.title}</h1>
        <p style={{ margin: "10px 0", textAlign: "left" }}>{frontmatter.date}</p>
      </div>
      {/* 포스트 본문 */}
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </Layout>
  )
}

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        category
        date(formatString: "MMMM. DD. YYYY")
      }
    }
  }
`

export default Post