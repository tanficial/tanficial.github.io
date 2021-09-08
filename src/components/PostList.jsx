import React from 'react'
import { Link } from 'gatsby'
import styled from "styled-components"

const StyledCard = styled.article`
    margin-bottom: 20px;
    background-color: var(--color-card);
    border-radius: 8px;
    padding: 15px 10px;
    box-sizing: border-box;
    h2 {
        margin: 10px 0;
        color: var(--color-high);
        font-size: 1.2rem;
        line-height: 24px;
    }
    p{
        margin: 10px 0;
        line-height: 20px;
    }
    &:hover {
        h2 {
            text-decoration: underline;
            text-underline-offset: 4px;
        }
    }

    @media screen and (max-width: 1100px) {
        padding: 10px 10px;
    }
`

const PostCard = ({ slug, frontmatter }) => {
    return (
        <Link to={slug}>
            <StyledCard>
                <div>
                    <h2>{frontmatter.title}</h2>
                    <span style={{ fontSize: "14px" }}>{frontmatter.date}</span>
                    <span style={{ fontSize: "14px", marginLeft: "10px", color: "var(--color-high)" }}>· {frontmatter.category}</span>
                    <p>{frontmatter.description}</p>
                </div>
            </StyledCard>
        </Link>
    )
}

const PostList = ({ data, category }) => {
    return (
        <div>
            <h1 style={{ fontSize: "1.8rem", margin: "20px 0", paddingLeft: "16px" }}>{category ? category : "전체 포스팅"}</h1>
            {
                data.map(edge => <PostCard key={edge.node.id} slug={edge.node.fields.slug} frontmatter={edge.node.frontmatter} />)
            }
        </div>
    )
}

export default PostList