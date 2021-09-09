import React, { useEffect, useRef } from 'react'
import { graphql } from 'gatsby'
import styled from 'styled-components'
import mediumZoom from 'medium-zoom';

import Layout from "../components/Layout"

const TableofContents = styled.div`
  position: absolute;
  box-sizing: border-box;
  margin-left: 50px;
  height: calc(100% - 140px);
  width: 250px;
  right: -300px;
  div {
    position: sticky;
    top: 50px;
  }
  div > ul {
    margin: 0;
  }
  li {
    list-style: none;
  }
  a:hover {
    text-decoration: underline;
  }

  @media screen and (max-width: 1616px) {
    display: none;
  }

  a.active {
    color: var(--color-high);
  }
`

const postHeadStyle = {
  marginBottom: "20px",
  padding: "20px 0"
}

function Post({ data }) { // this prop(data) will be injected by the GraphQL query we'll write in a bit
  const { markdownRemark: { html, frontmatter, tableOfContents } } = data; // data.markdownRemark holds your html, frontmatter data
  const content = useRef();
  const toc = useRef();

  const tocScrollHandler = () => {
    if (toc.current == null) {
      return;
    }
    const currentOffsetY = window.scrollY;
    const HEADER_OFFSET_Y = 50;
    const headerLinks = document.querySelectorAll('.anchor-header');
    let curTocLink = null;

    headerLinks.forEach(headerLink => {
      const { top } = headerLink.getBoundingClientRect();
      const headerTop = top + currentOffsetY;
      const tocLink = toc.current.querySelector(`a[href="${headerLink.hash}"]`);
      if (currentOffsetY > headerTop - HEADER_OFFSET_Y) {
        curTocLink = tocLink;
      }
    });

    toc.current.querySelectorAll('a').forEach(elem => elem.classList.remove("active"));
    curTocLink && curTocLink.classList.add('active');
  }

  useEffect(() => {
    window.addEventListener("scroll", tocScrollHandler);
  }, []);

  useEffect(() => {
    const urlImgs = content.current.querySelectorAll("img");
    mediumZoom(urlImgs, {
      background: '#222831f0',
      scrollOffset: 0,
    });
  }, []);

  return (
    <Layout category={frontmatter.category}>
      {/* frontmatter 정보 */}
      <div id="post_header" style={postHeadStyle}>
        <h1 style={{ fontSize: "1.8rem", margin: "0", lineHeight: "36px" }}>{frontmatter.title}</h1>
        <p style={{ margin: "10px 0", textAlign: "left" }}>
          {frontmatter.date}
          <span style={{ fontSize: "14px", marginLeft: "10px", color: "var(--color-high)" }}>· {frontmatter.category}</span>
        </p>
      </div>
      {/* table of contents */}
      <TableofContents >
        <div ref={toc} dangerouslySetInnerHTML={{ __html: tableOfContents }} />
      </TableofContents>
      {/* 포스트 본문 */}
      <div ref={content} dangerouslySetInnerHTML={{ __html: html }} />
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
      tableOfContents
    }
  }
`

export default Post